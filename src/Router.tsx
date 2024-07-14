import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"

import Users, { loader as usersLoader } from "./pages/Users"
import { action as createUserAction } from "./pages/UserCreate"
import NavigationError from "./pages/NavigationError"


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
      element: <div className="background"><Outlet /></div>,
      errorElement: <NavigationError />,
      children: [
        {
          errorElement: <NavigationError />,
          children: [
            {
              index: true,
              element: <Users />,
              action: createUserAction,
              loader: usersLoader,
            },
            // {
            //   path: ":userId/read",
            //   element: <div>UserRead</div>,
            //   loader: userReadLoader as any,
            //   action: userReadAction as any,
            // },
            // {
            //   path: ":userId/edit",
            //   element: <div>UserEdit</div>,
            //   loader: userEditLoader as any,
            //   action: userEditAction as any,
            // },
            // {
            //   path: ":userId/destroy",
            //   element: <div>UserDelete</div>,
            //   action: userDeleteAction as any,
            //   errorElement: <div>UserDeleteError</div>
            // },
          ]
        },
      ]
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default Router
