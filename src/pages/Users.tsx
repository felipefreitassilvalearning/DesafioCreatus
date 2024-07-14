import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom"

import styles from "./Users.module.scss"
import { authenticate } from "../api/auth"
import { readUsers } from "../api/users"
import { getToken } from "../tokenHelper"
import { User } from "../types/users"
import UserDelete from "./UserDelete"


export async function loader() {
    const userToken = getToken();
    if (!userToken) {
        return redirect("/login");
    }
    try {
        await authenticate(userToken);
    } catch (error) {
        return redirect("/login");
    }
    const users = await readUsers();
    return { users };
}

function Users() {
    const { users } = useLoaderData() as { users: User[] }
    const navigate = useNavigate()

    return (
        <>
            <div className="wrapper">
                <table className={styles.usersTable}>
                    <thead>
                        <tr className={styles.actionHeader}>
                            <th colSpan={3}>Usuários</th>
                            <th colSpan={2}>
                                <button
                                    onClick={() => { navigate("create") }}
                                    className={styles.addUser}
                                >
                                    Adicionar Usuário
                                </button>
                            </th>
                        </tr>
                        <tr data-spacer></tr>
                        <tr className={styles.infoHeader}>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Nível de Acesso</th>
                            <th><span hidden>Editar</span></th>
                            <th><span hidden>Excluir</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? users.map((user) => (
                            <tr
                                key={user.id}
                                onClick={() => { navigate(`${user.id}/profile`) }}
                                tabIndex={0}
                                style={{ cursor: "pointer" }}
                                title="Clique para ver detalhes do usuário"
                                aria-label="Clique para ver detalhes do usuário"
                            >
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.level}</td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            navigate(`${user.id}/edit`)
                                        }}
                                        className="clean"
                                        aria-label="Editar Usuário"
                                        title="Editar"
                                    >
                                        <img src="/editIcon.png" alt="Editar" />
                                    </button>
                                </td>
                                <td><UserDelete userId={user.id} /></td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5}>Nenhum usuário encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Outlet />
        </>
    )
}

export default Users