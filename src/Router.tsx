import { createBrowserRouter, RouterProvider } from "react-router-dom"

import NavigationError from "./pages/NavigationError"
import Page404, { loader as page404Loader } from "./pages/Page404"
import Login, { action as loginAction } from "./pages/Login"
import Users, { loader as usersLoader } from "./pages/Users"
import User, { loader as userLoader } from "./pages/User"
import UserCreate, { action as createUserAction } from "./pages/UserCreate"
import UserEdit, { loader as userEditLoader, action as userEditAction } from "./pages/UserEdit"
import { action as userDeleteAction } from "./pages/UserDelete"


function Router() {
  // TODO: Fix actions and loaders types
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
      errorElement: <NavigationError />,
    },
    {
      path: "/users",
      element: <Users />,
      loader: usersLoader,
      errorElement: <NavigationError />,
      children: [
        {
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
              loader: userEditLoader as any,
              action: userEditAction as any,
            },
            {
              path: ":userId/delete",
              element: <></>,
              action: userDeleteAction as any,
              errorElement: <div>UserDeleteError</div>
            },
          ]
        },
      ]
    },
    {
      path: "/users/:userId/profile",
      element: <User />,
      loader: userLoader as any,
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default Router
