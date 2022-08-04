import React from "react";
import { getAuth, onAuthStateChanged, UserInfo } from "firebase/auth";
import { auth } from "../Libs/firebase";

const GlobalState: any = React.createContext({ user: null });

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserInfo | null>(null);

  React.useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      if (_user) {
        setUser(_user);
      } else {
      }
    });
  }, []);

  return (
    <GlobalState.Provider value={{ user }}>{children}</GlobalState.Provider>
  );
};

export { GlobalState, GlobalProvider };
