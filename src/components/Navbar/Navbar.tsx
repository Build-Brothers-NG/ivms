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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Link from "../../Link";
import { useRouter } from "next/router";
import { auth } from "../../Libs/firebase";
import { signOut } from "firebase/auth";
import { GlobalState } from "../../Global";
import locales from "../../locales";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user, handleChangeLanguage } = React.useContext(GlobalState);
  const router = useRouter();
  const locale: any = router.locale;

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        router.push("/login", { pathname: "/login" }, { locale });
      })
      .catch((error: any) => {});
  };
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang: "en" | "fr") => {
    handleChangeLanguage(lang);
    handleClose();
  };
  return (
    <>
      <AppBar position="static" sx={{ boxShadow: "none" }}>
        <Container>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              <Link
                href={user && user.isAnonymous ? "/" : "/dashboard"}
                style={{ textDecoration: "none", color: "inherit" }}
                locale={locale}
              >
                IVMS
              </Link>
            </Typography>

            {user && !user.isAnonymous ? (
              <>
                <Button onClick={logOut} color="inherit">
                  {locales[locale].logout}
                </Button>
                <Typography variant="h4" component="div">
                  |
                </Typography>{" "}
              </>
            ) : null}
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              color="inherit"
            >
              {locales[locale].language} ({locale})
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => changeLanguage("en")}>
                English (En)
              </MenuItem>
              <MenuItem onClick={() => changeLanguage("fr")}>
                French (Fr)
              </MenuItem>
            </Menu>
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
                <Typography key={route} sx={{ textTransform: "capitalize" }}>
                  {locales[locale][route]}
                </Typography>
              )
            );
          })}
        </Breadcrumbs>
      </Container>
    </>
  );
}
