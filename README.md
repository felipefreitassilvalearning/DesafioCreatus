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

## How to run

1. Clone this repository
```bash
git clone https://github.com/felipefreitassilvalearning/DesafioCreatus.git
```
2. Install dependencies
```bash
npm i
```
3. Run the front-end with
```bash
npm run build
```
```bash
npm run preview
```
4. You can now access the project from your browser at http://localhost:4173/DesafioCreatus/
5. It will not be working properly, as the API is not running.
6. Run the API and make sure it is available at http://localhost:8080
7. You can now use the application as intended

### Known Issues

While accessing the system via [Github Pages](https://felipefreitassilvalearning.github.io/DesafioCreatus/), the API should still be running at http://localhost:8080, as the application will not work properly otherwise. The issue this time is with importing images; for some reason the images are not being loaded when the application is running on Github Pages, but they are loaded when running locally. This is a known issue with Vite and Github Pages, and I am currently looking for a solution. At least the application is still usable, even if the images are not being loaded they should all have a placeholder with a description of what the image should be.
