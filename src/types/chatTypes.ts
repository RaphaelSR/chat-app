import { User } from "./userTypes";

export interface Chat {
    chatId: string;
    messages: Message[];
}

export interface Message {
    messageId: string;
    sender: User;
    timestamp: Date;
    textContent: string;
    multimediaContent?: string;
    deliveryStatus: string;
    unreadCount: number;
}
