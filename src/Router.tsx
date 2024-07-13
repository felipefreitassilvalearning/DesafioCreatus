import { createBrowserRouter, RouterProvider } from "react-router-dom"


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
      element: <div>UsersWrapper</div>,
      errorElement: <div>UsersError</div>,
      // loader: usersLoader,
      // action: usersAction,
      children: [
        {
          errorElement: <div>UsersNavigationError</div>,
          children: [
            {
              index: true,
              element: <div>Select a user</div>,
            },
            // {
            //   path: ":userId",
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
