import { Form, Outlet, redirect } from "react-router-dom";
import { login } from "../api/auth";
import { LoginCredentials } from "../types/auth";
import { AxiosError } from "axios";
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
    <div className="wrapper">
        <div className="img"><img src="" alt="" /></div>
        <div className="form">
            <Form action="/login" method="POST">
                <h2>Bem vindo</h2>

                <label className="input-field" htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email" />

                <label className="input-field" htmlFor="password">Senha</label>
                <input type="password" name="password" placeholder="Senha" />

                <button type="submit">Login</button>
            </Form>
            <Outlet />
        </div>
    </div>
  )
}

export default Login