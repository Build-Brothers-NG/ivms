import React from "react";
import { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "../../src/Link";

import BookIcon from "../../src/icons/Book";

import WarningIcon from "@mui/icons-material/Warning";
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { UserInfo } from "firebase/auth";
import { auth } from "../../src/Libs/firebase";

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
  const [user, setUser] = React.useState<UserInfo | null>(null);

  React.useEffect(() => {
    const temp = auth.currentUser;
    if (temp) {
      setUser(temp);
      console.log(temp);
    }
  }, []);

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
            <Link style={{ textDecoration: "none" }} href="/dashboard/profile">
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
          </Grid>
          <Grid item xs={12} md={6}>
            <Link style={{ textDecoration: "none" }} href="/dashboard/booking">
              <Button
                color="success"
                fullWidth
                sx={styles.button}
                variant="contained"
                disableElevation
                endIcon={<BookIcon />}
              >
                Book Visit
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
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
