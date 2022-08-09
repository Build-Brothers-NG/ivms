import React from "react";
import { onAuthStateChanged, UserInfo } from "firebase/auth";
import { auth } from "../Libs/firebase";
import { handleSignInAnonymously } from "../backend/authentication";

const GlobalState: any = React.createContext({ user: null });

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserInfo | null>(null);

  React.useEffect(() => {
    onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        setUser(_user);
      } else {
        await handleSignInAnonymously();
      }
    });
  }, []);

  return (
    <GlobalState.Provider value={{ user }}>{children}</GlobalState.Provider>
  );
};

export { GlobalState, GlobalProvider };
