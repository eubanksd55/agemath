'use client'

import { motion } from 'framer-motion'
import { Download, Share2 } from 'lucide-react'
import { useRef } from 'react'

interface ShareableAgeCardProps {
  age: {
    years: number
    months: number
    days: number
    hours: number
    minutes: number
    seconds: number
  }
  birthDate: string
  userName?: string
}

export default function ShareableAgeCard({ age, birthDate, userName }: ShareableAgeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const downloadCard = async () => {
    if (!cardRef.current) return

    try {
      // Using html2canvas would be ideal here, but for now we'll use a simple approach
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) return

      canvas.width = 600
      canvas.height = 800

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 600, 800)
      gradient.addColorStop(0, '#8B5CF6')
      gradient.addColorStop(0.5, '#EC4899')
      gradient.addColorStop(1, '#EF4444')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 600, 800)

      // Add white card background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
      ctx.roundRect(40, 80, 520, 640, 20)
      ctx.fill()

      // Add text
      ctx.fillStyle = '#1F2937'
      ctx.font = 'bold 48px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('AgeMath', 300, 160)

      // Add name if provided
      if (userName) {
        ctx.font = 'bold 36px Arial'
        ctx.fillStyle = '#6B7280'
        ctx.fillText(userName, 300, 210)
      }

      ctx.font = 'bold 72px Arial'
      ctx.fillStyle = '#8B5CF6'
      ctx.fillText(age.years.toString(), 300, userName ? 300 : 280)

      ctx.font = '32px Arial'
      ctx.fillStyle = '#6B7280'
      ctx.fillText('Years Old!', 300, userName ? 340 : 320)

      ctx.font = '24px Arial'
      ctx.fillStyle = '#374151'
      const yOffset = userName ? 40 : 0
      ctx.fillText(`That&apos;s ${age.days.toLocaleString()} days of amazing life!`, 300, 420 + yOffset)
      ctx.fillText(`${age.hours.toLocaleString()} hours of experiences!`, 300, 460 + yOffset)
      ctx.fillText(`${age.minutes.toLocaleString()} minutes of memories!`, 300, 500 + yOffset)

      ctx.font = '20px Arial'
      ctx.fillStyle = '#9CA3AF'
      ctx.fillText('Calculate your age at AgeMath.com', 300, 600 + yOffset)

      // Create download link
      const link = document.createElement('a')
      link.download = `${userName ? userName.replace(/\s+/g, '-').toLowerCase() : 'my'}-age-${age.years}-years.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error('Error generating image:', error)
      alert('Could not generate image. Please try sharing text instead!')
    }
  }

  const shareText = () => {
    const displayName = userName || 'I'
    const pronoun = userName ? 'is' : 'am'
    const possessive = userName ? `${userName}&apos;s` : 'My'

    const text = `${displayName} ${pronoun} ${age.years} years old! 🎂\n\nThat&apos;s:\n• ${age.days.toLocaleString()} days of life\n• ${age.hours.toLocaleString()} hours of experiences\n• ${age.minutes.toLocaleString()} minutes of memories\n\nCalculate your age at AgeMath.com! ✨`

    if (navigator.share) {
      navigator.share({
        title: `${possessive} Age Calculation - AgeMath`,
        text: text,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(text + `\n\n${window.location.href}`)
      alert('Copied to clipboard! Paste it anywhere to share 📋')
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <div className="mb-4">
          {userName && (
            <div className="text-2xl font-bold text-gray-800 mb-2">
              🎉 {userName}&apos;s Age Card
            </div>
          )}
          <div className="text-4xl font-bold text-purple-600 mb-2">{age.years}</div>
          <div className="text-lg text-gray-600">Years Amazing!</div>
        </div>

        <div className="space-y-2 text-sm text-gray-700 mb-6">
          <p>🎂 {age.days.toLocaleString()} days of incredible life</p>
          <p>⏰ {age.hours.toLocaleString()} hours of experiences</p>
          <p>✨ {age.minutes.toLocaleString()} minutes of memories</p>
          <p>💫 {age.seconds.toLocaleString()} seconds of being awesome</p>
        </div>

        <div className="flex gap-3">
          <motion.button
            onClick={shareText}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-600 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Share2 size={18} />
            Share {userName ? `${userName}&apos;s` : 'My'} Age
          </motion.button>

          <motion.button
            onClick={downloadCard}
            className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-green-600 hover:to-teal-600 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={18} />
            Download
          </motion.button>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          {userName ? `${userName}&apos;s age calculated` : 'Generated'} at AgeMath.com ✨
        </div>
      </div>
    </motion.div>
  )
}