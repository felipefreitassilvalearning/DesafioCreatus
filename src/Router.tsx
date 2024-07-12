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
import ContactDelete, {
  action as contactDeleteAction,
} from "./pages/ContactDelete"
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
      errorElement: <NavigationError />,
      loader: contactsLoader,
      action: contactsAction,
      children: [
        {
          index: true,
          element: <p>Select a contact</p>,
        },
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
        },
        {
          path: ":contactId/destroy",
          element: <ContactDelete />,
          action: contactDeleteAction as any,
          errorElement: <div>Oops! There was an error.</div>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default Router
