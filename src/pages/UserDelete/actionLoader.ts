import { redirect } from "react-router-dom"
import { deleteUser } from "../../api/users"


export async function action({ params }: { params: { userId: string } }) {
    await deleteUser(params.userId)
    return redirect("/users")
}
