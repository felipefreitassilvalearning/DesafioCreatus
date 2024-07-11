import { Contact } from "../types/client";

let contacts = [
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

export async function createContact(contact?: Contact): Promise<Contact> {
    if (!contact) {
        const newContact = {
            id: "99",
            first: "Demo",
            last: "Name",
            avatar: "https://www.gravatar.com/avatar/99",
            twitter: "twitter",
            notes: "notes",
            favorite: false,
        }
        contacts.push(newContact)
        return newContact
    }
    contacts.push(contact)
    return contact;
}

export async function getContacts(): Promise<Contact[]> {
    return contacts
}

export async function getContact(id: string): Promise<Contact> {
    try {
        const contact = contacts.find((contact) => contact.id === id) as Contact
        if (!contact) {
            throw new Error("Contact not found")
        }
        return contact
    } catch (error) {
        throw new Error("Contact not found: " + error)
    }
}
