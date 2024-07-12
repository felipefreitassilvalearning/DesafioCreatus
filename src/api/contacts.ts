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

function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts))
}
saveContacts()

function loadContacts() {
    const contactsString = localStorage.getItem("contacts")
    if (contactsString) {
        contacts = JSON.parse(contactsString)
    }
    return contacts
}

export async function createContact(contact?: Contact): Promise<Contact> {
    if (!contact) {
        contact = {
            id: "99",
            first: "Demo",
            last: "Name",
            avatar: "https://www.gravatar.com/avatar/99",
            twitter: "twitter",
            notes: "notes",
            favorite: false,
        }
    }
    contacts.push(contact)
    saveContacts()
    return contact;
}

export async function getContacts(): Promise<Contact[]> {
    return loadContacts()
}

export async function getContact(id: string): Promise<Contact> {
    try {
        const contacts = loadContacts()
        const contact = contacts.find((contact) => contact.id === id) as Contact
        if (!contact) {
            throw new Error("Contact not found")
        }
        return contact
    } catch (error) {
        throw new Error("Contact not found: " + error)
    }
}

export async function updateContact(id: string, contact: Contact): Promise<Contact> {
    try {
        const contacts = loadContacts()
        const index = contacts.findIndex((contact) => contact.id === id)
        if (index === -1) {
            throw new Error("Contact not found")
        }
        contact.id = id
        contacts[index] = contact
        saveContacts()
        return contact
    } catch (error) {
        throw new Error("Contact not found: " + error)
    }
}
