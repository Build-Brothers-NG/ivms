import * as React from "react";

import { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import LoadingButton from "@mui/lab/LoadingButton";

import { Formik } from "formik";

import * as Yup from "yup";
import { getProfile } from "../../src/backend/profile";
import { GlobalState } from "../../src/Global";
import { useRouter } from "next/router";
import { bookVisit } from "../../src/backend/booking";
import locales from "../../src/locales";

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

  const [profile, setProfile] = React.useState<any>({});

  const { user } = React.useContext(GlobalState);

  const router = useRouter();
  const locale: any = router.locale;

  const handleGetProfile = async (email: string) => {
    const response: any = await getProfile(email);
    if (response?.ok && response.user) {
      setProfile(response.user);
    }
  };

  const handleSubmitForm = async (values: any) => {
    setLoading(true);
    await bookVisit({ ...values, ...profile })
      .then(() => {
        setMessage({ message: "Booking Requested", severity: "success" });
        setTimeout(() => {
          router.push("/dashboard", {}, { locale });
        }, 2000);
      })
      .catch((error) => {
        setMessage({ message: error.message, severity: "error" });
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    if (user) {
      if (user.isAnonymouse) {
        router.push("/book", {}, { locale });
      } else {
        handleGetProfile(user.email);
      }
    }
  }, []);

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
                {/* {locales[locale].completeProfile.split("👋")[0]} 👋
                {user.displayName}.{" "}
                {locales[locale].completeProfile.split("👋")[1]} */}
                {locales[locale].whoAreTryingToVisit}
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

export default Booking;
