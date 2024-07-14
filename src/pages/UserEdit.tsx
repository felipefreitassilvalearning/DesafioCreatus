import { useState } from 'react';
import Modal from 'react-modal'
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom'

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

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => {
                setIsOpen(false)
                navigate(-1)
            }}
            ariaHideApp={false}
        >
            <Form method='POST' id='user-create-form'>
                <h2>Editar Usuário</h2>
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" defaultValue={user?.name} />
                
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" defaultValue={user?.email} />
                
                <label htmlFor="accessLevel">Nível de Acesso</label>
                <select id="accessLevel" name="accessLevel" defaultValue={user?.level}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <button type="submit">Salvar</button>
            </Form>
        </Modal>
    )
}

export default UserEdit