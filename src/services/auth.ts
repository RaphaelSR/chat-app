import { User as FirebaseUser, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut as signOutFirebase } from "firebase/auth";
import { auth } from '../config/firebase';
import { User, UserStatus } from '../types';
import { addUserToFirestore, getUserFromFirestore } from "./db";
import { getErrorMessage } from "./errorMessages";


export const signIn = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(getErrorMessage(error.code));
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOutFirebase(auth);
  } catch (error) {
    throw new Error(getErrorMessage(error.code));
  }
};

export const signUp = async (
  email: string, 
  password: string, 
  name: string, 
  avatar: string, 
  status: UserStatus | string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const user: User = {
      userId: firebaseUser.uid,
      email,
      name,
      avatar,
      status,
      contacts: [],
      groups: [],
      lastActive: new Date(),
      privacySettings: {
        lastSeen: "everyone",
        profilePhoto: "everyone",
        about: "everyone",
        status: "everyone",
      },
    };

    await addUserToFirestore(user);

    return user;
  } catch (error) {
    throw new Error(getErrorMessage(error.code));
  }
};



export const onAuthStateChange = (callback: (user: User) => void): (() => void) => {
  return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      const user = await getUserFromFirestore(firebaseUser.uid);
      callback({ ...user, loggedIn: true });
    } else {
      callback({ loggedIn: false, userId: null });
    }
  });
};


