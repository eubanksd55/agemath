'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Share2, Gift, Star } from 'lucide-react'
import ShareableAgeCard from '@/components/ShareableAgeCard'
import BirthYearFacts from '@/components/BirthYearFacts'
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format } from 'date-fns'

export default function Home() {
  const [birthDate, setBirthDate] = useState('')
  const [age, setAge] = useState<{
    years: number
    months: number
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)
  const [isCalculated, setIsCalculated] = useState(false)

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

  const shareAge = () => {
    if (age) {
      const text = `I'm ${age.years} years old! That's ${age.days.toLocaleString()} days of amazing life! Calculate your age at AgeMath.com 🎂`
      if (navigator.share) {
        navigator.share({ text, url: window.location.href })
      } else {
        navigator.clipboard.writeText(text)
        alert('Copied to clipboard!')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      {/* Header */}
      <header className="p-6 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AgeMath
        </motion.h1>
        <motion.p
          className="text-xl text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Calculate your age precisely ✨
        </motion.p>
      </header>

      {/* Main Calculator */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Date Input */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              When were you born?
            </h2>

            <div className="relative max-w-md mx-auto">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
                max={format(new Date(), 'yyyy-MM-dd')}
              />
            </div>

            <motion.button
              onClick={calculateAge}
              disabled={!birthDate}
              className="mt-6 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Calculate My Age! 🎉
            </motion.button>
          </div>

          {/* Age Display */}
          {isCalculated && age && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Main Age */}
              <div className="text-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">You are...</h3>
                <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {age.years}
                </div>
                <div className="text-2xl text-gray-600 mt-2">years old!</div>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center bg-blue-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-600">{age.months.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Months</div>
                </div>
                <div className="text-center bg-green-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-600">{age.days.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Days</div>
                </div>
                <div className="text-center bg-yellow-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-600">{age.hours.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Hours</div>
                </div>
                <div className="text-center bg-red-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-red-600">{age.minutes.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
                <div className="text-center bg-purple-50 rounded-xl p-4 col-span-2 md:col-span-1">
                  <motion.div
                    className="text-2xl font-bold text-purple-600"
                    key={age.seconds}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {age.seconds.toLocaleString()}
                  </motion.div>
                  <div className="text-sm text-gray-600">Seconds</div>
                </div>
              </div>

              {/* Fun Facts */}
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Star className="mr-2 text-yellow-500" size={24} />
                  Amazing Facts About Your Age!
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p>🎂 You&apos;ve had {age.years} birthdays!</p>
                  <p>🌅 You&apos;ve seen approximately {Math.floor(age.days).toLocaleString()} sunrises!</p>
                  <p>💓 Your heart has beaten about {Math.floor(age.seconds * 1.2).toLocaleString()} times!</p>
                  <p>😴 You&apos;ve slept for roughly {Math.floor(age.days / 3).toLocaleString()} days!</p>
                </div>
              </div>

              {/* Share Button */}
              <motion.button
                onClick={shareAge}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-lg rounded-2xl hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Share2 className="mr-2" size={24} />
                Share My Age! 📱
              </motion.button>

              {/* Viral Components */}
              <div className="space-y-6 mt-6">
                <ShareableAgeCard age={age} birthDate={birthDate} />
                <BirthYearFacts birthYear={new Date(birthDate).getFullYear()} />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Coming Soon Teasers */}
        {!isCalculated && (
          <motion.div
            className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Gift className="mx-auto mb-4 text-purple-500" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Celebrity Age Twins</h3>
              <p className="text-gray-600">Find out which celebrities are your exact age!</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Calendar className="mx-auto mb-4 text-pink-500" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Your Birth Year</h3>
              <p className="text-gray-600">Discover what happened when you were born!</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Star className="mx-auto mb-4 text-yellow-500" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Age Milestones</h3>
              <p className="text-gray-600">Track and celebrate your life milestones!</p>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-white/80">
        <p>&copy; 2024 AgeMath.com - Calculate your age precisely</p>
      </footer>
    </div>
  )
}