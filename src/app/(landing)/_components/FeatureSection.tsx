'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Smart Search',
    description: 'Find properties that meet your needs with our efficient search tool.',
    icon: '🔍',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    title: 'Online Viewings',
    description: 'Browse property photos and details from the comfort of your home.',
    icon: '🏠',
    gradient: 'from-violet-400 to-violet-600',
  },
  {
    title: 'Market Insights',
    description: 'Stay informed with the latest property market information and trends to make smart decisions.',
    icon: '📊',
    gradient: 'from-indigo-400 to-indigo-600',
  },
  {
    title: 'Secure Transactions',
    description: 'Complete your property deals safely with our secure platform.',
    icon: '🔒',
    gradient: 'from-purple-400 to-purple-600',
  },
]

function FeatureSection() {
  return (
    <div id="features" className="container mx-auto px-6 py-24">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            Why Choose EstateHub?
          </span>
        </h2>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Experience the future of real estate with our cutting-edge features
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="hover:scale-105 transition-all duration-300 h-full border-none bg-white/5 backdrop-blur-sm">
              <CardHeader className="pb-0 pt-6 px-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} 
                  flex items-center justify-center text-2xl shadow-lg transform hover:rotate-12 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
              </CardHeader>
              <CardBody className="pb-6 pt-4">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FeatureSection
