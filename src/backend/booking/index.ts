import { auth, db } from "../../Libs/firebase";
import { signInAnonymously } from "firebase/auth";

import { nanoid } from "nanoid";

import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { UserInfo } from "firebase/auth";

const bookVisit = async (data: any) => {
  const user: UserInfo = auth.currentUser;
  try {
    if (user) {
      const response = await setDoc(
        doc(db, "bookings", nanoid().replace(/-/g, `${new Date().getTime()}`)),
        {
          ...data,
          isApproved: false,
          isDeclined: false,
          createdAt: new Date().getTime(),
        },
        {
          merge: true,
        }
      );
    }
  } catch (error: any) {
    return { ok: false, message: error.message };
  }
};

const getUserBookings = async (email: string) => {
  try {
    const q = query(collection(db, "bookings"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const _data: any = [];
    querySnapshot.forEach((doc) => {
      _data.push(doc.data());
    });
    return { bookings: _data, ok: true };
  } catch (e: any) {
    return { message: e.message, ok: false };
  }
};

const getBookings = async () => {
  try {
    const docSnap = await getDocs(collection(db, "bookings"));
    const _data: any = [];
    docSnap.forEach((doc) => {
      _data.push(doc.data());
    });
    return { bookings: _data, ok: true };
  } catch (error: any) {
    return { ok: false, message: error.message };
  }
};

const getBooking = async (id: string) => {
  try {
    const docRef = doc(db, "bookings", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { booking: docSnap.data(), ok: true };
    } else {
      return { booking: null, ok: true };
    }
  } catch (error: any) {
    return { ok: false, message: error.message };
  }
};

export { bookVisit, getBookings, getBooking, getUserBookings };
