import { Chat } from "./chatTypes";
import { User } from "./userTypes";

export interface Group {
    groupId: string;
    name: string;
    avatar?: string;
    status?: string;
    members: User[];
    chat: Chat;
}
