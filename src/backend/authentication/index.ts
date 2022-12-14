import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
import { auth } from "../../Libs/firebase";

export type AuthType = {
  email: string;
  password: string;
};

export interface RegisterType extends AuthType {
  fullName: string;
  confirmPassword?: string;
}

const handleSignInAnonymously = async () => {
  try {
    const data = await signInAnonymously(auth);
    if (data.user) {
      return { ok: true, user: data.user, messsage: "Login Successfully" };
    }
  } catch (error: any) {
    return { ok: false, problem: error.code, message: error.message };
  }
};
const handleLogin = async ({ email, password }: AuthType) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    if (data.user) {
      return { ok: true, user: data.user, messsage: "Login Successfully" };
    }
  } catch (error: any) {
    return { ok: false, problem: error.code, message: error.message };
  }
};

const handleRegister = async ({ email, password, fullName }: RegisterType) => {
  try {
    const data: any = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (data.user) {
      await updateProfile(auth.currentUser, {
        displayName: fullName,
      });
      return {
        ok: true,
        user: data.user,
        message: "Account Created Successfully",
      };
    }
  } catch (error: any) {
    return { ok: false, problem: error.code, message: error.message };
  }
};

const handleGoogleSignin = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    if (response.user) {
      return {
        ok: true,
        user: response.user,
        message: "Authenticated successfully",
      };
    }
  } catch (error: any) {
    return { ok: false, problem: error.code, message: error.message };
  }
};

const logOut = async ({ callback }: { callback: any }) => {
  signOut(auth)
    .then(() => {
      callback();
    })
    .catch((error) => {});
};

export {
  handleLogin,
  handleRegister,
  logOut,
  handleGoogleSignin,
  handleSignInAnonymously,
};
