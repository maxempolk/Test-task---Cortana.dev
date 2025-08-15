"use client";

import { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { User } from "@/auth/types/user";
import { useRouter } from "next/navigation";
import { me } from "@/actions/me";
import { refresh } from "@/fetches/refresh";

interface UserProviderProps {
  children: ReactNode;
  initialUser: User | null;
}

export interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({ children, initialUser }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      async function refreshTokens() {
        const res = await refresh();
        if (!res) {
          return;
        }

        const user = await me();
        setUser(user);
        router.push("/");
      }

      refreshTokens();
    }
  }, [router, user]); 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
