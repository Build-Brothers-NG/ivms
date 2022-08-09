import React from "react";
import { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const VisitRequest: NextPage = () => {
  return (
    <Container>
      <Box sx={{ p: "24px" }}>
        <Grid container spacing={2}>
          <Grid container item spacing={2} xs={12} md={6}>
            <Grid item xs={12}>
              <Typography variant="h4">Visitors Information</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="primary" variant="h6">
                Full Name:
              </Typography>
              <Typography variant="subtitle1">Usman Gurowa Hassan</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="primary" variant="h6">
                Identification number (NRIC/FIN/Passport):
              </Typography>
              <Typography variant="subtitle1">123456754</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="primary" variant="h6">
                Email Address:
              </Typography>
              <Typography variant="subtitle1">Johndoe@gmail.com</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="primary" variant="h6">
                Occupation:
              </Typography>
              <Typography variant="subtitle1">Driver</Typography>
            </Grid>
          </Grid>
          <Grid container item spacing={2} xs={12} md={6}>
            <Grid item xs={12}>
              <Typography variant="h4">Inamtes Information</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography color="primary" variant="h6">
                Name of Inmate:
              </Typography>
              <Typography variant="subtitle1">John Doe</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography color="primary" variant="h6">
                Inmate Number
              </Typography>
              <Typography variant="subtitle1">123456754</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography color="primary" variant="h6">
                Visit Request:
              </Typography>
              <Typography variant="subtitle1">one-time visit</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography color="primary" variant="h6">
                Relationship to inmate:
              </Typography>
              <Typography variant="subtitle1">Driver</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography color="primary" variant="h6">
                Reason for Visit:
              </Typography>
              <Typography variant="subtitle1">Driver</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography color="primary" variant="h6">
                Is your request to visit supported by inmate's family member?:
              </Typography>
              <Typography variant="subtitle1">Driver</Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={2} xs={12} md={6}>
            <Grid item xs={12} md={6}>
              <Button sx={{ px: 3, py: 2 }} variant="contained">
                Approve Request
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button sx={{ px: 3, py: 2 }} variant="outlined">
                Decline Request
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default VisitRequest;
