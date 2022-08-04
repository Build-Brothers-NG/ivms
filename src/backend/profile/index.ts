import { auth, db } from "../../Libs/firebase";
import { nanoid } from "nanoid";

import { doc, setDoc, getDoc } from "firebase/firestore";

// nanoid();

const getProfile = async (email: string) => {
  try {
    const docRef = doc(db, "profiles", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { user: docSnap.data(), ok: true };
    } else {
      return { user: null, ok: true };
    }
  } catch (error: any) {
    return { ok: false, message: error.message };
  }
};

const updateProfile = async (data: any) => {
  try {
    const response = await setDoc(
      doc(db, "profiles", data.email),
      { ...data, isComplete: true },
      {
        merge: true,
      }
    );
  } catch (error: any) {
    return { ok: false, message: error.message };
  }
};

export { updateProfile, getProfile };
