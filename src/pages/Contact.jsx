import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Send to Formspree (you get email notification!)
      const formspreeResponse = await fetch('https://formspree.io/f/mvzblbyr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company_name || 'Not provided',
          message: formData.message,
          _subject: 'New Contact Form Submission - LIMSOLAR',
        }),
      })

      if (!formspreeResponse.ok) {
        throw new Error('Failed to send email notification')
      }

      // Also save to Supabase database
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([formData])

      if (submitError) {
        console.error('Supabase error:', submitError)
        // Continue anyway - email was sent successfully
      }

      // Success!
      setSuccess(true)
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        company_name: '',
        message: '',
      })

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)

    } catch (err) {
      setError(err.message || 'Failed to submit form. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Contact </span>
            <span className="text-[#FFEB3B]">Us</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get in touch to discuss your solar energy needs
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-900 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-[#FFEB3B] mb-6">Send us a Message</h2>
              {success && (
                <div className="mb-6 p-4 bg-green-900/30 border border-green-500 rounded-md text-green-400">
                  ✅ Thank you for your message! We'll get back to you within 24 hours.
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-md text-red-400">
                  ❌ {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="full_name" className="block text-gray-300 mb-2">
                    Full Name <span className="text-[#FFEB3B]">*</span>
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Email <span className="text-[#FFEB3B]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-300 mb-2">
                    Phone <span className="text-[#FFEB3B]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                  />
                </div>
                <div>
                  <label htmlFor="company_name" className="block text-gray-300 mb-2">
                    Company/Institution
                  </label>
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">
                    Message <span className="text-[#FFEB3B]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-[#FFEB3B] text-black font-semibold rounded-md hover:bg-[#FFEB3B]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? 'Sending...' : (
                    <>
                      Send Message <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#FFEB3B] mb-6">Get in Touch</h2>
                <p className="text-gray-400 mb-8">
                  Have questions about our services? Want to schedule a consultation? 
                  We're here to help you transition to reliable solar energy.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-[#FFEB3B] mt-1">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Phone</h3>
                    <p className="text-gray-400">+232 31 733099</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-[#FFEB3B] mt-1">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <p className="text-gray-400">koromamohamedlamin728@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-[#FFEB3B] mt-1">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Office Location</h3>
                    <p className="text-gray-400">Limkokwing.sl</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-3">Business Hours</h3>
                <div className="space-y-2 text-gray-400">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
