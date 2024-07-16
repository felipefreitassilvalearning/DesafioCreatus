import { Form, useActionData } from "react-router-dom";

import styles from "./Login.module.scss";


function Login() {
    const actionData = useActionData() as { loginError: string };
    const loginError = actionData?.loginError ?? "";

    return (
    <div className={styles.background}>
        <Form action="/login" method="POST" className={styles.loginForm}>
            <h2>Bem vindo</h2>

            <label className={styles.inputField} htmlFor="email">
                Email
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    title="Digite um email válido"
                />
            </label>

            <label className={styles.inputField} htmlFor="password">
                Senha
                <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    required
                />
            </label>

            {loginError && (
                <div className={styles.errorMessage}>{loginError}</div>
            )}

            <button type="submit">Login</button>
        </Form>
    </div>
  )
}

export default Login