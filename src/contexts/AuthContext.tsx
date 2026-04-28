"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const supabase = createClient();

interface AuthContextType {
    isLoggedIn: boolean;
    isAdmin: boolean;
    user: User | null;
    userRole: "admin" | "user" | null;
    isInitialized: boolean;
    login: (idOrEmail: string, pw: string) => Promise<{ success: boolean; role: "admin" | "user" | null; error?: string }>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<"admin" | "user" | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
                // DB의 profiles 테이블에서 role 정보를 가져옴
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", currentUser.id)
                    .single();
                
                setUserRole((profile?.role as "admin" | "user") || "user");
            } else {
                setUserRole(null);
            }

            setIsInitialized(true);
        };

        initializeAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                // 세션 변경 시에도 role 정보를 다시 조회 (필요시)
                supabase.from("profiles")
                    .select("role")
                    .eq("id", currentUser.id)
                    .single()
                    .then(({ data: profile }) => {
                        setUserRole((profile?.role as "admin" | "user") || "user");
                    });
            } else {
                setUserRole(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (idOrEmail: string, pw: string) => {
        let email = idOrEmail;

        // 아이디(ID)로 로그인하려는 경우 (이메일 형식이 아님)
        if (!idOrEmail.includes("@")) {
            // 소문자로 변환하여 검색 (회원가입시 소문자로 저장된다면)
            const searchId = idOrEmail.trim().toLowerCase();

            const { data: profileData, error: profileError } = await supabase
                .from("profiles")
                .select("email")
                .ilike("login_id", searchId)
                .single();

            if (profileError || !profileData) {
                console.error("Login mapping error:", profileError);
                return { success: false, role: null, error: "회원정보가 일치하지 않습니다." };
            }
            email = profileData.email;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: pw,
        });

        if (error) {
            return { success: false, role: null, error: error.message };
        }

        const { data: profileData } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.user!.id)
            .single();

        return { success: true, role: (profileData?.role as "admin" | "user") || "user" };
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    const isLoggedIn = !!user;
    const isAdmin = userRole === "admin";

    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, user, userRole, isInitialized, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
