export type UserId = string | number;

export interface UserAPI {
    id: UserId;
    email: string;
    name: string;
    accessLevel: "1" | "2" | "3" | "4" | "5";
    password: string;
}

export interface User {
    id: UserId;
    email: string;
    name: string;
    level: 1 | 2 | 3 | 4 | 5;
}

export interface UserCreate extends Omit<UserAPI, "id"> { }

function accessLevelToLevel(accessLevel: "1" | "2" | "3" | "4" | "5"): 1 | 2 | 3 | 4 | 5 {
    return parseInt(accessLevel, 10) as 1 | 2 | 3 | 4 | 5
}

export function userAPItoUser(user: UserAPI): User {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        level: accessLevelToLevel(user.accessLevel),
    }
}
