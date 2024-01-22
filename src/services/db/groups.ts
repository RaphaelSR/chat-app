import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Group } from '../../types';

export const addGroupToFirestore = async (group: Group): Promise<void> => {
    try {
      await setDoc(doc(db, "groups", group.groupId), group);
    } catch (error) {
      console.error("Erro ao adicionar grupo ao Firestore: ", error);
      throw error;
    }
  };
  