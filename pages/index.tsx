import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { makeStyles } from "@mui/styles";

import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/system";

import Link from "../src/Link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { GlobalState } from "../src/Global";
const theme = createTheme();

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  login: {
    width: "50%",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 20,
    },
  },
  image: {
    backgroundImage: "url(/static/images/inmate.jpg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "50%",
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

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
  const locale: any = router.locale;

  React.useEffect(() => {
    if (user) {
      if (user.isAnonymous) {
        router.push("/login", {}, { locale });
      } else {
        router.push("/dashboard", {}, { locale });
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

// export const getServerSideProps = async () => {
//   return {
//     redirect: {
//       destination: "/login",
//       parmanent: false,
//     },
//   };
// };
