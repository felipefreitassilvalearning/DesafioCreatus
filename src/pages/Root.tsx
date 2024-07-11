import { Link } from "react-router-dom"

function Root() {
  return (
    <>
      <Link to="/login">Go to Login</Link>
      <Link to="/contacts">Go to Contacts</Link>
    </>
  )
}

export default Root