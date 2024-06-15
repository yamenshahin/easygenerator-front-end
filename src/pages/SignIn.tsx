import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const SignInSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
})

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(SignInSchema),
  })

  const [signInError, setSignInError] = useState<string | null>(null)

  const onSubmit = async (data: any) => {
    console.log('Sign In data:', data)
    // TODO: Implement API call for authentication with error handling
    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Sign in failed: ${await response.text()}`)
      }

      const responseData = await response.json()
      // Handle successful authentication (e.g., navigate to application page)
      console.log('Sign in successful:', responseData)
    } catch (error: any) {
      setSignInError(error.message)
    }
  }

  return (
    <>
      <div className='container mx-auto px-4 py-16'>
        <div className='shadow-md rounded-lg p-8'>
          <h2 className='text-2xl font-bold mb-4'>Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className='mb-6'>
              <label
                htmlFor='password'
                className='block text-gray-700 text-sm font-bold mb-2'>
                Password
              </label>
              <input
                type='password'
                id='password'
                {...register('password')}
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
                Don't have an account?{' '}
                <a href='/signup' className='text-blue-500 hover:text-blue-700'>
                  Sign Up
                </a>
              </span>
            </div>
            {signInError && (
              <p className='text-red-500 text-xs'>{signInError}</p>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn
