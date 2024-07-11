import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./pages/Root"
import Contacts, { loader as contactsLoader } from "./pages/Contacts"
import Contact from "./pages/Contact"
import NavigationError from "./pages/NavigationError"
import Login from "./pages/Login"

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NavigationError />
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/contacts",
      element: <Contacts />,
      loader: contactsLoader,
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
