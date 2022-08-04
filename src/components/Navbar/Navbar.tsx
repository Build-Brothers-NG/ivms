import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "../../Link";
import { useRouter } from "next/router";
import { auth } from "../../Libs/firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const router = useRouter();
  const logOut = async () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error: any) => {});
  };
  return (
    <>
      <AppBar position="static" sx={{ boxShadow: "none" }}>
        <Container>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              <Link
                href="/dashboard"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                IVMS
              </Link>
            </Typography>

            <Button onClick={logOut} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{ display: "flex", pt: 2 }}>
        {router.pathname !== "/dashboard" && (
          <IconButton onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Breadcrumbs sx={{ pt: 1, px: { xs: 1, md: "24px" } }}>
          {router.pathname.split("/").map((route: string, index: number) => {
            return (
              route && (
                <Typography sx={{ textTransform: "capitalize" }}>
                  {route}
                </Typography>
              )
            );
          })}
        </Breadcrumbs>
      </Container>
    </>
  );
}
