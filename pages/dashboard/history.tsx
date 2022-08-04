import React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import HistoryList from "../../src/components/HistoryList";

const History: NextPage = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <Container>
        <Box sx={{ padding: "24px" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="All Visits" value="1" />
                <Tab label="Requested Visits" value="2" />
                <Tab label="Approved Visits" value="3" />
                <Tab label="Declined Visits" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <HistoryList />
              <HistoryList />
              <HistoryList />
              <HistoryList />
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
            <TabPanel value="4">Item Three</TabPanel>
          </TabContext>
        </Box>
      </Container>
    </>
  );
};

export default History;
