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

// Query param for filtering not implemented in the API
export async function readUsers(
    // query?: string | null
): Promise<User[]> {
    const usersAPI = await request<UserAPI[], void>({
        method: "GET",
        url: "/users",
        // params: { query },
    })
    return usersAPI.map(userAPItoUser)
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
