import { request } from ".";
import { User, UserAPI, userAPItoUser, UserCreate, UserId } from "../types/users";


export async function createUser(user: UserCreate): Promise<string> {
    return request<string, UserCreate>({
        method: "POST",
        url: "/user",
        headers: {
            "Content-Type": "application/json",
        },
        data: user,
    })
}


function userMatchesQuery(user: User, query: string | null): User | null {
    if (!query) {
        return user
    }
    const queryLower = query.toLowerCase()
    if (
        user.name.toLowerCase().includes(queryLower)
        || user.email.toLowerCase().includes(queryLower)
    ) {
        return user
    }
    return null
}
function orderUsers(
    users: User[],
    orderBy: keyof User,
): User[] {
    return users.sort((a, b) => {
        if (typeof a[orderBy] === "string") {
            return a[orderBy].localeCompare(b[orderBy] as string)
        }
        return (a[orderBy] as number) - (b[orderBy] as number)
    })
}
// Params for filtering and ordering not implemented in the API
export async function readUsers(
    query?: string | null,
    orderBy?: keyof User | null,
): Promise<User[]> {
    const usersAPI = await request<UserAPI[], void>({
        method: "GET",
        url: "/users",
    })
    let users = usersAPI.map(userAPItoUser)
    if (query) {
        users = users.filter((user) => userMatchesQuery(user, query))
    }
    if (orderBy) {
        users = orderUsers(users, orderBy)
    }
    return users
}

export async function readUser(userId: UserId): Promise<User> {
    const userAPI = await request<UserAPI, void>({
        method: "GET",
        url: `/user/${userId}`,
    })
    return userAPItoUser({ ...userAPI, id: userId })
}

export async function updateUser(userId: UserId, user: UserCreate): Promise<string> {
    return request<string, UserCreate>({
        method: "PUT",
        url: `/user/${userId}`,
        headers: {
            "Content-Type": "application/json",
        },
        data: user,
    })
}

export async function deleteUser(userId: UserId): Promise<string> {
    return request<string, void>({
        method: "DELETE",
        url: `/user/${userId}`,
    })
}
