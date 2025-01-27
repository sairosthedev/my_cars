import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../utils/supabaseClient'

const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          navigate('/signin')
          return
        }

        if (session) {
          navigate('/')
        } else {
          navigate('/signin')
        }
      } catch (error) {
        console.error('Unexpected error during auth callback:', error)
        navigate('/signin')
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-900 mx-auto mb-4"></div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Processing Authentication</h2>
        <p className="text-gray-600">Please wait while we complete the sign-in process.</p>
      </div>
    </div>
  )
}

export default AuthCallback 