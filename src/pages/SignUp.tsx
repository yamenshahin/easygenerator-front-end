import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import {useState} from 'react'

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

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data: FormData) => {
    console.log(`${import.meta.env.VITE_API_URL}/users`)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        data,
      )
    } catch (error: any) {
      console.log(error.response.data.message)
      if (error.response.status !== 201) {
        // Handle API errors based on status code
        if (error.response.status === 400) {
          // Assuming backend returns 400 for Bad Request

          setSignUpError(error.response.data.message || 'Email already exists.') // Use specific message if available
        } else {
          setSignUpError(error.response.data.message || 'Sign Up failed.')
        }
      } else {
        console.log('Sign Up successful:', error.response.data)
        // Handle successful sign-up (e.g., redirect to sign-in page)
      }
      setSignUpError(error.response.data.message || 'Sign Up failed.')
    }
  }
  return (
    <>
      <div className='container mx-auto px-4 py-16'>
        <div className='shadow-md rounded-lg p-8'>
          <h2 className='text-2xl font-bold mb-4'>Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {signUpError && (
              <p className='text-red-500 text-xs first-letter:uppercase'>
                {signUpError}
              </p>
            )}
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-gray-700 text-sm font-bold mb-2'>
                Name
              </label>
              <input
                type='text'
                id='name'
                {...register('name')}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              {errors.name && (
                <p className='text-red-500 text-xs'>{errors.name.message}</p>
              )}
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-gray-700 text-sm font-bold mb-2'>
                Email
              </label>
              <input
                type='email'
                id='email'
                {...register('email')}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              {errors.email && (
                <p className='text-red-500 text-xs'>{errors.email.message}</p>
              )}
            </div>
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block text-gray-700 text-sm font-bold mb-2'>
                Password
              </label>
              <input
                type='password'
                id='password'
                {...register('password')}
                defaultValue={'abcdABCD123!@#'}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              {errors.password && (
                <p className='text-red-500 text-xs'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className='flex items-center justify-between'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'>
                Sign In
              </button>
              <span className='inline-block align-baseline font-bold text-sm'>
                Already have account?{' '}
                <a href='/' className='text-blue-500 hover:text-blue-700'>
                  Sign In
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
