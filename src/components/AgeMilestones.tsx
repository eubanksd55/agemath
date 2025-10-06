'use client'

import { motion } from 'framer-motion'
import { Trophy, Target, Gift, Calendar, Star, Heart } from 'lucide-react'

interface AgeMilestonesProps {
  age: {
    years: number
    months: number
    days: number
    hours: number
    minutes: number
    seconds: number
  }
  userName?: string
}

interface Milestone {
  age: number
  title: string
  description: string
  icon: any
  color: string
  achieved: boolean
  daysUntil?: number
}

export default function AgeMilestones({ age, userName }: AgeMilestonesProps) {
  const currentAge = age.years

  // Calculate milestones
  const getMilestones = (): Milestone[] => {
    const milestones = [
      { age: 10, title: "Double Digits!", description: "First time with two numbers", icon: Trophy, color: "text-yellow-500" },
      { age: 13, title: "Teenager", description: "Welcome to the teen years", icon: Star, color: "text-purple-500" },
      { age: 16, title: "Sweet Sixteen", description: "Driving age in many places", icon: Gift, color: "text-pink-500" },
      { age: 18, title: "Legal Adult", description: "Official adulthood begins", icon: Target, color: "text-blue-500" },
      { age: 21, title: "Full Legal Age", description: "All adult privileges unlocked", icon: Trophy, color: "text-green-500" },
      { age: 25, title: "Quarter Century", description: "25 years of life experience", icon: Calendar, color: "text-indigo-500" },
      { age: 30, title: "The Big 3-0", description: "Three decades of wisdom", icon: Star, color: "text-red-500" },
      { age: 35, title: "Mid-Thirties", description: "Prime of your life", icon: Heart, color: "text-rose-500" },
      { age: 40, title: "Life Begins at 40", description: "The fabulous forties", icon: Trophy, color: "text-orange-500" },
      { age: 45, title: "Mid-Life Milestone", description: "Halfway to 90!", icon: Target, color: "text-amber-500" },
      { age: 50, title: "Golden Half-Century", description: "50 years of amazing life", icon: Gift, color: "text-yellow-600" },
      { age: 55, title: "Fabulous Fifties", description: "Wisdom and experience peak", icon: Star, color: "text-purple-600" },
      { age: 60, title: "Diamond Decades", description: "Six decades of life", icon: Calendar, color: "text-blue-600" },
      { age: 65, title: "Retirement Age", description: "Time to enjoy life", icon: Heart, color: "text-green-600" },
      { age: 70, title: "Platinum Years", description: "Seven decades strong", icon: Trophy, color: "text-gray-600" },
      { age: 75, title: "Diamond Jubilee", description: "75 years of memories", icon: Gift, color: "text-pink-600" },
      { age: 80, title: "Octogenarian", description: "Eight amazing decades", icon: Star, color: "text-indigo-600" },
      { age: 90, title: "Nonagenarian", description: "Nine decades of wisdom", icon: Trophy, color: "text-red-600" },
      { age: 100, title: "Centenarian!", description: "A full century of life!", icon: Target, color: "text-yellow-700" }
    ]

    return milestones.map(milestone => ({
      ...milestone,
      achieved: currentAge >= milestone.age,
      daysUntil: currentAge < milestone.age ? Math.ceil((milestone.age - currentAge) * 365.25) : undefined
    }))
  }

  const milestones = getMilestones()
  const recentlyAchieved = milestones.filter(m => m.achieved).slice(-3)
  const upcoming = milestones.filter(m => !m.achieved).slice(0, 3)

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <Trophy className="mx-auto mb-4 text-yellow-500" size={48} />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          🏆 {userName ? `${userName}'s ` : ''}Age Milestones
        </h3>
        <p className="text-gray-600">
          {userName ? `${userName}, track` : 'Track'} your life's amazing achievements and upcoming celebrations!
        </p>
      </div>

      {/* Recently Achieved */}
      {recentlyAchieved.length > 0 && (
        <div className="mb-8">
          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Trophy className="mr-2 text-yellow-500" size={20} />
            🎉 Recently Achieved
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            {recentlyAchieved.map((milestone, index) => {
              const IconComponent = milestone.icon
              return (
                <motion.div
                  key={milestone.age}
                  className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 border-2 border-green-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <IconComponent className={`mx-auto mb-2 ${milestone.color}`} size={32} />
                  <h5 className="font-bold text-gray-800 text-center">{milestone.title}</h5>
                  <p className="text-sm text-gray-600 text-center mt-1">{milestone.description}</p>
                  <div className="text-center mt-2">
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Age {milestone.age} ✓
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Current Age Celebration */}
      <div className="mb-8 text-center">
        <motion.div
          className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-purple-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Star className="mx-auto mb-4 text-purple-500" size={48} />
          <h4 className="text-xl font-bold text-gray-800 mb-2">
            🌟 {userName ? `${userName} is ` : "You're "}Currently {currentAge} Years Old!
          </h4>
          <p className="text-gray-600">
            That's {age.days.toLocaleString()} days, {age.hours.toLocaleString()} hours,
            and {age.seconds.toLocaleString()} seconds of amazing life! 🎂
          </p>
        </motion.div>
      </div>

      {/* Upcoming Milestones */}
      {upcoming.length > 0 && (
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Target className="mr-2 text-blue-500" size={20} />
            🎯 Upcoming Milestones
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            {upcoming.map((milestone, index) => {
              const IconComponent = milestone.icon
              return (
                <motion.div
                  key={milestone.age}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <IconComponent className={`mx-auto mb-2 ${milestone.color}`} size={32} />
                  <h5 className="font-bold text-gray-800 text-center">{milestone.title}</h5>
                  <p className="text-sm text-gray-600 text-center mt-1">{milestone.description}</p>
                  <div className="text-center mt-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      Age {milestone.age}
                    </span>
                    {milestone.daysUntil && (
                      <p className="text-xs text-gray-500 mt-1">
                        ~{milestone.daysUntil.toLocaleString()} days to go
                      </p>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Fun Stats */}
      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
          <p className="text-sm text-gray-600">
            🎊 Fun fact: {userName ? `${userName}, you've` : "You've"} lived through{' '}
            <span className="font-bold text-purple-600">{Math.floor(currentAge / 4)}</span> leap years and{' '}
            <span className="font-bold text-pink-600">{currentAge * 12}</span> birthday months! 🎉
          </p>
        </div>
      </div>
    </motion.div>
  )
}