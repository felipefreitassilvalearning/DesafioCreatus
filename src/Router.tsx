import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"

import Users, { loader as usersLoader } from "./pages/Users"
import { action as createUserAction } from "./pages/UserCreate"


function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Root</div>,
      errorElement: <div>NavigationError</div>
    },
    {
      path: "/login",
      element: <div>Login</div>,
      errorElement: <div>LoginError</div>
    },
    {
      path: "/users",
      element: <div className="background"><Outlet /></div>,
      errorElement: <div>UsersError</div>,
      children: [
        {
          errorElement: <div>UsersNavigationError</div>,
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
