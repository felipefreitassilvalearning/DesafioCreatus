import { useState } from 'react';
import Modal from 'react-modal'
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom'

import styles from './UserModal.module.scss'
import { readUser, updateUser } from '../api/users';
import { UserCreate as IUserCreate, User, UserId } from '../types/users';


type UserEditParams = {
    params: {
        userId: UserId;
    }
}

export async function action({ request, params }: { request: Request; } & UserEditParams) {
    const formData = await request.formData();
    // type UserEditFormData = IUserCreate & { confirmPassword?: string };
    const updatedUser = Object.fromEntries(formData) as unknown as IUserCreate;
    // if (updatedUser.password !== updatedUser.confirmPassword) {
    //     throw new Error('As senhas não conferem');
    // }
    // delete updatedUser.confirmPassword;
    // TODO: Password should be opitonal when editing, as we don't want to update it if it's empty and we don't know the previous password
    updatedUser.password = updatedUser.password ?? "changedByEdit";
    await updateUser(params.userId, updatedUser);
    return redirect('/users');
}

export async function loader({ params }: UserEditParams) {
    const user = await readUser(params.userId);
    return { user };
}

function UserEdit() {
    const { user } = useLoaderData() as { user: User };
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState<boolean>(true);

    function closeModal() {
        setIsOpen(false)
        navigate(-1)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    margin: 'auto',
                    maxWidth: '600px',
                }
            }}
        >
            <Form method='POST' id='user-create-form' className={styles.userModalForm}>
                <button className={styles.closeModal} onClick={closeModal}>X</button>

                <h2>Editar Usuário</h2>

                <label htmlFor="name">
                    Nome
                    <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={user?.name}
                        minLength={1}
                        maxLength={255}
                    />
                </label>
                
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={user?.email}
                        minLength={1}
                        maxLength={255}
                        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    />
                </label>
                
                <label htmlFor="accessLevel">
                    Nível de Acesso
                    <select id="accessLevel" name="accessLevel" defaultValue={user?.level}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>

                <button type="submit">Salvar</button>
            </Form>
        </Modal>
    )
}

export default UserEdit