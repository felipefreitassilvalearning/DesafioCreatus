import { Link, useLoaderData } from "react-router-dom"


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