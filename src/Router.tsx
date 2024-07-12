import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./pages/Root"
import Contacts, {
  action as contactsAction,
  loader as contactsLoader,
} from "./pages/Contacts"
import ContactRead, {
  loader as contactReadLoader,
} from "./pages/ContactRead"
import ContactEdit, {
  action as contactEditAction,
  loader as contactEditLoader,
} from "./pages/ContactEdit"
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
      action: contactsAction,
      children: [
        {
          path: ":contactId",
          element: <ContactRead />,
          loader: contactReadLoader as any,
        },
        {
          path: ":contactId/edit",
          element: <ContactEdit />,
          loader: contactEditLoader as any,
          action: contactEditAction as any,
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default Router
