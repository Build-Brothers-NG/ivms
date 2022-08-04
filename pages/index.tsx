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
    justifyContent: "space-between",
    width: "100%",
  },
  login: {
    width: { xs: "100%", md: "50%" },
    px: { xs: 20, md: 50 },
    py: { xs: 20, md: 10 },
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
};

const Home: NextPage = () => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.login}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography color="primary" variant="h3">
              Inmate VMS
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="primary" variant="h4">
              Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth variant="filled" label="Email Address" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth variant="filled" label="Password" />
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{ width: "fit-content", px: 3, py: 2 }}
              variant="contained"
              disableElevation
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box component="img" src={"/static/images/btn_google_signin.png"} />
          </Grid>
          <Grid item xs={12}>
            <Link href={"/register"}>
              <Typography color="primary" variant="h5">
                Create account
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Box sx={styles.image}></Box>
    </Box>
  );
};

export default Home;

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/login",
      parmanent: false,
    },
  };
};
