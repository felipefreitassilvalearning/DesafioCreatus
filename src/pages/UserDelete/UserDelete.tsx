import { FormEvent } from "react"
import { Form } from "react-router-dom"

import { UserId } from "../../types/users"


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
            <button
                type="submit"
                onClick={(e) => { e.stopPropagation() }}
                className="clean"
                aria-label="Excluir Usuário"
                title="Excluir"
            >
                <img src="/deleteIcon.png" alt="Excluir" />
            </button>
        </Form>
    )
}

export default UserDelete