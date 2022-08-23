import React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import VisitList from "../../../src/components/VisitList";
import { getBookings, updateBooking } from "../../../src/backend/booking";
import { GlobalState } from "../../../src/Global";
import InfoModal from "../../../src/components/InfoModal";
import { useRouter } from "next/router";
import locales from "../../../src/locales";

const Admin: NextPage = () => {
  const [value, setValue] = React.useState("1");
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>(null);

  const { user } = React.useContext(GlobalState);

  const router = useRouter();
  const locale: any = router.locale;

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleShowInfo = (data: any) => {
    setData(data);
  };

  const handleGetBookings = async () => {
    const response: any = await getBookings();
    if (response.ok) {
      setBookings(response.bookings);
    } else {
      console.log(response.message);
    }
  };

  const handleUpdateBooking = async (visit: any, id: string) => {
    await updateBooking(visit, id)
      .then(() => {
        handleGetBookings();
      })
      .catch((e) => {
        console.log(e);
      });
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
              <TabList onChange={handleChange}>
                <Tab label={locales[locale].allVisits} value="1" />
                <Tab label={locales[locale].requestedVisits} value="2" />
                <Tab label={locales[locale].approvedVisits} value="3" />
                <Tab label={locales[locale].declinedVisits} value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {bookings.map((data: any, index: number) => {
                return (
                  <VisitList
                    handleShowInfo={handleShowInfo}
                    handleUpdateBooking={handleUpdateBooking}
                    key={index}
                    data={data}
                  />
                );
              })}
            </TabPanel>
            <TabPanel value="2">
              {bookings
                .filter(
                  (booking) =>
                    booking.isApproved === false && booking.isDeclined === false
                )
                .map((data: any, index: number) => {
                  return (
                    <VisitList
                      handleShowInfo={handleShowInfo}
                      handleUpdateBooking={handleUpdateBooking}
                      key={index}
                      data={data}
                    />
                  );
                })}
            </TabPanel>
            <TabPanel value="3">
              {bookings
                .filter((booking) => booking.isApproved === true)
                .map((data: any, index: number) => {
                  return (
                    <VisitList
                      handleShowInfo={handleShowInfo}
                      handleUpdateBooking={handleUpdateBooking}
                      key={index}
                      data={data}
                    />
                  );
                })}
            </TabPanel>
            <TabPanel value="4">
              {bookings
                .filter((booking) => booking.isDeclined === true)
                .map((data: any, index: number) => {
                  return (
                    <VisitList
                      handleShowInfo={handleShowInfo}
                      handleUpdateBooking={handleUpdateBooking}
                      key={index}
                      data={data}
                    />
                  );
                })}
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
      <InfoModal
        data={data}
        open={Boolean(data)}
        handleClose={() => setData(null)}
      />
    </>
  );
};

export default Admin;
