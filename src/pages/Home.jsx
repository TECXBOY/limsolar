import { Link } from 'react-router-dom'
import { Zap, Sun, Wrench, Battery, Settings, Plug, MessageSquare, ArrowRight, CheckCircle } from 'lucide-react'

const Home = () => {
  const valueProps = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Systems-Driven Approach',
      description: 'Engineering-first methodology for reliable energy infrastructure',
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Institutional-Grade Design',
      description: 'Built to handle critical loads and peak demand requirements',
    },
    {
      icon: <Battery className="w-8 h-8" />,
      title: 'Complete Lifecycle Support',
      description: 'From assessment to installation to ongoing maintenance',
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Proven Track Record',
      description: 'Trusted by universities, hospitals, and major institutions',
    },
  ]

  const featuredServices = [
    {
      icon: <Zap className="w-6 h-6" />,
      name: 'Energy Assessment',
      slug: 'energy-assessment',
    },
    {
      icon: <Sun className="w-6 h-6" />,
      name: 'System Design',
      slug: 'system-design',
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      name: 'Installation',
      slug: 'installation',
    },
  ]

  const howItWorksSteps = [
    { icon: <Zap className="w-6 h-6" />, title: 'Assessment' },
    { icon: <Sun className="w-6 h-6" />, title: 'Design' },
    { icon: <Wrench className="w-6 h-6" />, title: 'Installation' },
    { icon: <Settings className="w-6 h-6" />, title: 'Monitoring' },
    { icon: <Battery className="w-6 h-6" />, title: 'Reliable Power' },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Reliable </span>
            <span className="text-[#FFEB3B]">Solar Energy</span>
            <span className="text-white"> Systems for Institutions</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional energy assessment, design, and installation for universities, hospitals, and businesses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-[#FFEB3B] text-black font-semibold rounded-md hover:bg-[#FFEB3B]/90 transition-colors"
            >
              Request Energy Assessment
            </Link>
            <Link
              to="/services"
              className="px-8 py-3 border-2 border-[#FFEB3B] text-[#FFEB3B] font-semibold rounded-md hover:bg-[#FFEB3B]/10 transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg p-6 hover:border-[#FFEB3B] border-2 border-transparent transition-colors"
              >
                <div className="text-[#FFEB3B] mb-4">{prop.icon}</div>
                <h3 className="text-[#FFEB3B] font-semibold text-lg mb-2">{prop.title}</h3>
                <p className="text-gray-400">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-white">Our </span>
            <span className="text-[#FFEB3B]">Services</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredServices.map((service, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg p-6 hover:border-[#FFEB3B] border-2 border-transparent transition-colors"
              >
                <div className="text-[#FFEB3B] mb-4">{service.icon}</div>
                <h3 className="text-[#FFEB3B] font-semibold text-xl mb-4">{service.name}</h3>
                <Link
                  to={`/apply/${service.slug}`}
                  className="inline-flex items-center text-gray-300 hover:text-[#FFEB3B] transition-colors"
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center px-6 py-3 border-2 border-[#FFEB3B] text-[#FFEB3B] font-semibold rounded-md hover:bg-[#FFEB3B]/10 transition-colors"
            >
              View All Services <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-white">How It </span>
            <span className="text-[#FFEB3B]">Works</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-[#FFEB3B] mb-4">
                  {step.icon}
                </div>
                <h3 className="text-white font-semibold">{step.title}</h3>
                {index < howItWorksSteps.length - 1 && (
                  <ArrowRight className="hidden md:block w-6 h-6 text-gray-600 absolute ml-32" />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/how-it-works"
              className="inline-flex items-center px-6 py-3 border-2 border-[#FFEB3B] text-[#FFEB3B] font-semibold rounded-md hover:bg-[#FFEB3B]/10 transition-colors"
            >
              Learn More About Our Process <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Ready to Transform Your Energy Infrastructure?
          </h2>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-[#FFEB3B] text-black font-semibold rounded-md hover:bg-[#FFEB3B]/90 transition-colors"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
