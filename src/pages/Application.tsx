import {useAuth} from '../hooks/useAuth'

function Application() {
  const isLoggedIn = useAuth()

  if (!isLoggedIn) {
    return (
      <div>
        You are not logged in. Please sign in to access this page.
        <br />
        <a href='/signin'>Sign In</a>
      </div>
    )
  }

  // Content accessible only to logged-in users

  return (
    <>
      <h1>Welcome to the application.</h1>
    </>
  )
}
export default Application
