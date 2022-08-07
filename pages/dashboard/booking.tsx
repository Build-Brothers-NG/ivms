import * as React from "react";

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
import LoadingButton from "@mui/lab/LoadingButton";

import { Formik } from "formik";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  inmateName: Yup.string().required().label("Name of inmate"),
  inmateNumber: Yup.string().label("Inmate Number"),
  visitRequest: Yup.string().required().label("Visit Request"),
  relationshipToInmate: Yup.string().required().label("Relation To Inmate"),
  reasonForVisit: Yup.string().required().label("Reason For Visit"),
  familyAwareness: Yup.string().required().label("Family Awareness"),
});

const styles = {
  box: { px: { xs: 1, md: "24px" }, my: 3 },
  button: {
    fontSize: "large",
    p: 2,
    justifyContent: "space-around",
  },
};

const initValues = {
  inmateName: "",
  inmateNumber: "",
  visitRequest: "",
  relationshipToInmate: "",
  reasonForVisit: "",
  familyAwareness: "",
};

const Booking: NextPage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<any>(null);
  const handleSubmitForm = async () => {};
  return (
    <Container>
      <Box sx={styles.box}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          <Grid item xs={12}>
            <Typography color="primary" variant="h4">
              Hi, 👋 John Doe. Who are you trying to visit?
            </Typography>
          </Grid>
          <Formik
            initialValues={initValues}
            onSubmit={handleSubmitForm}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    onBlur={handleBlur("inmateName")}
                    onChange={handleChange("inmateName")}
                    error={
                      Boolean(errors["inmateName"]) &&
                      Boolean(touched["inmateName"])
                    }
                    value={values["inmateName"]}
                    helperText={errors["inmateName"]}
                    variant="filled"
                    label="Name of Inmate"
                  />
                  <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                    Please provide us with the full name of the inmate whom you
                    are requesting to visit.
                    <span className="important">*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    onBlur={handleBlur("inmateNumber")}
                    onChange={handleChange("inmateNumber")}
                    error={
                      Boolean(errors["inmateNumber"]) &&
                      Boolean(touched["inmateNumber"])
                    }
                    value={values["inmateNumber"]}
                    helperText={errors["inmateNumber"]}
                    variant="filled"
                    label="Inmate Number (optional)"
                  />
                  <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                    Please provide us with the inmate number of the inmate you
                    are requesting to visit
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
                      onBlur={handleBlur("visitRequest")}
                      onChange={(e) =>
                        setFieldValue("visitRequest", e.target.value, true)
                      }
                      error={
                        Boolean(errors["visitRequest"]) &&
                        Boolean(touched["visitRequest"])
                      }
                      value={values["visitRequest"]}
                      // helperText={errors["visitRequest"]}
                      // value={age}
                      // onChange={handleChange}
                    >
                      <MenuItem value={"One-Time Visit"}>
                        One-Time Visit
                      </MenuItem>
                      <MenuItem value={"Regular Visit"}>Regular Visit</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                    Please indicate if the request is for a one-time visit or
                    regular visit
                    <span className="important">*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    onBlur={handleBlur("relationshipToInmate")}
                    onChange={handleChange("relationshipToInmate")}
                    error={
                      Boolean(errors["relationshipToInmate"]) &&
                      Boolean(touched["relationshipToInmate"])
                    }
                    value={values["relationshipToInmate"]}
                    helperText={errors["relationshipToInmate"]}
                    variant="filled"
                    label="Relationship to inmate"
                  />
                  <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                    Please indicate your relationship to the inmate
                    <span className="important">*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    onBlur={handleBlur("reasonForVisit")}
                    onChange={handleChange("reasonForVisit")}
                    error={
                      Boolean(errors["reasonForVisit"]) &&
                      Boolean(touched["reasonForVisit"])
                    }
                    value={values["reasonForVisit"]}
                    helperText={errors["reasonForVisit"]}
                    variant="filled"
                    label="Reason for Visit"
                  />
                  <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                    Please state the reason for your request to visit
                    <span className="important">*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">
                      Is your request to visit supported by inmate's family
                      member?
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      fullWidth
                      onBlur={handleBlur("familyAwareness")}
                      onChange={(e) =>
                        setFieldValue("familyAwareness", e.target.value, true)
                      }
                      error={
                        Boolean(errors["familyAwareness"]) &&
                        Boolean(touched["familyAwareness"])
                      }
                      value={values["familyAwareness"]}
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
                  <LoadingButton
                    color="primary"
                    loading={loading}
                    loadingIndicator={"Booking..."}
                    fullWidth
                    sx={styles.button}
                    variant="contained"
                    disableElevation
                  >
                    Book
                  </LoadingButton>
                </Grid>
              </>
            )}
          </Formik>
        </Grid>
      </Box>
    </Container>
  );
};

export default Booking;
