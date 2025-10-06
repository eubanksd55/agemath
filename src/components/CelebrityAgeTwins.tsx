'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface CelebrityAgeTwinsProps {
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

interface Celebrity {
  name: string
  profession: string
  birthDate: string
  fun_fact: string
}

export default function CelebrityAgeTwins({ age, userName }: CelebrityAgeTwinsProps) {
  // Celebrity database with birth dates - in a real app this would be from an API
  const celebrities: Celebrity[] = [
    { name: "Taylor Swift", profession: "Singer", birthDate: "1989-12-13", fun_fact: "Has won 12 Grammy Awards" },
    { name: "Leonardo DiCaprio", profession: "Actor", birthDate: "1974-11-11", fun_fact: "Won Oscar for The Revenant" },
    { name: "Emma Stone", profession: "Actress", birthDate: "1988-11-06", fun_fact: "Won Oscar for La La Land" },
    { name: "Ryan Gosling", profession: "Actor", birthDate: "1980-11-12", fun_fact: "Started in Disney's Mickey Mouse Club" },
    { name: "Jennifer Lawrence", profession: "Actress", birthDate: "1990-08-15", fun_fact: "Youngest Best Actress Oscar winner" },
    { name: "Chris Evans", profession: "Actor", birthDate: "1981-06-13", fun_fact: "Captain America in Marvel films" },
    { name: "Scarlett Johansson", profession: "Actress", birthDate: "1984-11-22", fun_fact: "Black Widow in Marvel films" },
    { name: "Ryan Reynolds", profession: "Actor", birthDate: "1976-10-23", fun_fact: "Married to Blake Lively" },
    { name: "Anne Hathaway", profession: "Actress", birthDate: "1982-11-12", fun_fact: "Won Oscar for Les Misérables" },
    { name: "Matt Damon", profession: "Actor", birthDate: "1970-10-08", fun_fact: "Co-wrote Good Will Hunting" },
    { name: "Brad Pitt", profession: "Actor", birthDate: "1963-12-18", fun_fact: "Won Oscar for Once Upon a Time in Hollywood" },
    { name: "Angelina Jolie", profession: "Actress", birthDate: "1975-06-04", fun_fact: "UN Goodwill Ambassador" },
    { name: "Will Smith", profession: "Actor", birthDate: "1968-09-25", fun_fact: "Started as rapper Fresh Prince" },
    { name: "Tom Cruise", profession: "Actor", birthDate: "1962-07-03", fun_fact: "Does his own stunts" },
    { name: "Johnny Depp", profession: "Actor", birthDate: "1963-06-09", fun_fact: "Captain Jack Sparrow in Pirates" },
    { name: "Robert Downey Jr.", profession: "Actor", birthDate: "1965-04-04", fun_fact: "Iron Man in Marvel films" },
    { name: "Mark Wahlberg", profession: "Actor", birthDate: "1971-06-05", fun_fact: "Former rapper Marky Mark" },
    { name: "Keanu Reeves", profession: "Actor", birthDate: "1964-09-02", fun_fact: "Neo in The Matrix" },
    { name: "Sandra Bullock", profession: "Actress", birthDate: "1964-07-26", fun_fact: "Won Oscar for The Blind Side" },
    { name: "Julia Roberts", profession: "Actress", birthDate: "1967-10-28", fun_fact: "Pretty Woman star" },
    { name: "Denzel Washington", profession: "Actor", birthDate: "1954-12-28", fun_fact: "Two-time Oscar winner" },
    { name: "Morgan Freeman", profession: "Actor", birthDate: "1937-06-01", fun_fact: "Iconic narrator voice" },
    { name: "Samuel L. Jackson", profession: "Actor", birthDate: "1948-12-21", fun_fact: "Highest-grossing actor of all time" },
    { name: "Harrison Ford", profession: "Actor", birthDate: "1942-07-13", fun_fact: "Han Solo and Indiana Jones" },
    { name: "Tom Hanks", profession: "Actor", birthDate: "1956-07-09", fun_fact: "Two-time Best Actor Oscar winner" },
    { name: "Meryl Streep", profession: "Actress", birthDate: "1949-06-22", fun_fact: "Most Oscar-nominated actress" },
    { name: "Oprah Winfrey", profession: "Media Mogul", birthDate: "1954-01-29", fun_fact: "First Black female billionaire" },
    { name: "Ellen DeGeneres", profession: "TV Host", birthDate: "1958-01-26", fun_fact: "Emmy Award-winning talk show host" },
    { name: "Jimmy Fallon", profession: "TV Host", birthDate: "1974-09-19", fun_fact: "Former Saturday Night Live star" },
    { name: "Stephen Colbert", profession: "TV Host", birthDate: "1964-05-13", fun_fact: "Host of The Late Show" },
    { name: "Beyoncé", profession: "Singer", birthDate: "1981-09-04", fun_fact: "28-time Grammy winner" },
    { name: "Rihanna", profession: "Singer", birthDate: "1988-02-20", fun_fact: "Billionaire entrepreneur" },
    { name: "Lady Gaga", profession: "Singer", birthDate: "1986-03-28", fun_fact: "Won Oscar for A Star is Born" },
    { name: "Justin Timberlake", profession: "Singer", birthDate: "1981-01-31", fun_fact: "Former NSYNC member" },
    { name: "Bruno Mars", profession: "Singer", birthDate: "1985-10-08", fun_fact: "15-time Grammy winner" },
    { name: "Ed Sheeran", profession: "Singer", birthDate: "1991-02-17", fun_fact: "Sold over 150 million records" },
    { name: "Adele", profession: "Singer", birthDate: "1988-05-05", fun_fact: "15-time Grammy winner" },
    { name: "John Legend", profession: "Singer", birthDate: "1979-12-28", fun_fact: "EGOT winner" },
    { name: "Alicia Keys", profession: "Singer", birthDate: "1981-01-25", fun_fact: "15-time Grammy winner" },
    { name: "Justin Bieber", profession: "Singer", birthDate: "1994-03-01", fun_fact: "YouTube discovered star" },
    { name: "Ariana Grande", profession: "Singer", birthDate: "1993-06-26", fun_fact: "Former Nickelodeon star" },
    { name: "Selena Gomez", profession: "Singer/Actress", birthDate: "1992-07-22", fun_fact: "Former Disney Channel star" },
    { name: "Dua Lipa", profession: "Singer", birthDate: "1995-08-22", fun_fact: "6-time Grammy winner" },
    { name: "The Weeknd", profession: "Singer", birthDate: "1990-02-16", fun_fact: "Real name is Abel Tesfaye" },
    { name: "Drake", profession: "Rapper", birthDate: "1986-10-24", fun_fact: "Former Degrassi actor" },
    { name: "Kanye West", profession: "Rapper", birthDate: "1977-06-08", fun_fact: "24-time Grammy winner" },
    { name: "Jay-Z", profession: "Rapper", birthDate: "1969-12-04", fun_fact: "First billionaire rapper" },
    { name: "Eminem", profession: "Rapper", birthDate: "1972-10-17", fun_fact: "Best-selling rapper of all time" },
    { name: "Kendrick Lamar", profession: "Rapper", birthDate: "1987-06-17", fun_fact: "Pulitzer Prize winner" },
    { name: "Cardi B", profession: "Rapper", birthDate: "1992-10-11", fun_fact: "Grammy-winning reality TV star" },
    { name: "Nicki Minaj", profession: "Rapper", birthDate: "1982-12-08", fun_fact: "Queen of Rap" }
  ]

  // Calculate age twins (within 1 year)
  const getAgeTwins = () => {
    const currentYear = new Date().getFullYear()
    const userBirthYear = currentYear - age.years

    return celebrities.filter(celebrity => {
      const celebBirthYear = new Date(celebrity.birthDate).getFullYear()
      return Math.abs(celebBirthYear - userBirthYear) <= 1
    }).slice(0, 6) // Show max 6 matches
  }

  const ageTwins = getAgeTwins()

  if (ageTwins.length === 0) {
    return (
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <Star className="mx-auto mb-4 text-yellow-500" size={48} />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            🌟 {userName ? `${userName}'s ` : ''}Celebrity Age Twins
          </h3>
          <p className="text-gray-600">
            No exact celebrity matches found for your age, but you're unique!
            Try checking back as we add more celebrities to our database.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <Star className="mx-auto mb-4 text-yellow-500" size={48} />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          🌟 {userName ? `${userName}'s ` : ''}Celebrity Age Twins
        </h3>
        <p className="text-gray-600">
          {userName ? `${userName}, you share` : 'You share'} your age (within a year) with these famous people!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ageTwins.map((celebrity, index) => (
          <motion.div
            key={celebrity.name}
            className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <h4 className="font-bold text-gray-800 text-lg">{celebrity.name}</h4>
            <p className="text-purple-600 font-medium">{celebrity.profession}</p>
            <p className="text-sm text-gray-600 mt-2">{celebrity.fun_fact}</p>
            <div className="mt-3 text-xs text-gray-500">
              Born: {new Date(celebrity.birthDate).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          🎭 Fun fact: {userName ? `${userName}, you're` : "YouYou'reapos;re"} in great company!
          These celebrities are making waves just like you could be! ✨
        </p>
      </div>
    </motion.div>
  )
}