import React from "react";
import { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "../../src/Link";

import WarningIcon from "@mui/icons-material/Warning";
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { GlobalState } from "../../src/Global";
import { getProfile } from "../../src/backend/profile";
import PendingIcon from "@mui/icons-material/Pending";
import VerifiedIcon from "@mui/icons-material/Verified";
import locales from "../../src/locales";
import { useRouter } from "next/router";

const styles = {
  box: {
    px: { xs: 0, md: "24px" },
  },
  button: {
    fontSize: "x-large",
    p: 2,
    justifyContent: "space-around",
  },
};

const Dashboard: NextPage = () => {
  const { user } = React.useContext(GlobalState);
  const [isVerified, setIsVerified] = React.useState<boolean>(false);
  const [isProfileComplete, setIsProfileComplet] =
    React.useState<boolean>(true);
  const router = useRouter();
  const locale: any = router.locale;

  const handleCheckProfile = async (email: string) => {
    const response = await getProfile(email);
    if (response.ok) {
      if (response.user) {
        setIsProfileComplet(true);
        if (response.user?.isVerified) {
          setIsVerified(true);
        }
      } else {
        setIsProfileComplet(false);
      }
    }
  };

  React.useEffect(() => {
    if (user) {
      handleCheckProfile(user.email || user.uid);
      if (user.isAnonymous) {
        router.push("/");
      }
    }
  }, [user]);

  if (!user) {
    return null;
  }
  return (
    <Container maxWidth="lg">
      <Box sx={styles.box}>
        <Grid container spacing={3} marginTop={3}>
          <Grid item xs={12}>
            <Typography color="primary" variant="h3">
              Welcome {user.displayName} 👋
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {isProfileComplete ? (
              <>
                {isVerified ? (
                  <Button
                    color="info"
                    sx={{ px: 2, py: 2 }}
                    variant="contained"
                    disableElevation
                    startIcon={<VerifiedIcon />}
                  >
                    Your profile Verified!
                  </Button>
                ) : (
                  <Button
                    color="info"
                    sx={{ px: 2, py: 2 }}
                    variant="contained"
                    disableElevation
                    startIcon={<PendingIcon />}
                  >
                    Your profile is awaiting verification!
                  </Button>
                )}
              </>
            ) : (
              <Link
                style={{ textDecoration: "none" }}
                href="/dashboard/profile"
                locale={locale}
              >
                <Button
                  color="warning"
                  sx={{ px: 2, py: 2 }}
                  variant="contained"
                  disableElevation
                  startIcon={<WarningIcon />}
                >
                  Complete your profile
                </Button>
              </Link>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Link
              style={{ textDecoration: "none" }}
              href="/dashboard/booking"
              locale={locale}
            >
              <Button
                color="success"
                disabled={isVerified || isProfileComplete}
                fullWidth
                sx={styles.button}
                variant="contained"
                disableElevation
                endIcon={<ReceiptLongIcon />}
              >
                {locales[locale].bookVisit}
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link
              style={{ textDecoration: "none" }}
              href="/dashboard/history"
              locale={locale}
            >
              <Button
                color="info"
                fullWidth
                sx={styles.button}
                variant="contained"
                disableElevation
                endIcon={<HistoryIcon />}
              >
                View History
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              color="error"
              fullWidth
              sx={styles.button}
              variant="contained"
              disableElevation
              endIcon={<GroupIcon />}
            >
              People Visited
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
