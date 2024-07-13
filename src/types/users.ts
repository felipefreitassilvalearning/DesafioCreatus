export interface UserAPI {
    id: string | number;
    email: string;
    name: string;
    level: 1 | 2 | 3 | 4 | 5;
    password: string;
}

export interface User {
    id: string | number;
    email: string;
    name: string;
    level: 1 | 2 | 3 | 4 | 5;
}

export function userAPItoUser(user: UserAPI): User {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        level: user.level,
    }
}
