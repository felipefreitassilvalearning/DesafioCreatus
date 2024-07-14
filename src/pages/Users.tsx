import { useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"

import { readUsers } from "../api/users"
import { User } from "../types/users"
import UserCreate from "./UserCreate"
import UserDelete from "./UserDelete"


export async function loader() {
	const users = await readUsers()
	return { users }
}

function Users() {
	const { users } = useLoaderData() as { users: User[] }
	const navigate = useNavigate()
	const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState<boolean>(false)

	return (
		<>
			<table>
				<thead>
					<tr>
						<th colSpan={3}>Usuários</th>
						<th colSpan={2}>
							<button onClick={() => setIsOpenCreateUserModal(true)}>
								Adicionar Usuário
							</button>
						</th>
					</tr>
					<tr>
						<th>Nome</th>
						<th>Email</th>
						<th>Nível de Acesso</th>
						<th hidden>Editar</th>
						<th hidden>Excluir</th>
					</tr>
				</thead>
				<tbody>
					{users.length > 0 ? users.map((user) => (
						<tr
							key={user.id}
							onClick={() => { navigate(`${user.id}`) }}
							tabIndex={0}
							style={{ cursor: "pointer" }}
							title="Clique para ver detalhes do usuário"
							aria-label="Clique para ver detalhes do usuário"
						>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.level}</td>
							<td><button>Editar</button></td>
							<td><UserDelete userId={user.id} /></td>
						</tr>
					)) : (
						<tr>
							<td colSpan={5}>Nenhum usuário encontrado</td>
						</tr>
					)}
				</tbody>
			</table>
			<UserCreate
				isOpen={isOpenCreateUserModal}
				onRequestClose={() => setIsOpenCreateUserModal(false)}
			/>
		</>
	)
}

export default Users