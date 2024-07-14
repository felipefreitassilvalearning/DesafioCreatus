import { AxiosError } from "axios";
import { Form, Outlet, redirect } from "react-router-dom";

import styles from "./Login.module.scss";
import { login } from "../api/auth";
import { LoginCredentials } from "../types/auth";
import { saveToken } from "../tokenHelper";


export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData) as unknown as LoginCredentials;
    try {
        const { response: token } = await login(credentials);
        saveToken(token);
        return redirect("/users");
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 400) {
                throw new Error("Invalid credentials");
            }
        }
        throw new Error("Unknown error while logging in. Please try again later.");
    }
}

function Login() {
  return (
    <body className={styles.background}>
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
                    minLength={6}
                    title="A senha deve ter no mínimo 6 caracteres"
                />
            </label>

            <button type="submit">Login</button>
        </Form>
        <Outlet />
    </body>
  )
}

export default Login