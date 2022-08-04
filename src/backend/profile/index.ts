import { auth } from "../../Libs/firebase";

const getProfile = async () => {
  const user = auth.currentUser;
  if (user) {
    return { ok: true, user };
  } else {
    return { ok: false, user: null, message: "You are not logged in" };
  }
};
