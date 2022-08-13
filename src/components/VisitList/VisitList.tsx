import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";

const styles = {
  root: {
    padding: 3,
    backgroundColor: "#DDFFDD",
    my: 0.5,
  },
};

const VisitList = ({
  data,
  handleUpdateBooking,
  handleShowInfo,
}: {
  data: any;
  handleUpdateBooking: any;
  handleShowInfo: any;
}) => {
  const router = useRouter();

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
        <Grid item container xs={12} md={8} spacing={1}>
          <Grid item xs={12} md={3}>
            <Button
              disabled={data.isApproved}
              onClick={() =>
                handleUpdateBooking(
                  { isApproved: true, isDeclined: false },
                  data.id
                )
              }
              fullWidth
              variant="contained"
              disableElevation
            >
              Approve
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              disabled={data.isDeclined}
              onClick={() =>
                handleUpdateBooking(
                  { isDeclined: true, isApproved: false },
                  data.id
                )
              }
              fullWidth
              variant="outlined"
              disableElevation
            >
              Decline
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              disabled={!data.isApproved}
              onClick={() =>
                handleUpdateBooking(
                  {
                    visited: !data.visited,
                  },
                  data.id
                )
              }
              fullWidth
              variant="outlined"
              disableElevation
            >
              {data.visited ? <>Mark Unvisited</> : <>Mark Visited</>}
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            fullWidth
            onClick={() => handleShowInfo(data)}
            variant="outlined"
            disableElevation
          >
            Preview Info
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default VisitList;
