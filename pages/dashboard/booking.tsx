import { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const styles = {
  box: { px: { xs: 1, md: "24px" }, my: 3 },
  button: {
    fontSize: "large",
    p: 2,
    justifyContent: "space-around",
  },
};

const Booking: NextPage = () => {
  return (
    <Container>
      <Box sx={styles.box}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          <Grid item xs={12}>
            <Typography color="primary" variant="h4">
              Hi, 👋 John Doe. Who are you trying to visit?
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth variant="filled" label="Name of Inmate" />
            <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
              Please provide us with the full name of the inmate whom you are
              requesting to visit.
              <span className="important">*</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="filled"
              label="Inmate Number (optional)"
            />
            <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
              Please provide us with the inmate number of the inmate you are
              requesting to visit
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Visit request
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                fullWidth
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value={1}>One-Time Visit</MenuItem>
                <MenuItem value={2}>Regular Visit</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
              Please indicate if the request is for a one-time visit or regular
              visit
              <span className="important">*</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="filled"
              label="Relationship to inmate"
            />
            <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
              Please indicate your relationship to the inmate
              <span className="important">*</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth variant="filled" label="Reason for Visit" />
            <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
              Please state the reason for your request to visit
              <span className="important">*</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Is your request to visit supported by inmate's family member?
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                fullWidth
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={2}>No</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
              Please note that the inmate's family member supporting your
              request to visit must be a registered visitor.{" "}
              <span className="important">*</span>
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
              Book
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Booking;
