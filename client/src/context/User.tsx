import { createContext, useState } from "react";
import { UserContextObject } from "../types/@types.user";
import useLocalStorage from "../hooks/useLocalStorage";

export const UserContext = createContext<UserContextObject | null>(null);

type UserProps = {
  children: React.ReactNode;
};

export function User({ children }: UserProps) {
  const [username, setUsername] = useLocalStorage("username", null);

  const loginUsername = (user: string): void => {
    setUsername(user);
  };

  return (
    <UserContext.Provider
      value={{
        username: username as string,
        loginUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
