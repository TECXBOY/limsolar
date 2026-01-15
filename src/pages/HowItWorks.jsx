import { Zap, Sun, Wrench, Settings, Battery, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

const HowItWorks = () => {
  const [expandedStep, setExpandedStep] = useState(null)

  const steps = [
    {
      number: 1,
      icon: <Zap className="w-8 h-8" />,
      title: 'Energy Assessment',
      details: [
        'Site visit and evaluation',
        'Load analysis and power mapping',
        'Equipment audit',
        'Demand profiling',
      ],
    },
    {
      number: 2,
      icon: <Sun className="w-8 h-8" />,
      title: 'System Design',
      details: [
        'Custom solar array sizing',
        'Battery storage configuration',
        'Inverter and electrical design',
        'ROI projections',
      ],
    },
    {
      number: 3,
      icon: <Wrench className="w-8 h-8" />,
      title: 'Installation',
      details: [
        'Professional installation team',
        'Quality components',
        'Code compliance',
        'Safety protocols',
      ],
    },
    {
      number: 4,
      icon: <Settings className="w-8 h-8" />,
      title: 'Monitoring & Maintenance',
      details: [
        'System monitoring',
        'Regular inspections',
        'Preventive maintenance',
        'Performance optimization',
      ],
    },
    {
      number: 5,
      icon: <Battery className="w-8 h-8" />,
      title: 'Reliable Power Delivery',
      details: [
        'Consistent energy supply',
        'Reduced operational costs',
        'Lower carbon footprint',
        'Energy independence',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">How It </span>
            <span className="text-[#FFEB3B]">Works</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our proven 5-step process for delivering reliable solar energy systems
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-gray-900 rounded-lg border-2 border-transparent hover:border-[#FFEB3B] transition-colors"
              >
                <button
                  onClick={() => setExpandedStep(expandedStep === step.number ? null : step.number)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-[#FFEB3B]/10 rounded-full flex items-center justify-center text-[#FFEB3B]">
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Step {step.number}</div>
                      <h3 className="text-[#FFEB3B] font-semibold text-xl">{step.title}</h3>
                    </div>
                  </div>
                  {expandedStep === step.number ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                {expandedStep === step.number && (
                  <div className="px-6 pb-6">
                    <ul className="space-y-3 text-gray-400">
                      {step.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-[#FFEB3B]">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
