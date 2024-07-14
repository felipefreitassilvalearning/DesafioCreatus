import Modal, { Props as ReactModalProps } from 'react-modal'
import { Form } from 'react-router-dom'

import { createUser } from '../api/users';
import { UserCreate as IUserCreate } from '../types/users';


export async function action({ request }: { request: Request; }) {
    const formData = await request.formData();
    type UserCreateFormData = IUserCreate & { confirmPassword?: string };
    const user = Object.fromEntries(formData) as unknown as UserCreateFormData;
    if (user.password !== user.confirmPassword) {
        throw new Error('As senhas não conferem');
    }
    delete user.confirmPassword;
    await createUser(user);
    return { user }
}

function UserCreate({ isOpen, onRequestClose }: ReactModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
        >
            <Form method='POST' id='user-create-form'>
                <h2>Criar Usuário</h2>
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" />
                
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
                
                <label htmlFor="accessLevel">Nível de Acesso</label>
                <select id="accessLevel" name="accessLevel">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" name="password" />
                
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input type="password" id="confirmPassword" name="confirmPassword" />

                <button type="submit">Criar</button>
            </Form>
        </Modal>
    )
}

export default UserCreate