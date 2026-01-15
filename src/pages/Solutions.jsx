import { Building2, Stethoscope, Briefcase, Factory, Shield, Hotel } from 'lucide-react'

const Solutions = () => {
  const solutions = [
    {
      icon: <Building2 className="w-8 h-8" />,
      type: 'Universities & Educational Institutions',
      challenges: [
        'High energy consumption from labs and facilities',
        'Peak demand during class hours',
        'Need for reliable backup power',
      ],
      approach: 'Custom solar arrays with battery storage to handle campus loads, reduce grid dependency, and provide emergency backup.',
      benefits: [
        'Reduced electricity costs',
        'Sustainable campus operations',
        'Educational opportunities for students',
      ],
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      type: 'Healthcare Facilities',
      challenges: [
        'Critical power requirements for life-saving equipment',
        '24/7 operations with no downtime tolerance',
        'High energy costs',
      ],
      approach: 'Redundant solar + battery systems with generator integration for critical loads, ensuring zero interruption.',
      benefits: [
        'Uninterrupted power supply',
        'Lower operational costs',
        'Enhanced patient safety',
      ],
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      type: 'Corporate Offices',
      challenges: [
        'Daytime peak energy usage',
        'Sustainability goals',
        'Cost reduction initiatives',
      ],
      approach: 'Grid-tied solar systems optimized for daytime consumption, with optional battery storage for peak shaving.',
      benefits: [
        'Lower electricity bills',
        'Corporate sustainability achievements',
        'Improved brand image',
      ],
    },
    {
      icon: <Factory className="w-8 h-8" />,
      type: 'Manufacturing Plants',
      challenges: [
        'High power demand for machinery',
        'Volatile energy costs',
        'Production continuity requirements',
      ],
      approach: 'Large-scale solar installations with industrial-grade battery systems and smart load management.',
      benefits: [
        'Predictable energy costs',
        'Reduced carbon footprint',
        'Production reliability',
      ],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      type: 'Government Buildings',
      challenges: [
        'Public sector sustainability mandates',
        'Budget constraints',
        'Long-term planning requirements',
      ],
      approach: 'Comprehensive solar solutions with long-term maintenance contracts and performance guarantees.',
      benefits: [
        'Compliance with green initiatives',
        'Long-term cost savings',
        'Public sector leadership',
      ],
    },
    {
      icon: <Hotel className="w-8 h-8" />,
      type: 'Hotels & Hospitality',
      challenges: [
        '24/7 guest comfort requirements',
        'High HVAC and lighting loads',
        'Competitive operating costs',
      ],
      approach: 'Solar systems designed for hospitality loads with battery backup for guest comfort during outages.',
      benefits: [
        'Reduced operational expenses',
        'Enhanced guest experience',
        'Sustainability marketing advantage',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Solar </span>
            <span className="text-[#FFEB3B]">Solutions</span>
            <span className="text-white"> for Every Institution</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tailored solar energy systems designed for the unique needs of different institution types
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg p-8 hover:border-[#FFEB3B] border-2 border-transparent transition-colors"
              >
                <div className="text-[#FFEB3B] mb-4">{solution.icon}</div>
                <h2 className="text-[#FFEB3B] font-semibold text-2xl mb-6">{solution.type}</h2>

                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">Typical Challenges:</h3>
                  <ul className="space-y-2 text-gray-400">
                    {solution.challenges.map((challenge, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">Our Solution Approach:</h3>
                  <p className="text-gray-400">{solution.approach}</p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3">Expected Benefits:</h3>
                  <ul className="space-y-2 text-gray-400">
                    {solution.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 text-[#FFEB3B]">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Solutions
