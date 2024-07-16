import { useState } from 'react';
import Modal from 'react-modal'
import { Form, useNavigate } from 'react-router-dom'

import styles from '../UserModal.module.scss'


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
            <Form method='POST' id='user-create-form' className={styles.userModalForm}>
                <button
                    className={styles.closeModal}
                    onClick={closeModal}
                >
                    &times;
                </button>

                <h2>Criar Usuário</h2>

                <label htmlFor="name">
                    Nome
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
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
                        required
                        minLength={1}
                        maxLength={255}
                        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    />
                </label>
                
                <label htmlFor="accessLevel">
                    Nível de Acesso
                    <select
                        id="accessLevel"
                        name="accessLevel"
                        required
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                
                <label htmlFor="password">
                    Senha
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </label>
                
                <label htmlFor="confirmPassword">
                    Confirmar Senha
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                    />
                </label>

                <button type="submit">Criar</button>
            </Form>
        </Modal>
    )
}

export default UserCreate