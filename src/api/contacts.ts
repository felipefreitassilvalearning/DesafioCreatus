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

export async function getContacts(query: string | null): Promise<Contact[]> {
    try {
        const contacts = loadContacts()
        if (query) {
            return contacts.filter((contact) => {
                return contact.first.toLowerCase().includes(query.toLowerCase()) ||
                    contact.last.toLowerCase().includes(query.toLowerCase())
            })
        }
        return contacts
    } catch (error) {
        throw new Error("Contacts not found: " + error)
    }
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

export async function deleteContact(id: string): Promise<void> {
    try {
        const contacts = loadContacts()
        const index = contacts.findIndex((contact) => contact.id === id)
        if (index === -1) {
            throw new Error("Contact not found")
        }
        contacts.splice(index, 1)
        saveContacts()
    } catch (error) {
        throw new Error("Contact not found: " + error)
    }
}
