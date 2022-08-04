import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#DDFFDD",
    my: 1,
  },
};

const HistoryList = () => {
  return (
    <Box sx={styles.root}>
      <Typography variant="h5">Inmate: John Doe</Typography>
      <Typography variant="h5">Date: 20-12-2020</Typography>
      <Typography variant="h5">Status: Approved</Typography>
      <Typography variant="h5">Visited: No</Typography>
    </Box>
  );
};

export default HistoryList;
