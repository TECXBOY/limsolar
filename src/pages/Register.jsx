import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    password: '',
    confirmPassword: '',
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signUp, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateForm = () => {
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }

    if (!acceptTerms) {
      setError('You must accept the terms and conditions')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    const { data, error: signUpError } = await signUp(formData.email, formData.password, {
      fullName: formData.fullName,
      phone: formData.phone,
      companyName: formData.companyName,
    })

    if (signUpError) {
      setError(signUpError.message || 'Failed to create account. Please try again.')
      setLoading(false)
      return
    }

    if (data?.user) {
      navigate('/dashboard', { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-[#D4A574] rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-black rounded-full"></div>
            </div>
            <span className="text-[#FFEB3B] font-bold text-2xl">LIM SOLAR</span>
          </div>
          <h2 className="text-3xl font-bold text-white">Create your account</h2>
        </div>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-md text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-gray-300 mb-2">
                Full Name <span className="text-[#FFEB3B]">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email address <span className="text-[#FFEB3B]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-300 mb-2">
                Phone <span className="text-[#FFEB3B]">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="companyName" className="block text-gray-300 mb-2">
                Company/Institution Name
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                placeholder="Your Company"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Password <span className="text-[#FFEB3B]">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                placeholder="Minimum 8 characters"
              />
              <p className="mt-1 text-xs text-gray-400">Must be at least 8 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
                Confirm Password <span className="text-[#FFEB3B]">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex items-center">
              <input
                id="accept-terms"
                name="accept-terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-[#FFEB3B] focus:ring-[#FFEB3B] border-gray-700 rounded bg-[#1A1A1A]"
              />
              <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-300">
                I accept the <a href="#" className="text-[#FFEB3B] hover:text-[#FFEB3B]/80">terms and conditions</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-[#FFEB3B] text-black font-semibold rounded-md hover:bg-[#FFEB3B]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-400">Already have an account? </span>
            <Link to="/login" className="text-[#FFEB3B] hover:text-[#FFEB3B]/80 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
