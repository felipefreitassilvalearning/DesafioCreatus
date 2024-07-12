import { redirect } from "react-router-dom"
import { deleteContact } from "../api/contacts"

export async function action({ params }: { params: { contactId: string } }) {
  await deleteContact(params.contactId)
  return redirect("/contacts")
}

function ContactDelete() {
  return (
    <div>ContactDelete</div>
  )
}

export default ContactDelete