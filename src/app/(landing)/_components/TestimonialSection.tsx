import { Avatar, Card, CardBody, CardHeader } from '@nextui-org/react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Michael Chen',
    role: 'Real Estate Investor',
    content: 'The market insights provided by EstateHub have been invaluable for my investment decisions.',
    avatar: '/images/review_avatar1.svg',
  },
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    content: 'EstateHub made finding my dream home a breeze. The virtual tours saved me so much time!',
    avatar: '/images/review_avatar2.png',
  },
  {
    name: 'Emily Rodriguez',
    role: 'First-time Buyer',
    content: 'As a first-time buyer, EstateHub guided me through every step. I couldn\'t be happier with my new home!',
    avatar: '/images/review_avatar3.png',
  },
]

function TestimonialSection() {
  return (
    <div id="testimonials" className="container mx-auto px-6 py-16">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            What Our Clients Say?
          </span>
        </h2>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Hear from our satisfied clients about their experience with EstateHub
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card>
              <CardHeader className="justify-between">
                <div className="flex gap-5">
                  <Avatar isBordered radius="full" size="md" src={testimonial.avatar} />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none">{testimonial.name}</h4>
                    <h5 className="text-small tracking-tight text-default-400">{testimonial.role}</h5>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="text-small">
                <p>{testimonial.content}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialSection
