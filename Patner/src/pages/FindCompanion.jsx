import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, MapPin, Clock, MessageCircle, Heart, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { REVIEWS } from '../data/reviews'
import BookingModal from '../components/BookingModal'
import BookingConfirmation from '../components/BookingConfirmation'

export default function CompanionProfile({ companions }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const companion = companions.find(c => String(c.id) === id)
  const [isWishlisted, setIsWishlisted] = React.useState(false)
  const [showBookingModal, setShowBookingModal] = React.useState(false)
  const [confirmedBooking, setConfirmedBooking] = React.useState(null)
  const [activeImage, setActiveImage] = React.useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveImage(0)
  }, [])

  const images = companion?.images?.length
    ? companion.images
    : companion?.image
      ? [companion.image]
      : []

  const showPreviousImage = () => {
    setActiveImage((current) => (current - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1))
  }

  const showNextImage = () => {
    setActiveImage((current) => (current + 1) % Math.max(images.length, 1))
  }

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
          {/* Profile Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="space-y-3">
              <div className="relative h-96 min-h-96 overflow-hidden rounded-3xl bg-gradient-to-br from-[#f3e5fb] via-[#fff4f7] to-[#f9dce8] shadow-xl lg:h-[34rem]">
                {images.length > 0 ? (
                  <img src={images[activeImage]} alt={`${companion.name} profile photo ${activeImage + 1}`} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-8xl">{companion.emoji}</div>
                )}
                {images.length > 1 && (
                  <>
                    <button type="button" onClick={showPreviousImage} aria-label="Previous profile photo" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#2d1b4e] shadow-lg transition hover:bg-white">
                      <ChevronLeft size={20} />
                    </button>
                    <button type="button" onClick={showNextImage} aria-label="Next profile photo" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#2d1b4e] shadow-lg transition hover:bg-white">
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur-sm">
                      {images.map((image, index) => (
                        <button key={image} type="button" onClick={() => setActiveImage(index)} aria-label={`Show profile photo ${index + 1}`} className={`h-2 w-2 rounded-full transition ${index === activeImage ? 'bg-white' : 'bg-white/50'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((image, index) => (
                    <button key={image} type="button" onClick={() => setActiveImage(index)} className={`aspect-[4/3] overflow-hidden rounded-xl border-2 transition ${index === activeImage ? 'border-[#e879a0]' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                      <img src={image} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
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
                  <span>{companion.availability || 'Flexible schedule'}</span>
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
                onClick={() => setShowBookingModal(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-lg bg-gray-800 font-semibold text-blue-500 bg-gradient-to-r from-secondary-500 to-accent-500 shadow-lg hover:shadow-xl smooth-transition flex items-center justify-center gap-2"
              >
                <Calendar size={19} />
                Book {companion.name.split(' ')[0]}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-lg bg-gray-800 font-semibold text-blue-500 bg-gradient-to-r from-secondary-500 to-accent-500 shadow-lg hover:shadow-xl smooth-transition flex items-center justify-center gap-2"
              >
                <MessageCircle size={20}  className="text-blue-500" />
                <span className=" font-semibold text-blue-500">Send Message</span>
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
                ✓ Verified profile - All verification checks passed
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

      {showBookingModal && (
        <BookingModal 
          companion={companion} 
          onClose={() => setShowBookingModal(false)}
          onConfirm={(booking) => {
            setConfirmedBooking(booking);
            setShowBookingModal(false);
          }}
        />
      )}

      {confirmedBooking && (
        <BookingConfirmation 
          booking={confirmedBooking} 
          onClose={() => setConfirmedBooking(null)}
        />
      )}
    </div>
  )
}
