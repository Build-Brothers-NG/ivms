import React from "react";
import { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";
import { GlobalState } from "../../src/Global";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Formik } from "formik";

import * as Yup from "yup";
import { getProfile, updateProfile } from "../../src/backend/profile";
import { MessageType } from "../register";
import locales from "../../src/locales";

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
});

const Profile: NextPage = () => {
  const { user, language } = React.useContext(GlobalState);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<MessageType | null>(null);
  const [initValues, setInitValues] = React.useState<any>({
    fullName: "",
    email: "",
    idNumber: "",
    contactNumber: "",
    homeAddress: "",
    occupation: "",
  });

  const handleGetProfile = async (email: string) => {
    const response: any = await getProfile(email);
    if (response?.ok && response.user) {
      let tmp: any = {};
      Object.keys(initValues).forEach((key) => {
        tmp[key] = response.user[key];
      });
      setInitValues({ ...initValues, ...tmp });
    }
  };

  const handleSubmitForm = async (values: any) => {
    setLoading(true);
    await updateProfile(values)
      .then(() => {
        setMessage({ message: "Profile Updated", severity: "success" });
      })
      .catch((error) => {
        setMessage({ message: error.message, severity: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (user) {
      setInitValues({
        ...initValues,
        fullName: user.displayName,
        email: user.email,
      });
      handleGetProfile(user.email);
    }
  }, [user]);

  if (!user) {
    return null;
  }
  return (
    <>
      <Container>
        <Box sx={styles.box}>
          <Grid container spacing={{ xs: 3, md: 5 }}>
            <Grid item xs={12}>
              <Typography color="primary" variant="h4">
                {locales[language].completeProfile.split("👋")[0]}👋{" "}
                {user.displayName}
                {", "}
                {locales[language].completeProfile.split("👋")[1]}
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
                      label={locales[language].fullName}
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[language].fullNameHint}{" "}
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
                      label={
                        locales[language].idNumber + " (NRIC/FIN/Passport)"
                      }
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[language].idNumberHint}
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
                      label={locales[language].contactNumber}
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[language].contactNumberHint}{" "}
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
                        locales[language].emailAddress +
                        " (" +
                        locales[language].optional +
                        ")"
                      }
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[language].emailAddressHint}
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
                      label={locales[language].homeAddress}
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[language].homeAddressHint}{" "}
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
                      label={locales[language].occupation}
                    />
                    <Typography variant="subtitle2" sx={{ wordWrap: "normal" }}>
                      {locales[language].occupationHint}{" "}
                      <span className="important">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <LoadingButton
                      onClick={() => handleSubmit()}
                      variant="contained"
                      loading={loading}
                      loadingPosition="end"
                      endIcon={<AccountCircleIcon />}
                      disableElevation
                      fullWidth
                      sx={{ ...styles.button, justifyContent: "center" }}
                    >
                      Save
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

export default Profile;
