import { createBrowserRouter, RouterProvider } from "react-router-dom"

import NavigationError from "./pages/NavigationError"
import Users, { loader as usersLoader } from "./pages/Users"
import User, { loader as userLoader } from "./pages/User"
import UserCreate, { action as createUserAction } from "./pages/UserCreate"
import { action as userDeleteAction } from "./pages/UserDelete"


function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Root</div>,
      errorElement: <NavigationError />
    },
    {
      path: "/login",
      element: <div>Login</div>,
      errorElement: <NavigationError />
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
            // {
            //   path: ":userId/edit",
            //   element: <div>UserEdit</div>,
            //   loader: userEditLoader as any,
            //   action: userEditAction as any,
            // },
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
      // TODO: Fix this any
      loader: userLoader as any,
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default Router
