import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Libs/firebase";

export type AuthType = {
  email: string;
  password: string;
};

export interface RegisterType extends AuthType {
  fullName: string;
  confirmPassword?: string;
}

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

const logOut = async ({ callback }: { callback(): void }) => {
  signOut(auth)
    .then(() => {
      callback();
    })
    .catch((error) => {});
};

export { handleLogin, handleRegister, logOut };
