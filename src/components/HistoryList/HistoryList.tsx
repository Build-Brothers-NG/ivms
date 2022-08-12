import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

const styles = {
  root: {
    padding: 3,
    backgroundColor: "#DDFFDD",
    my: 0.5,
  },
};

const HistoryList = ({ data }: { data: any }) => {
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
            Inmate
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
            Status
          </Typography>
          <Typography variant="subtitle1">
            {data.isApproved ? (
              <>Approved</>
            ) : data.isDeclined ? (
              <>Declined</>
            ) : (
              <>Unapproved</>
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography color="primary" variant="h6">
            Visited
          </Typography>
          <Typography variant="subtitle1">
            {data.visited ? <>Yes</> : <>No</>}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default HistoryList;
