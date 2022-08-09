import React from "react";
import { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
// import { GlobalState } from "../../src/Global";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { Formik } from "formik";

import * as Yup from "yup";
import { bookVisit } from "../src/backend/booking";
import { GlobalState } from "../src/Global";
import { handleSignInAnonymously } from "../src/backend/authentication";
// import { getProfile, updateProfile } from "../../src/backend/profile";
// import { MessageType } from "../register";

const styles = {
  box: { px: { xs: 1, md: "24px" }, my: 3 },
  button: {
    fontSize: "large",
    p: 2,
    justifyContent: "space-around",
  },
};

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required().label("Full Name"),
  idNumber: Yup.string().required().label("Identification Number"),
  contactNumber: Yup.string().required().label("Contact Number"),
  email: Yup.string().email().label("Email"),
  homeAddress: Yup.string().required().label("Home Address"),
  occupation: Yup.string().required().label("Occupation"),
  inmateName: Yup.string().required().label("Name of inmate"),
  inmateNumber: Yup.string().label("Inmate Number"),
  visitRequest: Yup.string().required().label("Visit Request"),
  relationshipToInmate: Yup.string().required().label("Relation To Inmate"),
  reasonForVisit: Yup.string().required().label("Reason For Visit"),
  familyAwareness: Yup.string().required().label("Family Awareness"),
});

const initValues = {
  fullName: "",
  email: "",
  idNumber: "",
  contactNumber: "",
  homeAddress: "",
  occupation: "",
  inmateName: "",
  inmateNumber: "",
  visitRequest: "",
  relationshipToInmate: "",
  reasonForVisit: "",
  familyAwareness: "",
};

const Book: NextPage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<any>(null);
  const { user } = React.useContext(GlobalState);

  const handleSubmitForm = async (values: any) => {
    setLoading(true);
    await bookVisit(values)
      .then(() => {
        setMessage({ message: "Booking Requested", severity: "success" });
      })
      .catch((error) => {
        setMessage({ message: error.message, severity: "error" });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Container>
        <Box sx={styles.box}>
          <Grid container spacing={{ xs: 3, md: 5 }}>
            <Grid item xs={12}>
              <Typography color="primary" variant="h4">
                Hi, 👋 complete the form below to book a visit.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ wordWrap: "normal" }}>
                Your Personal Information:
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
                      onBlur={handleBlur("fullName")}
                      onChange={handleChange("fullName")}
                      error={
                        Boolean(errors["fullName"]) &&
                        Boolean(touched["fullName"])
                      }
                      value={values["fullName"]}
                      helperText={errors["fullName"]}
                      variant="filled"
                      label="Full name"
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      Please provide the full name of the applicant{" "}
                      <span className="important">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      onBlur={handleBlur("idNumber")}
                      onChange={handleChange("idNumber")}
                      error={
                        Boolean(errors["idNumber"]) &&
                        Boolean(touched["idNumber"])
                      }
                      value={values["idNumber"]}
                      helperText={errors["idNumber"]}
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
                      onBlur={handleBlur("contactNumber")}
                      onChange={handleChange("contactNumber")}
                      error={
                        Boolean(errors["contactNumber"]) &&
                        Boolean(touched["contactNumber"])
                      }
                      value={values["contactNumber"]}
                      helperText={errors["contactNumber"]}
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
                      onBlur={handleBlur("email")}
                      onChange={handleChange("email")}
                      error={
                        Boolean(errors["email"]) && Boolean(touched["email"])
                      }
                      value={values["email"]}
                      helperText={errors["email"]}
                      variant="filled"
                      label="Email Address (optional)"
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      Please provide a valid email address for notification of
                      the outcome of this application if you do not have a valid
                      Singapore mobile number.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      onBlur={handleBlur("homeAddress")}
                      onChange={handleChange("homeAddress")}
                      error={
                        Boolean(errors["homeAddress"]) &&
                        Boolean(touched["homeAddress"])
                      }
                      value={values["homeAddress"]}
                      helperText={errors["homeAddress"]}
                      variant="filled"
                      label="Home Address"
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      Please provide a home address{" "}
                      <span className="important">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      onBlur={handleBlur("occupation")}
                      onChange={handleChange("occupation")}
                      error={
                        Boolean(errors["occupation"]) &&
                        Boolean(touched["occupation"])
                      }
                      value={values["occupation"]}
                      helperText={errors["occupation"]}
                      variant="filled"
                      label="Occupation"
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      Please provide an occupation{" "}
                      <span className="important">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" sx={{ wordWrap: "normal" }}>
                      Inmate Information:
                    </Typography>
                  </Grid>
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
                      Please provide us with the full name of the inmate whom
                      you are requesting to visit.
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
                        <MenuItem value={"Regular Visit"}>
                          Regular Visit
                        </MenuItem>
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
                      Please note that the inmate's family member supporting
                      your request to visit must be a registered visitor.{" "}
                      <span className="important">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <LoadingButton
                      onClick={() => handleSubmit()}
                      variant="contained"
                      loading={loading}
                      loadingIndicator="Booking......"
                      disableElevation
                      fullWidth
                      sx={styles.button}
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
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={() => setMessage(null)}
      >
        <Alert severity={message?.severity}>{message?.message}</Alert>
      </Snackbar>
    </>
  );
};

export default Book;
