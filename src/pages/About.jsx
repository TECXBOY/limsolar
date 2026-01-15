import { CheckCircle, Award, Users, Target } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Mission',
      description: 'To provide reliable, engineering-grade solar energy systems that power institutions with confidence and sustainability.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Vision',
      description: 'To be the leading solar energy partner for institutional clients, known for systems-driven solutions and exceptional service.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expertise',
      description: 'Our team brings decades of combined experience in solar engineering, electrical systems, and institutional energy management.',
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Values',
      description: 'Engineering excellence, reliability, transparency, and long-term partnership with our clients.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">About </span>
            <span className="text-[#FFEB3B]">Lim Solar</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Systems-driven energy solutions for institutional clients
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg p-6 hover:border-[#FFEB3B] border-2 border-transparent transition-colors"
              >
                <div className="text-[#FFEB3B] mb-4">{value.icon}</div>
                <h3 className="text-[#FFEB3B] font-semibold text-lg mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Lim Solar */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-white">Why </span>
            <span className="text-[#FFEB3B]">Lim Solar</span>
          </h2>
          <div className="space-y-6 text-gray-400">
            <p>
              Lim Solar is not just a solar installer—we're a systems engineering company that happens to specialize in solar energy. 
              Our approach is fundamentally different from typical solar companies.
            </p>
            <p>
              We understand that institutions have unique requirements: critical loads that cannot fail, peak demand periods that 
              must be managed, and long-term operational needs that extend far beyond installation.
            </p>
            <p>
              Our team combines deep technical expertise with institutional understanding, ensuring that every system we design 
              and install is built to handle real-world operational requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications & Partnerships */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-white">Certifications & </span>
            <span className="text-[#FFEB3B]">Partnerships</span>
          </h2>
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <p className="text-gray-400 mb-4">
              Lim Solar maintains industry certifications and partnerships with leading solar equipment manufacturers.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-gray-400">
              <div>• NABCEP Certified Installers</div>
              <div>• Licensed Electrical Contractors</div>
              <div>• Tier 1 Panel Partners</div>
              <div>• Certified Battery System Installers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
