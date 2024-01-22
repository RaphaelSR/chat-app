import { Chat } from "./chatTypes";

export interface Contact {
    userId: string;
    name: string;
    avatar?: string;
    status?: string;
    chat: Chat;
}
