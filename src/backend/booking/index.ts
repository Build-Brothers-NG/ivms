import { auth, db } from "../../Libs/firebase";
import { signInAnonymously } from "firebase/auth";

import { nanoid } from "nanoid";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserInfo } from "firebase/auth";

const bookVisit = async (data: any) => {
  const user: UserInfo = auth.currentUser;
  try {
    if (user) {
      const response = await setDoc(
        doc(
          db,
          `bookings/bookings/${user.email || user.uid}`,
          nanoid().replace(/-/g, `${new Date().getTime()}`)
        ),
        { ...data, isApproved: false, createdAt: new Date().getTime() },
        {
          merge: true,
        }
      );
    }
  } catch (error: any) {
    return { ok: false, message: error.message };
  }
};

export { bookVisit };
