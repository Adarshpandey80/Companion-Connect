import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, MapPin, Clock, MessageCircle, Heart, Share2, ChevronLeft, Calendar, Users } from 'lucide-react'
import { COMPANIONS } from '../data/companions'
import { REVIEWS } from '../data/reviews'

export default function CompanionProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const companion = COMPANIONS.find(c => c.id === parseInt(id))
  const [isWishlisted, setIsWishlisted] = React.useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!companion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Companion not found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-secondary-500 text-white rounded-lg font-semibold hover:bg-secondary-600 smooth-transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/')}
        className="ml-4 sm:ml-8 mb-6 flex items-center space-x-2 text-gray-700 hover:text-secondary-600 smooth-transition font-medium"
      >
        <ChevronLeft size={20} />
        <span>Back</span>
      </motion.button>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="glass-lg rounded-3xl overflow-hidden mb-6 h-96 lg:h-full min-h-96">
              <img
                src={companion.image}
                alt={companion.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Profile Header */}
            <div className="glass-lg rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{companion.name}</h1>
                  <p className="text-sm text-secondary-600 font-medium">{companion.role}</p>
                  <p className="text-sm text-gray-600 mt-1">{companion.age} years old</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 rounded-lg hover:bg-gray-100 smooth-transition"
                >
                  <Heart
                    size={24}
                    className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                  />
                </motion.button>
              </div>

              {/* Location & Availability */}
              <div className="space-y-3 pb-6 border-b border-white/20">
                <div className="flex items-center space-x-2 text-gray-700">
                  <MapPin size={18} className="text-accent-500" />
                  <span>{companion.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <Clock size={18} />
                  <span>{companion.availability}</span>
                </div>
              </div>

              {/* Price */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">Hourly Rate</p>
                <p className="text-4xl font-bold gradient-text">${companion.price}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="glass-lg rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(companion.rating) ? 'fill-accent-400 text-accent-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{companion.rating}</p>
                  <p className="text-sm text-gray-600">({companion.reviews} reviews)</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-secondary-500 to-accent-500 shadow-lg hover:shadow-xl smooth-transition"
              >
                Book Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-lg font-semibold text-secondary-600 glass hover:bg-white/50 smooth-transition flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Send Message</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bio & Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12"
        >
          {/* Bio */}
          <div className="glass-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{companion.bio}</p>
            <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
              <p className="text-sm text-accent-900">
                ✓ {companion.badge} profile - All verification checks passed
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="glass-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Services Offered</h2>
            <div className="space-y-3">
              {companion.services.map((service) => (
                <div key={service} className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full" />
                  <span className="font-medium text-gray-800">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Availability Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-lg rounded-2xl p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <Calendar size={24} className="text-secondary-500" />
            <span>Availability</span>
          </h2>
          <div className="bg-secondary-50 border-l-4 border-secondary-500 p-6 rounded">
            <p className="text-gray-800 font-medium mb-2">Currently available for bookings</p>
            <p className="text-gray-600">Book within the next 14 days. To check specific dates and times, proceed to booking.</p>
          </div>
        </motion.div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.slice(0, 2).map((review, idx) => (
              <div key={idx} className="glass-lg rounded-2xl p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.stars ? 'fill-accent-400 text-accent-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{review.text}"</p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="font-medium">{review.name}</span>
                  <span>{review.city}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
