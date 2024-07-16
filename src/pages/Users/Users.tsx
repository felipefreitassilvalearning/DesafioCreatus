import { useEffect } from "react"
import { Form, Outlet, useLoaderData, useNavigate, useNavigation, useSubmit } from "react-router-dom"

import styles from "./Users.module.scss"
import { removeToken } from "../../tokenHelper"
import { User } from "../../types/users"
import UserDelete from "../UserDelete/UserDelete"


function Users() {
    const { users, query, orderBy } = useLoaderData() as {
        users: User[];
        query: string | null;
        orderBy: keyof User | null;
    };
    const navigation = useNavigation()
    const navigate = useNavigate()
    const submit = useSubmit()

    const searching = (
        navigation.location && new URLSearchParams(navigation.location.search).has("query"))

    function logout() {
        removeToken();
        navigate("/login");
    }

    useEffect(() => {
        const queryElement = document.getElementById("q") as HTMLInputElement | null;
        if (queryElement && query) {
            queryElement.value = query;
        }
    }, [query])

    const HiddenQueryInput = () => (
        <input
            type="hidden"
            name="query"
            value={query ?? ""}
        />
    )

    const HiddenOrderByInput = ({ value }: { value?: keyof User }) => (
        <input
            type="hidden"
            name="orderBy"
            value={value ?? orderBy ?? undefined}
        />
    )

    return (
        <>
            <div className="wrapper">
                <table className={styles.usersTable}>
                    <thead>
                        <tr className={styles.actionHeader}>
                            <th colSpan={1}>Usuários</th>
                            <th colSpan={1}>
                                <Form id="search-form" role="search">
                                    <input
                                        id="q"
                                        className={searching ? styles.loading : undefined}
                                        aria-label="Search users"
                                        placeholder="Search"
                                        type="search"
                                        name="query"
                                        defaultValue={query ?? undefined}
                                        onChange={(event) => {
                                            const isFirstSearch = (query === null && orderBy === null);
                                            submit(event.currentTarget.form, {
                                                replace: !isFirstSearch,
                                            });
                                        }}
                                    />
                                    <HiddenOrderByInput />
                                </Form>
                            </th>
                            <th colSpan={3}>
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
                            <th>
                                <Form role="search">
                                    <HiddenOrderByInput value="name" />
                                    <HiddenQueryInput />
                                    <button>
                                        Name
                                    </button>
                                    {orderBy === "name" && (
                                        <span className={styles.orderBy}>&darr;</span>
                                    )}
                                </Form>
                            </th>
                            <th>
                                <Form role="search">
                                    <HiddenOrderByInput value="email" />
                                    <HiddenQueryInput />
                                    <button>
                                        Email
                                    </button>
                                    {orderBy === "email" && (
                                        <span className={styles.orderBy}>&darr;</span>
                                    )}
                                </Form>
                            </th>
                            <th>
                                <Form role="search">
                                    <HiddenOrderByInput value="level" />
                                    <HiddenQueryInput />
                                    <button>
                                        Nível de Acesso
                                    </button>
                                    {orderBy === "level" && (
                                        <span className={styles.orderBy}>&darr;</span>
                                    )}
                                </Form>
                            </th>
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
            <button
                className={`clean ${styles.logoutButton}`}
                aria-label="Sair"
                title="Sair"
                onClick={logout}
            >
                <img src="/public/exitDoor.png" alt="Sair" />
            </button>
        </>
    )
}

export default Users