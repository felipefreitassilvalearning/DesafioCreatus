import { Link, useLoaderData } from "react-router-dom"

import { authenticate } from "../api/auth";
import { getToken } from "../tokenHelper"


export async function loader() {
    const userToken = getToken();
    if (!userToken) {
        return { isAuthenticated: false };
    }
    try {
        await authenticate(userToken);
        return { isAuthenticated: true };
    } catch (error) {
        return { isAuthenticated: false };
    }
}

function Page404() {
    const { isAuthenticated } = useLoaderData() as { isAuthenticated: boolean }

    return (
        <div className="wrapper">
            <h1>404</h1>
            <p>The page you are looking for does not exist.</p>
            {
                isAuthenticated ? (
                    <Link to="/users">Go to Home</Link>
                ) : (
                    <Link to="/login">Go to Login</Link>
                )
            }
        </div>
    )
}

export default Page404