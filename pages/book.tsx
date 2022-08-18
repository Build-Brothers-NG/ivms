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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { Formik } from "formik";

import * as Yup from "yup";
import { bookVisit } from "../src/backend/booking";
import { GlobalState } from "../src/Global";
import { handleSignInAnonymously } from "../src/backend/authentication";
import locales from "../src/locales";
import Navbar from "../src/components/Navbar";
import { useRouter } from "next/router";

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

  const router = useRouter();
  const locale: any = router.locale;

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
      <Navbar />
      <Container>
        <Box sx={styles.box}>
          <Grid container spacing={{ xs: 3, md: 5 }}>
            <Grid item xs={12}>
              <Typography color="primary" variant="h4">
                {locales[locale].completeProfile}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ wordWrap: "normal" }}>
                {locales[locale].personalInfo}
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
                      label={locales[locale].fullName}
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[locale].fullNameHint}{" "}
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
                      label={locales[locale].idNumber + " (NRIC/FIN/Passport)"}
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[locale].idNumberHint}
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
                      label={locales[locale].contactNumber}
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[locale].contactNumberHint}{" "}
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
                      label={
                        locales[locale].emailAddress +
                        " (" +
                        locales[locale].optional +
                        ")"
                      }
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[locale].emailAddressHint}
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
                      label={locales[locale].homeAddress}
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[locale].homeAddressHint}{" "}
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
                      label={locales[locale].occupation}
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[locale].occupationHint}{" "}
                      <span className="important">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" sx={{ wordWrap: "normal" }}>
                      {locales[locale].inmateInfo}:
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
                      label={locales[locale].inmateName}
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[locale].inmateNameHint}.
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
                      label={
                        locales[locale].inmateNumber +
                        " (" +
                        locales[locale].optional +
                        ")"
                      }
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[locale].inmateNumberHint}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl variant="filled" fullWidth>
                      <InputLabel id="demo-simple-select-filled-label">
                        {locales[locale].visitRequest}
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
                          {locales[locale].oneTimeVisit}
                        </MenuItem>
                        <MenuItem value={"Regular Visit"}>
                          {locales[locale].regularVisit}
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[locale].visitRequestHint}
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
                      label={locales[locale].relationshipToInmate}
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[locale].relationshipToInmateHint}
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
                      label={locales[locale].reasonForVisit}
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[locale].reasonForVisitHint}
                      <span className="important">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl variant="filled" fullWidth>
                      <InputLabel id="demo-simple-select-filled-label">
                        {locales[locale].requestSupportedByFamily}
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
                        <MenuItem value={locales[locale].yes}>
                          {locales[locale].yes}
                        </MenuItem>
                        <MenuItem value={locales[locale].no}>
                          {locales[locale].no}
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[locale].requestSupportedByFamilyHint}.{" "}
                      <span className="important">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <LoadingButton
                      onClick={() => handleSubmit()}
                      variant="contained"
                      loading={loading}
                      loadingIndicator={locales[locale].book + "..."}
                      disableElevation
                      fullWidth
                      sx={styles.button}
                    >
                      {locales[locale].book}
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
