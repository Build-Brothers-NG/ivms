import * as React from "react";
import type { NextPage } from "next";
import Box from "@mui/material/Box";

import { makeStyles } from "@mui/styles";

import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/system";

import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { GlobalState } from "../src/Global";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  },
};

const Home: NextPage = () => {
  const [cookies, setCookie] = useCookies(["language"]);
  const { user } = React.useContext(GlobalState);

  const router = useRouter();
  const locale: any = cookies.language || router.locale;

  React.useEffect(() => {
    if (user) {
      if (user.isAnonymous) {
        router.push("/login", { pathname: "/login" }, { locale });
      } else {
        router.push("/dashboard", { pathname: "/dashboard" }, { locale });
      }
    }
  }, [user]);
  return (
    <Box sx={styles.root}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Box>
  );
};

export default Home;
