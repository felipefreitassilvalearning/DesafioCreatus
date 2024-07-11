import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./pages/Root"
import Login from "./pages/Login"
import NavigationError from "./pages/NavigationError"
import Contact from "./pages/Contact"

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NavigationError />
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "contacts",
      element: <Contact />,
      children: [
        {
          path: ":id",
          element: <Contact />,
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default Router
