import { useState } from 'react';
import Modal from 'react-modal'
import { Form, redirect, useNavigate } from 'react-router-dom'

import './Users/styles.scss'
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
    return redirect('/users');
}

function UserCreate() {
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
            <Form method='POST' id='user-create-form' className='user-modal-form'>
                <button className="closeModal" onClick={closeModal}>X</button>

                <h2>Criar Usuário</h2>

                <label htmlFor="name">
                    Nome
                    <input type="text" id="name" name="name" />
                </label>
                
                <label htmlFor="email">
                    Email
                    <input type="email" id="email" name="email" />
                </label>
                
                <label htmlFor="accessLevel">
                    Nível de Acesso
                    <select id="accessLevel" name="accessLevel">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                
                <label htmlFor="password">
                    Senha
                    <input type="password" id="password" name="password" />
                </label>
                
                <label htmlFor="confirmPassword">
                    Confirmar Senha
                    <input type="password" id="confirmPassword" name="confirmPassword" />
                </label>

                <button type="submit">Criar</button>
            </Form>
        </Modal>
    )
}

export default UserCreate