import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/app/_backend/firebaseConfig";

export async function handleSignUpWithEmail(userName, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const dateJoined = new Date().toISOString();
    const user = {
      username: userName,
      email: email,
      dateJoined: dateJoined,
    };
    return user;
  } catch (error) {
    throw error;
  }
}

export async function handleSignInWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User created");
    console.log(`User: ${user}`);
  } catch (error) {
    console.log(`Error Code: ${error.code}  Error message: ${error.message}`);
  }
}

export async function handleSignOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(`Error when logging out: ${error}`);
  }
}

export async function handleDeleteUser() {
  try {
    await deleteUser(auth.currentUser);
  } catch (error) {
    console.log("Error while deleting user");
  }
}

export async function resetPasswordWithEmail(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
}
