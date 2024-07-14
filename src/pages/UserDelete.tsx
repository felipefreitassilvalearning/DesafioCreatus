import { FormEvent } from "react"
import { Form, redirect } from "react-router-dom"

import { deleteUser } from "../api/users"
import { UserId } from "../types/users"


export async function action({ params }: { params: { userId: string } }) {
  await deleteUser(params.userId)
  return redirect("/users")
}

interface UserDeleteProps {
  userId: UserId
}
function UserDelete({ userId }: UserDeleteProps) {
    function onDeleteUser(event: FormEvent) {
        const confirmDelete = window.confirm("Deseja realmente excluir este usuário?")
        if (!confirmDelete) {
            event.preventDefault()
        }
    }

    return (
        <Form
            method="POST"
            action={`${userId}/delete`}
            onSubmit={onDeleteUser}
        >
            <button type="submit" onClick={(e) => { e.stopPropagation() }}>
                Excluir
            </button>
        </Form>
    )
}

export default UserDelete