import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'
import Logo from '../component/Logo'
import OfficeTeam from '../assets/OfficeTeam.png'

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email'),
  name: yup.string().required('Name is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/\d/, 'Password must contain a number')
    .matches(
      /[^A-Za-z0-9\s]/,
      'Password must contain a special character (exclude white space)',
    ),
})
interface FormData {
  name: string
  email: string
  password: string
}
function SignUp() {
  const [signUpError, setSignUpError] = useState<string | null>(null)
  const navigate = useNavigate()
  const isLoggedIn = useAuth()
  if (isLoggedIn) {
    navigate('/application')
  }
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        data,
        {
          headers: {'Content-Type': 'application/json'},
        },
      )
      // Handle successful signup with auto sign-in and redirect
      if (response.status === 201) {
        // Assuming successful signup returns a token or user data
        // Simulate storing it in local storage (replace with your logic)
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
      }
    } catch (error: any) {
      if (error.response.status !== 201) {
        // Handle API errors based on status code
        if (error.response.status === 400) {
          // Assuming backend returns 400 for Bad Request

          setSignUpError(error.response.data.message || 'Email already exists.') // Use specific message if available
        } else {
          setSignUpError(error.response.data.message || 'Sign Up failed.')
        }
      }
      setSignUpError(error.response.data.message || 'Sign Up failed.')
    }
  }
  return (
    <>
      {/* component */}
      <div className='bg-gray-100 flex justify-center items-center h-screen'>
        {/* Left: Image */}
        <div className='lg:w-2/5 lg:p-20 md:p-10 sm:p-5 p-8 lg:pt-10 h-screen text-left'>
          <Logo />
          <h1 className='text-2xl font-semibold mb-4 mt-20'>Sign Up</h1>
          {signUpError && (
            <div
              className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2'
              role='alert'>
              <strong className='font-bold'>Error! </strong>
              <span className='block sm:inline'>{signUpError}</span>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* name Input */}
            <div className='mb-4'>
              <label htmlFor='name' className='block text-gray-600 pb-2'>
                Name
              </label>
              <input
                type='text'
                id='name'
                {...register('name')}
                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
              />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name.message}</p>
              )}
            </div>
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
            Already have account?{' '}
            <a href='/' className='hover:underline text-blue-500'>
              Sign In Here
            </a>
          </div>
        </div>
        {/* Right: Login Form */}
        <div className='w-full h-screen lg:w-3/5 hidden lg:block'>
          <img
            src={OfficeTeam}
            alt='Placeholder Image'
            className='object-cover w-full h-full'
          />
        </div>
      </div>
    </>
  )
}

export default SignUp
