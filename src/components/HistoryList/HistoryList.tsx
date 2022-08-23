import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import locales from "../../locales";

const styles = {
  root: {
    padding: 3,
    backgroundColor: "#DDFFDD",
    my: 0.5,
  },
};

const HistoryList = ({ data }: { data: any }) => {
  const router = useRouter();
  const locale: any = router.locale;
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          ...styles.root,
          backgroundColor: data.isApproved
            ? "#DDFFDD"
            : data.isDeclined
            ? "#F7D5CA"
            : "#F2F1C7",
        }}
      >
        <Grid item xs={12} md={3}>
          <Typography color="primary" variant="h6">
            {locales[locale].inmate}
          </Typography>
          <Typography variant="subtitle1">{data.inmateName}</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography color="primary" variant="h6">
            Date
          </Typography>
          <Typography variant="subtitle1">
            {new Date(data.createdAt).toDateString()}
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography color="primary" variant="h6">
            {locales[locale].status}
          </Typography>
          <Typography variant="subtitle1">
            {data.isApproved ? (
              <>{locales[locale].approved}</>
            ) : data.isDeclined ? (
              <>{locales[locale].decline}</>
            ) : (
              <>{locales[locale].decline}</>
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography color="primary" variant="h6">
            {locales[locale].visited}
          </Typography>
          <Typography variant="subtitle1">
            {data.visited ? (
              <>{locales[locale].yes}</>
            ) : (
              <>{locales[locale].no}</>
            )}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default HistoryList;
