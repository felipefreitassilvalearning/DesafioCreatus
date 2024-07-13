export interface UserAPI {
    id: string | number;
    email: string;
    name: string;
    accessLevel: 1 | 2 | 3 | 4 | 5;
    password: string;
}

export interface User {
    id: string | number;
    email: string;
    name: string;
    level: 1 | 2 | 3 | 4 | 5;
}

export interface UserCreate extends Omit<User, "id"> {
    password: string;
}

export function userAPItoUser(user: UserAPI): User {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        level: user.accessLevel,
    }
}
