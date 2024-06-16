import {useAuth} from '../hooks/useAuth'
import {useNavigate} from 'react-router-dom'

function Application() {
  const isLoggedIn = useAuth()
  const navigate = useNavigate()
  if (!isLoggedIn) {
    return (
      <div>
        You are not logged in. Please sign in to access this page.
        <br />
        <a href='/signin'>Sign In</a>
      </div>
    )
  }

  function signOut(): void {
    localStorage.removeItem('userToken')
    navigate('/')
  }

  // Content accessible only to logged-in users

  return (
    <>
      <h1>Welcome to the application.</h1>
      <button onClick={signOut}>Sign Out</button>
    </>
  )
}
export default Application
