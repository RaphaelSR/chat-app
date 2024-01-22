import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Contact, User, UserStatus } from '../../types';




export const getUserFromFirestore = async (userId: string): Promise<User> => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        return userDoc.data() as User;
      } else {
        throw new Error("User does not exist");
      }
    } catch (error) {
      console.error("Error fetching user from Firestore: ", error);
      throw error;
    }
  };
  
  export const addUserToFirestore = async (user: User): Promise<void> => {
    try {
      await setDoc(doc(db, "users", user.userId), user);
    } catch (error) {
      console.error("Erro ao adicionar usuário ao Firestore: ", error);
      throw error;
    }
  };
  
  export const updateUserStatus = async (userId: string, status: UserStatus | string): Promise<void> => {
    try {
      if (!status) {
        status = ''
      }
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { status });
    } catch (error) {
      console.error("Erro ao atualizar o status do usuário no Firestore: ", error);
      throw error;
    }
  };

  const getUserByEmailFromFirestore = async (email: string): Promise<User | null> => {
    const userSnapshot = await getDocs(query(collection(db, "users"), where("email", "==", email)));
    if (userSnapshot.empty) {
      return null;
    } else {
      return userSnapshot.docs[0].data() as User;
    }
  };
  
  export const addContactToFirestore = async (currentUserId: string, contactEmail: string): Promise<Contact | null> => {
    try {
      // Primeiro, verifique se o usuário com o email de contato existe no Firestore
      const contactData = await getUserByEmailFromFirestore(contactEmail);
      if (!contactData) {
        throw new Error("User does not exist");
      }
  
      // Se o contato existir, adicione-o à lista de contatos do usuário atual
      const userRef = doc(db, "users", currentUserId);
      const updatedContacts = [...(await getUserFromFirestore(currentUserId)).contacts, contactData];
      await updateDoc(userRef, { contacts: updatedContacts });
  
      return contactData;
    } catch (error) {
      throw error;
    }
  };

  export const getEmailFromUserId = async (userId: string): Promise<string | null> => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        return userData.email;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  export const deleteContactFromFirebase = async (userId: string, contactId: string): Promise<boolean> => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const contactEmail = await getEmailFromUserId(contactId);
        if (contactEmail) {
          const updatedContacts = userData.contacts.filter((contact: any) => contact.email !== contactEmail);
          await updateDoc(userRef, { contacts: updatedContacts });
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  export const getContactsFromFirebase = async (userId: string) => {
    try {
      const userRef = collection(db, 'users');
      const q = query(userRef, where('userId', '==', userId));
      const userSnapshot = await getDocs(q);
      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        return userData.contacts;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Erro ao buscar contatos do Firebase", error);
      return [];
    }
  };

  export async function updateUserAvatar(userId: string, avatarUrl: string) {
    const userRef = doc(collection(db, 'users'), userId);

    await updateDoc(userRef, {
      avatar: avatarUrl,
    });
  
    updateAvatarInContacts(userId, avatarUrl);
  }
  
  async function updateAvatarInContacts(userId: string, avatarUrl: string) {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const users = usersSnapshot.docs.map(doc => doc.data());
  
    for (const user of users) {
      const contacts = user.contacts as Array<any>;
      for (const contact of contacts) {
        if (contact.userId === userId) {
          contact.avatar = avatarUrl;
        }
      }
  
      const userToUpdateRef = doc(collection(db, 'users'), user.userId);
      await updateDoc(userToUpdateRef, {
        contacts: contacts,
      });
    }
  }