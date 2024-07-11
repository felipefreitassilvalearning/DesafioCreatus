import { Contact } from "../types/client";

export async function getContacts(): Promise<Contact[]> {
    return [
        {
            id: "1",
            first: "Nome",
            last: "Sobrenome",
            avatar: "https://www.gravatar.com/avatar/1",
            twitter: "twitter",
            notes: "notes",
            favorite: false,
        },
        {
            id: "2",
            first: "Amigo",
            last: "Amigão",
            avatar: "https://www.gravatar.com/avatar/2",
            twitter: "twitter",
            notes: "notes",
            favorite: true,
        }
    ]
}