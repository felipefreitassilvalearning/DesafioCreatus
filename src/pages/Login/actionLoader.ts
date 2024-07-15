import { AxiosError } from "axios";
import { redirect } from "react-router-dom";

import { login } from "../../api/auth";
import { LoginCredentials } from "../../types/auth";
import { saveToken } from "../../tokenHelper";


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
