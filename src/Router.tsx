import { createBrowserRouter, RouterProvider } from "react-router-dom"

import NavigationError from "./pages/NavigationError"
import Page404, { loader as page404Loader } from "./pages/Page404"
import Login from "./pages/Login/Login"
import { loader as loginLoader, action as loginAction } from "./pages/Login/actionLoader"
import Users from "./pages/Users/Users"
import { loader as usersLoader } from "./pages/Users/actionLoader"
import User, { loader as userLoader } from "./pages/User"
import UserCreate from "./pages/UserCreate/UserCreate"
import { action as createUserAction } from "./pages/UserCreate/actionLoader"
import UserEdit from "./pages/UserEdit/UserEdit"
import { loader as userEditLoader, action as userEditAction } from "./pages/UserEdit/actionLoader"
import { action as userDeleteAction } from "./pages/UserDelete"


// TODO: Improve these unknown and make them match with react router dom types
type Loader<T = unknown, U = unknown> = (params: { params: T }) => Promise<U>
type Action<T = unknown, U = unknown> = (params: { request: Request; params: T }) => Promise<U>

function Router() {
    const router = createBrowserRouter([
        {
            path: "*",
            element: <Page404 />,
            loader: page404Loader,
        },
        {
            path: "/login",
            element: <Login />,
            action: loginAction,
            loader: loginLoader,
            errorElement: <NavigationError />,
        },
        {
            path: "/users",
            element: <Users />,
            loader: usersLoader,
            errorElement: <NavigationError />,
            children: [
                {
                    path: "create",
                    element: <UserCreate />,
                    action: createUserAction,
                },
                {
                    path: ":userId/edit",
                    element: <UserEdit />,
                    loader: userEditLoader as Loader,
                    action: userEditAction as Action,
                },
                {
                    path: ":userId/delete",
                    element: <></>,
                    action: userDeleteAction as Action,
                },
            ],
        },
        {
            path: "/users/:userId/profile",
            element: <User />,
            loader: userLoader as Loader,
        },
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default Router
