import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const styles = {
  root: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#DDFFDD",
    my: 0.5,
  },
};

const HistoryList = () => {
  return (
    <Stack spacing={5} direction={{ xs: "column", md: "row" }} sx={styles.root}>
      <Typography variant="h6">Inmate: John Doe</Typography>
      <Typography variant="h6">Date: 20-12-2020</Typography>
      <Typography variant="h6">Status: Approved</Typography>
      <Typography variant="h6">Visited: No</Typography>
    </Stack>
  );
};

export default HistoryList;
