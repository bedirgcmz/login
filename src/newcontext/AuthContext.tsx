"use client";
import { createContext, useContext, useState } from "react";
import { userContextType, UserType } from "@/utils/types";

// userContext adını UserContext olarak değiştirdik
const UserContext = createContext<userContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // user bilgisi ve giriş durumu için state'leri tanımlıyoruz
  const [user, setUser] = useState<UserType | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

// Context'i kullanmak için hook'u oluşturuyoruz.
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
