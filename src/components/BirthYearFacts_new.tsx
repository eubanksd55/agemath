'use client'

import { motion } from 'framer-motion'
import { Calendar, Music, Film, Globe, DollarSign } from 'lucide-react'

interface BirthYearFactsProps {
  birthYear: number
  userName?: string
}

export default function BirthYearFacts({ birthYear, userName }: BirthYearFactsProps) {
  // Sample data - in a real app, this would come from APIs or a database
  const getFactsForYear = (year: number) => {
    const facts = {
      worldPopulation: Math.floor(3000000000 + (year - 1960) * 75000000),
      gasPrice: year < 1970 ? '$0.36' : year < 1980 ? '$0.86' : year < 1990 ? '$1.19' : year < 2000 ? '$1.22' : year < 2010 ? '$2.79' : '$3.52',
      movieTicket: year < 1970 ? '$1.55' : year < 1980 ? '$2.23' : year < 1990 ? '$4.23' : year < 2000 ? '$5.39' : year < 2010 ? '$7.18' : '$8.95',
      topSong: getTopSong(year),
      topMovie: getTopMovie(year),
      majorEvent: getMajorEvent(year),
      technology: getTechnology(year)
    }
    return facts
  }

  const getTopSong = (year: number): string => {
    const songs: { [key: number]: string } = {
      1990: '"Nothing Compares 2 U" by Sinéad O\'Connor',
      1995: '"Waterfalls" by TLC',
      2000: '"Breathe" by Faith Hill',
      2005: '"Hollaback Girl" by Gwen Stefani',
      2010: '"Tik ToK" by Kesha',
      2015: '"Uptown Funk" by Mark Ronson ft. Bruno Mars',
      2020: '"Blinding Lights" by The Weeknd'
    }

    // Find closest year
    const years = Object.keys(songs).map(Number).sort((a, b) => Math.abs(year - a) - Math.abs(year - b))
    return songs[years[0]] || `Popular music from ${year}`
  }

  const getTopMovie = (year: number): string => {
    const movies: { [key: number]: string } = {
      1990: 'Home Alone',
      1995: 'Batman Forever',
      2000: 'How the Grinch Stole Christmas',
      2005: 'Star Wars: Episode III',
      2010: 'Toy Story 3',
      2015: 'Star Wars: The Force Awakens',
      2020: 'Bad Boys for Life'
    }

    const years = Object.keys(movies).map(Number).sort((a, b) => Math.abs(year - a) - Math.abs(year - b))
    return movies[years[0]] || `Popular movies from ${year}`
  }

  const getMajorEvent = (year: number): string => {
    const events: { [key: number]: string } = {
      1969: 'Moon Landing',
      1989: 'Fall of Berlin Wall',
      1991: 'World Wide Web invented',
      2001: 'Wikipedia launched',
      2004: 'Facebook founded',
      2007: 'iPhone released',
      2020: 'COVID-19 pandemic began'
    }

    const years = Object.keys(events).map(Number).sort((a, b) => Math.abs(year - a) - Math.abs(year - b))
    return events[years[0]] || `Historical events from ${year}`
  }

  const getTechnology = (year: number): string => {
    if (year < 1970) return 'Color TV was becoming popular'
    if (year < 1980) return 'Personal computers were emerging'
    if (year < 1990) return 'Video games were revolutionizing entertainment'
    if (year < 2000) return 'The Internet was changing the world'
    if (year < 2010) return 'Social media was connecting everyone'
    return 'Smartphones were transforming daily life'
  }

  const facts = getFactsForYear(birthYear)

  const factItems = [
    {
      icon: Globe,
      title: 'World Population',
      value: facts.worldPopulation.toLocaleString(),
      description: 'People on Earth'
    },
    {
      icon: DollarSign,
      title: 'Gas Price',
      value: facts.gasPrice,
      description: 'Average per gallon'
    },
    {
      icon: Film,
      title: 'Movie Ticket',
      value: facts.movieTicket,
      description: 'Average price'
    },
    {
      icon: Music,
      title: 'Top Song',
      value: facts.topSong,
      description: 'Popular hit'
    },
    {
      icon: Film,
      title: 'Top Movie',
      value: facts.topMovie,
      description: 'Box office hit'
    },
    {
      icon: Calendar,
      title: 'Major Event',
      value: facts.majorEvent,
      description: 'World changing moment'
    }
  ]

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          The World in {birthYear} 🌍
        </h3>
        <p className="text-gray-600">
          What was happening when you were born?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {factItems.map((fact, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                <fact.icon className="text-blue-600" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 text-sm mb-1">
                  {fact.title}
                </h4>
                <p className="text-blue-600 font-bold text-sm mb-1 break-words">
                  {fact.value}
                </p>
                <p className="text-gray-500 text-xs">
                  {fact.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100">
        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Globe className="text-indigo-600" size={18} />
          Technology Spotlight
        </h4>
        <p className="text-gray-700 text-sm">
          {facts.technology}
        </p>
      </div>

      <div className="mt-4 text-center">
        <motion.button
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const text = `The world in ${birthYear}:\n• Population: ${facts.worldPopulation.toLocaleString()}\n• Gas: ${facts.gasPrice}\n• Movie ticket: ${facts.movieTicket}\n• Top song: ${facts.topSong}\n\nFind out about your birth year at AgeMath.com! 🌍`

            if (navigator.share) {
              navigator.share({ title: `The World in ${birthYear}`, text, url: window.location.href })
            } else {
              navigator.clipboard.writeText(text)
              alert('Copied birth year facts to clipboard! 📋')
            }
          }}
        >
          Share These Facts ✨
        </motion.button>
      </div>
    </motion.div>
  )
}