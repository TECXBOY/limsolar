import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthContext'
import { ArrowLeft, CheckCircle } from 'lucide-react'

const ApplyService = () => {
  const { serviceSlug } = useParams()
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    phone: '',
    location: '',
    preferred_date: '',
    current_energy_source: '',
    estimated_load: '',
    additional_notes: '',
  })

  useEffect(() => {
    fetchService()
    if (profile) {
      setFormData({
        ...formData,
        contact_person: profile.full_name || '',
        phone: profile.phone || '',
        company_name: profile.company_name || '',
      })
    }
  }, [serviceSlug])

  const fetchService = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('services')
        .select('*')
        .eq('slug', serviceSlug)
        .eq('is_active', true)
        .single()

      if (fetchError) throw fetchError
      setService(data)
    } catch (err) {
      console.error('Error fetching service:', err)
      setError('Service not found')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateForm = () => {
    if (!formData.company_name.trim()) {
      setError('Company name is required')
      return false
    }
    if (!formData.contact_person.trim()) {
      setError('Contact person is required')
      return false
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required')
      return false
    }
    if (!formData.location.trim()) {
      setError('Location is required')
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

    setSubmitting(true)

    try {
      // Send to Formspree (you get email notification!)
      const formspreeResponse = await fetch('https://formspree.io/f/mzdaolly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: service.name,
          company: formData.company_name,
          contact_person: formData.contact_person,
          phone: formData.phone,
          location: formData.location,
          preferred_date: formData.preferred_date || 'Not specified',
          current_energy_source: formData.current_energy_source || 'Not specified',
          estimated_load: formData.estimated_load || 'Not specified',
          additional_notes: formData.additional_notes || 'None',
          user_email: user.email,
          _subject: `🎯 New Service Application: ${service.name} - LIMSOLAR`,
        }),
      })

      if (!formspreeResponse.ok) {
        throw new Error('Failed to send email notification')
      }

      // Also save to Supabase database
      const { data, error: submitError } = await supabase
        .from('service_applications')
        .insert([
          {
            user_id: user.id,
            service_id: service.id,
            company_name: formData.company_name,
            contact_person: formData.contact_person,
            phone: formData.phone,
            location: formData.location,
            preferred_date: formData.preferred_date || null,
            current_energy_source: formData.current_energy_source || null,
            estimated_load: formData.estimated_load || null,
            additional_notes: formData.additional_notes || null,
            status: 'pending',
          },
        ])
        .select()
        .single()

      if (submitError) {
        console.error('Supabase error:', submitError)
        // Continue anyway - email was sent successfully
      }

      setSuccess(true)
      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)
    } catch (err) {
      setError(err.message || 'Failed to submit application. Please try again.')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-[#FFEB3B] text-xl">Loading...</div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Service not found</p>
          <button
            onClick={() => navigate('/services')}
            className="px-6 py-3 bg-[#FFEB3B] text-black font-semibold rounded-md hover:bg-[#FFEB3B]/90"
          >
            Back to Services
          </button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-900 rounded-lg p-8 border border-gray-800 text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#FFEB3B] mb-4">Application Submitted!</h2>
          <p className="text-gray-400 mb-6">
            ✅ Your application has been submitted successfully. Our team will review and contact you within 2 business days.
          </p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-[#FFEB3B] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Apply for </span>
            <span className="text-[#FFEB3B]">{service.name}</span>
          </h1>
          <p className="text-gray-400 text-lg">{service.description}</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-md text-red-400">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company_name" className="block text-gray-300 mb-2">
                  Company/Institution Name <span className="text-[#FFEB3B]">*</span>
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  required
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                />
              </div>

              <div>
                <label htmlFor="contact_person" className="block text-gray-300 mb-2">
                  Contact Person <span className="text-[#FFEB3B]">*</span>
                </label>
                <input
                  type="text"
                  id="contact_person"
                  name="contact_person"
                  required
                  value={formData.contact_person}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-300 mb-2">
                  Phone Number <span className="text-[#FFEB3B]">*</span>
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
                <label htmlFor="location" className="block text-gray-300 mb-2">
                  Location/Address <span className="text-[#FFEB3B]">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                />
              </div>

              <div>
                <label htmlFor="preferred_date" className="block text-gray-300 mb-2">
                  Preferred Consultation Date
                </label>
                <input
                  type="date"
                  id="preferred_date"
                  name="preferred_date"
                  value={formData.preferred_date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                />
              </div>

              <div>
                <label htmlFor="current_energy_source" className="block text-gray-300 mb-2">
                  Current Energy Source
                </label>
                <select
                  id="current_energy_source"
                  name="current_energy_source"
                  value={formData.current_energy_source}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                >
                  <option value="">Select...</option>
                  <option value="Grid Only">Grid Only</option>
                  <option value="Generator">Generator</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="estimated_load" className="block text-gray-300 mb-2">
                  Estimated Power Load
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="estimated_load"
                    name="estimated_load"
                    value={formData.estimated_load}
                    onChange={handleChange}
                    placeholder="e.g., 100"
                    className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-l-md text-white focus:outline-none focus:border-[#FFEB3B]"
                  />
                  <select className="px-4 py-2 bg-[#1A1A1A] border border-l-0 border-gray-700 rounded-r-md text-white focus:outline-none">
                    <option>kW</option>
                    <option>MW</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="additional_notes" className="block text-gray-300 mb-2">
                Additional Notes/Requirements
              </label>
              <textarea
                id="additional_notes"
                name="additional_notes"
                rows="5"
                value={formData.additional_notes}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                placeholder="Tell us more about your requirements..."
              />
            </div>

            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-700 text-gray-300 rounded-md hover:border-[#FFEB3B] hover:text-[#FFEB3B] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-[#FFEB3B] text-black font-semibold rounded-md hover:bg-[#FFEB3B]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ApplyService
```

---

## **What Changed:**

1. ✅ **Added Formspree integration** - Sends instant email when application submitted
2. ✅ **Custom subject line** - Shows service name in email subject
3. ✅ **All form data included** - Company, contact, service details
4. ✅ **Still saves to Supabase** - Backup in database
5. ✅ **Better error handling** - Email sends even if Supabase fails
6. ✅ **Enhanced success message** - Shows checkmark emoji

---

## **Now Update GitHub:**

1. Go to: https://github.com/TECXBOY/limsolar/blob/main/src/pages/ApplyService.jsx
2. Click **pencil icon** (Edit)
3. **Delete all code**
4. **Paste the new code** above
5. Commit message: **"Add Formspree email notifications for service applications"**
6. Click **"Commit changes"**
7. Wait **2 minutes** for Vercel to deploy

---

## **Test It:**

1. Go to: https://limsolar.vercel.app/services
2. **Login** (or register)
3. Click **"Apply Now"** on any service
4. Fill out the form
5. Submit
6. **Check your email!** 📧

You should receive:
```
Subject: 🎯 New Service Application: [Service Name] - LIMSOLAR

Service: Energy Assessment & Load Analysis
Company: Test Company
Contact Person: John Doe
Phone: +232-XX-XXX-XXXX
Location: Freetown
...
