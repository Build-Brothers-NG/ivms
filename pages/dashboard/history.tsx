import React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import HistoryList from "../../src/components/HistoryList";
import { getUserBookings } from "../../src/backend/booking";
import { GlobalState } from "../../src/Global";

const History: NextPage = () => {
  const [value, setValue] = React.useState("1");
  const [history, setHistory] = React.useState<any[]>([]);

  const { user } = React.useContext(GlobalState);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const handleGetBookings = async (email: string) => {
    const response: any = await getUserBookings(email);
    if (response.ok) {
      setHistory(response.bookings);
    } else {
      console.log(response);
    }
  };

  React.useEffect(() => {
    if (user) {
      handleGetBookings(user.email);
    }
  }, [user]);

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
              {history.map((data: any, index: number) => {
                return <HistoryList key={index} data={data} />;
              })}
            </TabPanel>
            <TabPanel value="2">
              {history
                .filter((h) => h.isApproved === false && h.isDeclined === false)
                .map((data: any, index: number) => {
                  return <HistoryList key={index} data={data} />;
                })}
            </TabPanel>
            <TabPanel value="3">
              {history
                .filter((h) => h.isApproved === true)
                .map((data: any, index: number) => {
                  return <HistoryList key={index} data={data} />;
                })}
            </TabPanel>
            <TabPanel value="4">
              {history
                .filter((h) => h.isDeclined === true)
                .map((data: any, index: number) => {
                  return <HistoryList key={index} data={data} />;
                })}
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </>
  );
};

export default History;
