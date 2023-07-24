import { User as FirebaseUser, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut as signOutFirebase } from "firebase/auth";
import { getErrorMessage } from "./errorMessages";
import { auth } from './firebase';

interface User {
  loggedIn: boolean;
  userId: string | null;
}

export const signIn = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(getErrorMessage(error.code));
  }
};


export const signOut = async (): Promise<void> => {
  try {
    await signOutFirebase(auth);
  } catch (error) {
    throw new Error(getErrorMessage(error.code));
  }
};


export const signUp = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    return { loggedIn: true, userId: firebaseUser.uid };
  } catch (error) {
    throw new Error(getErrorMessage(error.code));
  }
};
  

export const onAuthStateChange = (callback: (user: User) => void): (() => void) => {
  return onAuthStateChanged(auth, (user: FirebaseUser | null) => {
    if (user) {
      callback({ loggedIn: true, userId: user.uid });
    } else {
      callback({ loggedIn: false, userId: null });
    }
  });
};
