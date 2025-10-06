'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Share2, Gift, Star, User, AlertCircle } from 'lucide-react'
import ShareableAgeCard from '@/components/ShareableAgeCard'
import BirthYearFacts from '@/components/BirthYearFacts'
import CelebrityAgeTwins from '@/components/CelebrityAgeTwins'
import AgeMilestones from '@/components/AgeMilestones'
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'

export default function Home() {
  const [birthDate, setBirthDate] = useState('')
  const [userName, setUserName] = useState('')
  const [age, setAge] = useState<{
    years: number
    months: number
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)
  const [isCalculated, setIsCalculated] = useState(false)
  const [showDateAlert, setShowDateAlert] = useState(false)
  const dateInputRef = useRef<HTMLInputElement>(null)

  const calculateAge = () => {
    if (!birthDate) return

    const birth = new Date(birthDate)
    const now = new Date()

    const years = differenceInYears(now, birth)
    const months = differenceInMonths(now, birth)
    const days = differenceInDays(now, birth)
    const hours = differenceInHours(now, birth)
    const minutes = differenceInMinutes(now, birth)
    const seconds = differenceInSeconds(now, birth)

    setAge({ years, months, days, hours, minutes, seconds })
    setIsCalculated(true)
  }

  // Update seconds in real-time
  useEffect(() => {
    if (age && birthDate) {
      const interval = setInterval(() => {
        const birth = new Date(birthDate)
        const now = new Date()
        const seconds = differenceInSeconds(now, birth)
        setAge(prev => prev ? { ...prev, seconds } : null)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [age, birthDate])

  // Handle clicking on placeholder sections when no birthdate is entered
  const handlePlaceholderClick = () => {
    if (!birthDate) {
      setShowDateAlert(true)
      dateInputRef.current?.focus()
      setTimeout(() => setShowDateAlert(false), 3000)
    }
  }

  const shareAge = () => {
    if (!age) return

    const displayName = userName || 'I'
    const text = `${displayName} ${userName ? 'is' : 'am'} exactly ${age.years} years, ${age.months % 12} months, and ${age.days % 30} days old! That's ${age.days.toLocaleString()} days or ${age.seconds.toLocaleString()} seconds of life! 🎂 Calculate your precise age at AgeMath.com! ✨`

    if (navigator.share) {
      navigator.share({
        title: `${userName ? `${userName}'s` : 'My'} Exact Age`,
        text,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(text)
      alert('Copied age details to clipboard! 📋')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      {/* Header */}
      <header className="text-center py-8">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AgeMath 🎂
        </motion.h1>
        <motion.p
          className="text-xl text-white/90 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Calculate your exact age in years, months, days, hours, minutes, and seconds!
          Plus discover celebrity age twins, birth year facts, and milestone celebrations! ✨
        </motion.p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        {/* Input Section */}
        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🎯 Calculate Your Precise Age
            </h2>
            <p className="text-gray-600">
              Enter your details below to discover amazing facts about your life!
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            {/* Name Input (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline mr-1" size={16} />
                Your Name (Optional)
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name for personalized results"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
              />
              <p className="text-sm text-gray-500 mt-1">
                💡 Adding your name personalizes all the fun facts and results!
              </p>
            </div>

            {/* Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline mr-1" size={16} />
                Your Birth Date
              </label>
              <div className="relative">
                <input
                  ref={dateInputRef}
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg ${
                    showDateAlert ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
                  }`}
                />
                {showDateAlert && (
                  <motion.div
                    className="absolute -top-12 left-0 right-0 bg-red-100 border border-red-300 rounded-lg p-2 text-sm text-red-700 flex items-center justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <AlertCircle size={16} className="mr-1" />
                    Please enter your birth date first!
                  </motion.div>
                )}
              </div>
            </div>

            <motion.button
              onClick={calculateAge}
              disabled={!birthDate}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-600 transition-all"
              whileHover={{ scale: birthDate ? 1.02 : 1 }}
              whileTap={{ scale: birthDate ? 0.98 : 1 }}
            >
              {birthDate ? '🚀 Calculate My Age!' : '📅 Enter Birth Date First'}
            </motion.button>
          </div>
        </motion.div>

        {/* Results Section */}
        {isCalculated && age && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Age Display */}
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 text-center shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                🎉 {userName ? `${userName}'s` : 'Your'} Precise Age
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-2xl">
                  <div className="text-3xl font-bold text-purple-600">{age.years}</div>
                  <div className="text-purple-600 font-medium">Years</div>
                </div>
                <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-4 rounded-2xl">
                  <div className="text-3xl font-bold text-pink-600">{age.months}</div>
                  <div className="text-pink-600 font-medium">Months</div>
                </div>
                <div className="bg-gradient-to-br from-red-100 to-red-200 p-4 rounded-2xl">
                  <div className="text-3xl font-bold text-red-600">{age.days.toLocaleString()}</div>
                  <div className="text-red-600 font-medium">Days</div>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-2xl">
                  <div className="text-3xl font-bold text-orange-600">{age.hours.toLocaleString()}</div>
                  <div className="text-orange-600 font-medium">Hours</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-4 rounded-2xl">
                  <div className="text-3xl font-bold text-yellow-600">{age.minutes.toLocaleString()}</div>
                  <div className="text-yellow-600 font-medium">Minutes</div>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-2xl">
                  <div className="text-3xl font-bold text-green-600">{age.seconds.toLocaleString()}</div>
                  <div className="text-green-600 font-medium">Seconds</div>
                </div>
              </div>

              <motion.button
                onClick={shareAge}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-pink-600 hover:to-purple-600 transition-all flex items-center justify-center mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="mr-2" size={24} />
                Share {userName ? `${userName}'s` : 'My'} Age! 📱
              </motion.button>
            </motion.div>

            {/* Feature Components */}
            <div className="space-y-8">
              <ShareableAgeCard age={age} birthDate={birthDate} userName={userName} />
              <CelebrityAgeTwins age={age} userName={userName} />
              <BirthYearFacts birthYear={new Date(birthDate).getFullYear()} userName={userName} />
              <AgeMilestones age={age} userName={userName} />
            </div>
          </motion.div>
        )}

        {/* Coming Soon Teasers - Now Clickable */}
        {!isCalculated && (
          <motion.div
            className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center cursor-pointer hover:bg-white/95 transition-all"
              onClick={handlePlaceholderClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Gift className="mx-auto mb-4 text-purple-500" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Celebrity Age Twins</h3>
              <p className="text-gray-600">Find out which celebrities are your exact age!</p>
              <p className="text-sm text-purple-600 mt-2 font-medium">👆 Click to get started</p>
            </motion.div>

            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center cursor-pointer hover:bg-white/95 transition-all"
              onClick={handlePlaceholderClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="mx-auto mb-4 text-pink-500" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Your Birth Year</h3>
              <p className="text-gray-600">Discover what happened when you were born!</p>
              <p className="text-sm text-pink-600 mt-2 font-medium">👆 Click to get started</p>
            </motion.div>

            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center cursor-pointer hover:bg-white/95 transition-all"
              onClick={handlePlaceholderClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Star className="mx-auto mb-4 text-yellow-500" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Age Milestones</h3>
              <p className="text-gray-600">Track and celebrate your life milestones!</p>
              <p className="text-sm text-yellow-600 mt-2 font-medium">👆 Click to get started</p>
            </motion.div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-white/80">
        <p>&copy; 2024 AgeMath.com - Calculate your age precisely {userName && `• Welcome ${userName}! 👋`}</p>
      </footer>
    </div>
  )
}