import { useLoaderData } from "react-router-dom"

import { readUsers } from "../api/users"
import { User } from "../types/users"


export async function loader() {
	const users = await readUsers()
	return { users }
}

function Users() {
	const { users } = useLoaderData() as { users: User[] }

	return (
		<div className="background">
			<table>
				<thead>
					<tr>
						<th colSpan={3}>Usuários</th>
						<th colSpan={2}>
							<button>
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
						<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.level}</td>
							<td><button>Editar</button></td>
							<td><button>Excluir</button></td>
						</tr>
					)) : (
						<tr>
							<td colSpan={5}>Nenhum usuário encontrado</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default Users