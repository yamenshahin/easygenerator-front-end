import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'
import Logo from '../component/Logo'
import OfficeImg from '../assets/OfficeImg.png'

const SignInSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
})

interface FormData {
  email: string
  password: string
}
function SignIn() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(SignInSchema),
  })

  const [signInError, setSignInError] = useState<string | null>(null)
  const navigate = useNavigate()
  const isLoggedIn = useAuth()
  if (isLoggedIn) {
    navigate('/application')
  }

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        data,
        {
          headers: {'Content-Type': 'application/json'},
        },
      )

      const responseData = await response.data

      // Assuming successful response contains a token
      localStorage.setItem('userToken', responseData.token) // Replace with your token key
      navigate('/application') // Use useNavigate hook for redirection
    } catch (error: any) {
      setSignInError(error.response.data.message || 'Sign Up failed.')
    }
  }

  return (
    <>
      {/* component */}
      <div className='bg-gray-100 flex justify-center items-center h-screen'>
        {/* Left: Image */}
        <div className='lg:w-2/5 lg:p-20 md:p-10 sm:p-5 p-8 lg:pt-10 h-screen text-left'>
          <Logo />
          <h1 className='text-2xl font-semibold mb-4 mt-20'>Sign In</h1>
          {signInError && (
            <div
              className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2'
              role='alert'>
              <strong className='font-bold'>Error! </strong>
              <span className='block sm:inline'>{signInError}</span>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* email Input */}
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-600 pb-2'>
                Email
              </label>
              <input
                type='email'
                id='email'
                {...register('email')}
                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
              )}
            </div>
            {/* Password Input */}
            <div className='mb-4'>
              <label htmlFor='password' className='block text-gray-600 pb-2'>
                Password
              </label>
              <input
                type='password'
                id='password'
                {...register('password')}
                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
              />
              {errors.password && (
                <p className='text-red-500 text-sm'>
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Login Button */}
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full'>
              Sign In
            </button>
          </form>
          {/* Sign up  Link */}
          <div className='mt-6 text-black-500 font-medium text-left'>
            Don't have an account?{' '}
            <a href='/signup' className='hover:underline text-blue-500'>
              Sign Up Here
            </a>
          </div>
        </div>
        {/* Right: Login Form */}
        <div className='w-full h-screen lg:w-3/5 hidden lg:block'>
          <img
            src={OfficeImg}
            alt='Placeholder Image'
            className='object-cover w-full h-full'
          />
        </div>
      </div>
      <div className='container mx-auto px-4 py-16'>
        <div className='shadow-md rounded-lg p-8'>
          <h2 className='text-2xl font-bold mb-4'>Sign In</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'></div>
            <div className='mb-6'></div>
            <div className='flex items-center justify-between'>
              <span className='inline-block align-baseline font-bold text-sm'>
                Don't have an account?{' '}
                <a href='/signup' className='text-blue-500 hover:text-blue-700'>
                  Sign Up
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn
