import Logo from '../component/Logo'
import {useAuth} from '../hooks/useAuth'
import {useNavigate} from 'react-router-dom'

function Application() {
  const isLoggedIn = useAuth()
  const navigate = useNavigate()
  if (!isLoggedIn) {
    return (
      <>
        <span className='inline-block align-baseline font-bold text-sm text-center pt-20'>
          You are not logged in. Please sign in to access this page.{' '}
          <a href='/' className='text-blue-500 hover:text-blue-700'>
            Sign In
          </a>
        </span>
      </>
    )
  }

  function signOut(): void {
    localStorage.removeItem('userToken')
    navigate('/')
  }

  // Content accessible only to logged-in users

  return (
    <>
      <h1 className='text-center pt-20 pb-10 text-xl'>
        Welcome to the application.
      </h1>
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4'
        onClick={signOut}>
        Sign Out
      </button>
    </>
  )
}
export default Application
