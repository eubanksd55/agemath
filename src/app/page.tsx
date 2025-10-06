'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Share2, Minus } from 'lucide-react'
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
      const text = `${age.years} years, ${age.days.toLocaleString()} days. Simple. Precise. AgeMath.com`
      if (navigator.share) {
        navigator.share({ text, url: window.location.href })
      } else {
        navigator.clipboard.writeText(text)
        alert('Copied.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Minimalist Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-2xl font-light text-gray-900 tracking-wide">
              AgeMath
            </h1>
            <div className="w-12 h-px bg-gray-300 mx-auto mt-4"></div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            {/* Simple Introduction */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight">
                How old are you?
              </h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md mx-auto">
                Enter your birth date for a precise calculation of your age.
              </p>
            </div>

            {/* Clean Input */}
            <div className="mb-16">
              <div className="max-w-sm mx-auto">
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-4 text-center text-lg border border-gray-200 rounded-none focus:border-gray-400 focus:outline-none transition-colors bg-white text-gray-900"
                    max={format(new Date(), 'yyyy-MM-dd')}
                  />
                </div>

                <motion.button
                  onClick={calculateAge}
                  disabled={!birthDate}
                  className="w-full mt-8 py-4 bg-gray-900 text-white font-medium tracking-wide disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: birthDate ? 1.01 : 1 }}
                  whileTap={{ scale: birthDate ? 0.99 : 1 }}
                >
                  Calculate
                </motion.button>
              </div>
            </div>

            {/* Clean Results */}
            {isCalculated && age && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center"
              >
                {/* Primary Result */}
                <div className="mb-16">
                  <motion.div
                    className="text-8xl md:text-9xl font-extralight text-gray-900 mb-4"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                  >
                    {age.years}
                  </motion.div>
                  <div className="text-lg text-gray-600 font-light tracking-wide">
                    years old
                  </div>
                </div>

                {/* Detailed Numbers */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-900 mb-2">
                      {Math.floor(age.months)}
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                      Months
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-900 mb-2">
                      {age.days.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                      Days
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-900 mb-2">
                      {age.hours.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                      Hours
                    </div>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-2xl font-light text-gray-900 mb-2"
                      key={age.seconds}
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {age.seconds.toLocaleString()}
                    </motion.div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                      Seconds
                    </div>
                  </div>
                </div>

                {/* Simple Insights */}
                <div className="bg-gray-50 p-8 mb-12">
                  <div className="max-w-md mx-auto space-y-6 text-center">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Days lived</span>
                      <span className="font-medium text-gray-900">{age.days.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-px bg-gray-200"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Approximate breaths</span>
                      <span className="font-medium text-gray-900">{Math.floor(age.minutes * 15).toLocaleString()}</span>
                    </div>
                    <div className="w-full h-px bg-gray-200"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Heartbeats</span>
                      <span className="font-medium text-gray-900">{Math.floor(age.seconds * 1.2).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Simple Share */}
                <motion.button
                  onClick={shareAge}
                  className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 className="mr-3" size={18} />
                  Share
                </motion.button>
              </motion.div>
            )}

            {/* Minimal Features Preview */}
            {!isCalculated && (
              <motion.div
                className="grid md:grid-cols-3 gap-12 text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div>
                  <div className="w-8 h-8 border border-gray-300 mx-auto mb-4 flex items-center justify-center">
                    <Minus size={16} className="text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Precise</h3>
                  <p className="text-sm text-gray-600 font-light">
                    Accurate calculations down to the second
                  </p>
                </div>

                <div>
                  <div className="w-8 h-8 border border-gray-300 mx-auto mb-4 flex items-center justify-center">
                    <Minus size={16} className="text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Simple</h3>
                  <p className="text-sm text-gray-600 font-light">
                    Clean interface focused on what matters
                  </p>
                </div>

                <div>
                  <div className="w-8 h-8 border border-gray-300 mx-auto mb-4 flex items-center justify-center">
                    <Minus size={16} className="text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Fast</h3>
                  <p className="text-sm text-gray-600 font-light">
                    Instant results with real-time updates
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-100 mt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-sm text-gray-500 font-light">
              &copy; 2024 AgeMath
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}