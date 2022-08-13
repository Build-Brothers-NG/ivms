import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const InfoModal = ({
  open,
  handleClose,
  data,
}: {
  open: boolean;
  handleClose(): void;
  data: any;
}) => {
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="scroll-dialog-title">Visit Information</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <Box sx={{ p: "24px" }}>
            <Grid container spacing={2}>
              <Grid
                container
                item
                spacing={2}
                xs={12}
                md={6}
                sx={{
                  borderRight: { xs: "none", md: "2px solid text.primary" },
                }}
              >
                <Grid item xs={12}>
                  <Typography variant="h4">Visitors Information</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography color="primary" variant="h6">
                    Full Name
                  </Typography>
                  <Typography variant="subtitle1">{data?.fullName}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography color="primary" variant="h6">
                    ID number (NRIC/FIN/Passport)
                  </Typography>
                  <Typography variant="subtitle1">{data?.idNumber}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography color="primary" variant="h6">
                    Contact
                  </Typography>
                  <Typography variant="subtitle1">
                    {data?.contactNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography color="primary" variant="h6">
                    Email Address
                  </Typography>
                  <Typography variant="subtitle1">{data?.email}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography color="primary" variant="h6">
                    Home Address
                  </Typography>
                  <Typography variant="subtitle1">
                    {data?.homeAddress}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography color="primary" variant="h6">
                    Occupation
                  </Typography>
                  <Typography variant="subtitle1">
                    {data?.occupation}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item spacing={2} xs={12} md={6}>
                <Grid item xs={12}>
                  <Typography variant="h4">Visits Information</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography color="primary" variant="h6">
                    Name of Inmate
                  </Typography>
                  <Typography variant="subtitle1">
                    {data?.inmateName}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography color="primary" variant="h6">
                    Inmate Number
                  </Typography>
                  <Typography variant="subtitle1">
                    {data?.inmateNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography color="primary" variant="h6">
                    Visit Request
                  </Typography>
                  <Typography variant="subtitle1">
                    {data?.visitRequest}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography color="primary" variant="h6">
                    Relationship to inmate
                  </Typography>
                  <Typography variant="subtitle1">
                    {data?.relationshipToInmate}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography color="primary" variant="h6">
                    Reason for Visit
                  </Typography>
                  <Typography variant="subtitle1">
                    {data?.reasonForVisit}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography color="primary" variant="subtitle1">
                    Is your request to visit supported by inmate's family
                    member?
                  </Typography>
                  <Typography variant="subtitle1">
                    {data?.familyAwareness}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InfoModal;
