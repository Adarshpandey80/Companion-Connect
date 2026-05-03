import React from 'react'
import { motion } from 'framer-motion'
import CompanionCard from './CompanionCard'
import { COMPANIONS } from '../data/companions'

export default function FeaturedCompanions({ onOpen, onHire }) {
  return (
    <section id="companions" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 w-full">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">Featured Companions</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Meet our top-rated companions. Each profile is verified for your safety and confidence.
          </p>
        </motion.div>

        {/* Companions Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
        >
          {COMPANIONS.map((companion, index) => (
            <motion.div
              key={companion.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
            >
              <CompanionCard c={companion} onOpen={onOpen} onHire={onHire} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-white bg-linear-to-r from-secondary-500 to-accent-500 shadow-lg hover:shadow-xl smooth-transition inline-block text-sm sm:text-base">
            View All Companions
          </button>
        </motion.div>
      </div>
    </section>
  )
}
