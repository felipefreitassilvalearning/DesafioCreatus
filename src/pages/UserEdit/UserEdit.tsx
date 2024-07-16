import { useState } from 'react';
import Modal from 'react-modal'
import { Form, useLoaderData, useNavigate } from 'react-router-dom'

import styles from '../UserModal.module.scss'
import { User } from '../../types/users';

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