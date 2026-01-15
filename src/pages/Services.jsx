import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, Sun, Wrench, Battery, Settings, Plug, MessageSquare, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthContext'

const iconMap = {
  Zap,
  Sun,
  Wrench,
  Battery,
  Settings,
  Plug,
  MessageSquare,
}

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true })

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApplyClick = (slug) => {
    if (user) {
      navigate(`/apply/${slug}`)
    } else {
      navigate('/login', { state: { from: `/apply/${slug}` } })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-[#FFEB3B] text-xl">Loading services...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="text-[#FFEB3B]">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive solar energy solutions from assessment to maintenance
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon_name] || Zap
              return (
                <div
                  key={service.id}
                  className="bg-gray-900 rounded-lg p-6 hover:border-[#FFEB3B] border-2 border-transparent transition-colors"
                >
                  <div className="text-[#FFEB3B] mb-4">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h2 className="text-[#FFEB3B] font-semibold text-xl mb-4">{service.name}</h2>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  <button
                    onClick={() => handleApplyClick(service.slug)}
                    className="inline-flex items-center px-6 py-2 bg-[#FFEB3B] text-black font-semibold rounded-md hover:bg-[#FFEB3B]/90 transition-colors"
                  >
                    Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
