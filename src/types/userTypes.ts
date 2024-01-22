import { Contact } from "./contactTypes";
import { Group } from "./groupTypes";

export enum UserStatus {
    Available = 'Available',
    Busy = 'Busy',
    DoNotDisturb = 'DoNotDisturb',
    Away = 'Away',
}

export interface User {
    userId: string;
    email: string;
    name: string;
    avatar?: string;
    status: UserStatus | string;
    contacts: Contact[];
    groups: Group[];
    lastActive: Date;
    privacySettings: PrivacySettings;
}

export interface LoggedInUser extends User {
    loggedIn: boolean;
}

export interface PrivacySettings {
    lastSeen: string;
    profilePhoto: string;
    about: string;
    status: string;
}
