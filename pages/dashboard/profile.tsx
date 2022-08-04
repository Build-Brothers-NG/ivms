import React from "react";
import { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { InputLabel } from "@mui/material";

const styles = {
  box: { px: { xs: 1, md: "24px" }, my: 3 },
  button: {
    fontSize: "large",
    p: 2,
    justifyContent: "space-around",
  },
};

const Profile: NextPage = () => {
  return (
    <Container>
      <Box sx={styles.box}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          <Grid item xs={12}>
            <Typography color="primary" variant="h4">
              Hi, John Doe 👋 complete your profile.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth variant="filled" label="Full name" />
            <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
              Please provide the full name of the applicant{" "}
              <span className="important">*</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="filled"
              label="Identification number (NRIC/FIN/Passport)"
            />
            <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
              Please provide the full NRIC no./ FIN/ Passport Number.
              <span className="important">*</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="filled"
              label="Contact Number (Mobile Number is preferred)"
            />
            <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
              You will recieve an SMS once your application is approved.
              <span className="important">*</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="filled"
              label="Email Address (optional)"
            />
            <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
              Please provide a valid email address for notification of the
              outcome of this application if you do not have a valid Singapore
              mobile number.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth variant="filled" label="Home Address" />
            <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
              Please provide a home address <span className="important">*</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth variant="filled" label="Occupation" />
            <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
              Please provide an occupation <span className="important">*</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              color="primary"
              fullWidth
              sx={styles.button}
              variant="contained"
              disableElevation
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
