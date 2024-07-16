# DesafioCreatus

Front-end Programming Technical Test

## Features

- [x] Responsive Login Screen
- [x] User Registration
- [x] User Listing in Table Format
- [x] User Filtering and Sorting
- [x] User Editing
- [x] User Deletion
- [x] User Profile Screen

## Technologies

The following tools were used in the construction of the project:

- [React](https://react.dev/)
- [React Router Dom](https://reactrouter.com/en/6.24.1/start/tutorial)
- [Axios](https://axios-http.com/docs/intro)
- [React Modal](https://www.npmjs.com/package/react-modal)
- [Sass](https://sass-lang.com/)
- [Vite](https://vitejs.dev/guide/)

## Notes

- The project was developed based on the layout provided in Figma

### New Features

Some additional features were implemented (all in the frontend), such as:
- User filtering by name
- User filtering by email
- User sorting by table headers (name, email, and access level)
- Logout button which clears the token from the local storage and redirects the user to the login screen
- Responsive login screen, which does not mantain given aspect ratio for usability purposes

### Missing Features

Some features were removed, such as:
- Editing passwords
- Viewing passwords
That is because the API does not return this information (nor would it be secure)
The API also has the password field as required
Due to the above mentioned reasons, the field is filled with "" every time you click the "Save" button on the edit user modal, which means that when updating a user, their password is "erased".
While I understand that this is not the best solution, I believe it is the most secure one, as it prevents the password from being exposed in any way given the current API limitations. The best approach would be to ask the backend team to change the API to not require the password field when updating a user.
