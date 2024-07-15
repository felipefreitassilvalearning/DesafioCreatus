import { AxiosError } from "axios";
import { Form, redirect, useActionData } from "react-router-dom";

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
            if (error.code === AxiosError.ERR_BAD_REQUEST) {
                return {
                    loginError: "Invalid email or password",
                }
            }
            if (error.code === AxiosError.ECONNABORTED) {
                return {
                    loginError: "Connection error. Please try again later.",
                }
            }
            throw error;
        }
        return {
            loginError: "Unknown error while logging in. Please try again later.",
        }
    }
}

export async function loader() {
    return null
}

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