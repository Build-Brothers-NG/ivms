import React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import VisitList from "../../../src/components/VisitList";
import { getBookings } from "../../../src/backend/booking";
import { GlobalState } from "../../../src/Global";

const Admin: NextPage = () => {
  const [value, setValue] = React.useState("1");
  const [bookings, setBookings] = React.useState<any[]>([]);

  const { user } = React.useContext(GlobalState);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleGetBookings = async () => {
    const response: any = await getBookings();
    if (response.ok) {
      setBookings(response.bookings);
    } else {
      console.log(response.message);
    }
  };

  React.useEffect(() => {
    if (user) {
      handleGetBookings();
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
              {bookings.map((data: any, index: number) => {
                return <VisitList key={index} data={data} />;
              })}
            </TabPanel>
            <TabPanel value="2">
              {bookings
                .filter(
                  (booking) =>
                    booking.isApproved === false && booking.isDeclined === false
                )
                .map((data: any, index: number) => {
                  return <VisitList key={index} data={data} />;
                })}
            </TabPanel>
            <TabPanel value="3">
              {bookings
                .filter((booking) => booking.isApproved === true)
                .map((data: any, index: number) => {
                  return <VisitList key={index} data={data} />;
                })}
            </TabPanel>
            <TabPanel value="4">
              {bookings
                .filter((booking) => booking.isDeclined === true)
                .map((data: any, index: number) => {
                  return <VisitList key={index} data={data} />;
                })}
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </>
  );
};

export default Admin;
