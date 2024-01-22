import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Message } from '../../types';

export const addMessageToChat = async (chatId: string, message: Message): Promise<void> => {
    try {
      await addDoc(collection(db, "chats", chatId, "messages"), message);
    } catch (error) {
      console.error("Erro ao adicionar mensagem ao chat no Firestore: ", error);
      throw error;
    }
  };