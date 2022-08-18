import React from "react";
import { onAuthStateChanged, UserInfo } from "firebase/auth";
import { auth } from "../Libs/firebase";
import { handleSignInAnonymously } from "../backend/authentication";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const GlobalState: any = React.createContext({ user: null });

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserInfo | null>(null);
  const [cookies, setCookie] = useCookies(["language"]);
  const [language, setLanguage] = React.useState<"en" | "fr">(
    cookies.language || "en"
  );

  const router = useRouter();

  const handleChangeLanguage = (lang: "en" | "fr") => {
    setLanguage(lang);
    setCookie("language", lang);
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  React.useEffect(() => {
    console.log(cookies.language);
    onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        setUser(_user);
      } else {
        await handleSignInAnonymously();
      }
    });
  }, []);

  return (
    <GlobalState.Provider
      value={{ user, language, setLanguage, handleChangeLanguage }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export { GlobalState, GlobalProvider };
