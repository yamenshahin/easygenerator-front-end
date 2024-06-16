import {useEffect, useState} from 'react'
import axios from 'axios'

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  async function validateToken() {
    const token = localStorage.getItem('userToken')
    if (token) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/validate`,
          {
            headers: {authorization: token},
          },
        )
        setIsLoggedIn(true)
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    } else {
      setIsLoggedIn(false)
    }
  }
  useEffect(() => {
    validateToken()
  }, [])

  return isLoggedIn
}
