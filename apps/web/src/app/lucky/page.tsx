'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Sparkles, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { APOD, ApodService } from '@repo/shared'
import { nasaApiKey } from '@/constants/api'

const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
]

const days = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1).padStart(2, '0'),
  label: String(i + 1),
}))

// Years from 1995 (when APOD started) to current year
const currentYear = new Date().getFullYear()
const years = Array.from({ length: currentYear - 1994 }, (_, i) => ({
  value: String(currentYear - i),
  label: String(currentYear - i),
}))

// Zodiac sign function
const getZodiacSign = (month: string, day: string): string => {
  const m = parseInt(month)
  const d = parseInt(day)
  
  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'Aries'
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'Taurus'
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 'Gemini'
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 'Cancer'
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'Leo'
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'Virgo'
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 'Libra'
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 'Scorpio'
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return 'Sagittarius'
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 'Capricorn'
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'Aquarius'
  return 'Pisces'
}

export default function LuckyPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [selectedDay, setSelectedDay] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [apodData, setApodData] = useState<APOD | null>(null)
  const [error, setError] = useState<string>('')

  const handleDiscoverClick = async () => {
    if (!selectedMonth || !selectedDay || !selectedYear) return

    setIsLoading(true)
    setError('')
    
    try {
      const apodService = new ApodService(nasaApiKey)
      
      // Create the exact birthdate string
      const birthdateString = `${selectedYear}-${selectedMonth}-${selectedDay}`
      
      try {
        const data = await apodService.getByDate(birthdateString)
        if (data) {
          setApodData(data)
        } else {
          setError('Sorry, No images found on your birthday')
        }
      } catch (err) {
        setError('Sorry, No images found on your birthday')
      }
    } catch (err) {
      setError('Failed to fetch your birthday image. Please try again.')
    }
    
    setIsLoading(false)
  }

  const handleReset = () => {
    setApodData(null)
    setError('')
    setSelectedMonth('')
    setSelectedDay('')
    setSelectedYear('')
  }

  const isFormValid = selectedMonth && selectedDay && selectedYear
  const zodiacSign = selectedMonth && selectedDay ? getZodiacSign(selectedMonth, selectedDay) : ''
  const monthName = selectedMonth ? months.find(m => m.value === selectedMonth)?.label : ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 pt-24 pb-12">
        {!apodData && !error ? (
          // Birthday selection form
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6"
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                What Did Hubble See on Your Birthday?
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Hubble Space Telescope has been capturing awe-inspiring images of the cosmos since its launch in 1990. 
                Enter your exact birth date to see what cosmic wonder was captured on your special day!
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="bg-card/50 p-4 backdrop-blur-sm border-border/50">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <Calendar className="w-6 h-6 text-primary" />
                    Select Your Birth Date
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2 mx-auto">
                      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="h-12 w-full">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 mx-auto">
                      <Select value={selectedDay} onValueChange={setSelectedDay}>
                        <SelectTrigger className="h-12 w-full">
                          <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent>
                          {days.map((day) => (
                            <SelectItem key={day.value} value={day.value}>
                              {day.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 mx-auto">
                      <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="h-12 w-full">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {years.map((year) => (
                            <SelectItem key={year.value} value={year.value}>
                              {year.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {error && (
                    <div className="text-center text-red-500 text-sm">
                      {error}
                    </div>
                  )}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isFormValid ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      onClick={handleDiscoverClick}
                      disabled={!isFormValid || isLoading}
                      size="lg"
                      className="w-full h-12 text-base font-semibold"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Discovering...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Discover My Cosmic Birthday
                        </div>
                      )}
                    </Button>
                  </motion.div>

                  {/* {selectedMonth && selectedDay && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-sm text-muted-foreground"
                    >
                      You selected: {months.find(m => m.value === selectedMonth)?.label} {selectedDay}
                      {zodiacSign && <span className="block mt-1">♦ {zodiacSign} ♦</span>}
                    </motion.div>
                  )} */}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-muted-foreground">
                🌟 Each day brings a new cosmic discovery. Your birthday holds a special view of the universe!
              </p>
            </motion.div>
          </motion.div>
        ) : error ? (
          // Error Display
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mb-8">
              <Button
                onClick={handleReset}
                variant="outline"
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Try Another Date
              </Button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-6"
              >
                <Calendar className="w-8 h-8 text-red-500" />
              </motion.div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-red-500">
                {error}
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                NASA's APOD archive doesn't have an image for {monthName} {parseInt(selectedDay)}, {selectedYear}. 
                This could be due to weekends, holidays, or technical issues on that date.
              </p>

              {zodiacSign && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6"
                >
                  <p className="text-lg text-primary font-semibold">
                    But hey, {zodiacSign}! ✨ Try a different date nearby.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : apodData ? (
          // APOD Result Display
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8 text-center">
              <Button
                onClick={handleReset}
                variant="outline"
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Try Another Date
              </Button>

              {zodiacSign && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <p className="text-lg text-primary font-semibold">
                    Hello, {zodiacSign}! ✨
                  </p>
                </motion.div>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
              >
                On {monthName} {parseInt(selectedDay)}, {selectedYear}
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50">
                <div className="relative">
                  <div className="aspect-video relative">
                    <Image
                      src={apodData.url}
                      alt={apodData.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Overlay content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        {apodData.title}
                      </h2>
                      <p className="text-sm md:text-base opacity-90 mb-2">
                        {apodData.date}
                      </p>
                      <p className="text-sm md:text-base opacity-90 overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {apodData.explanation}
                      </p>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Full Description</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {apodData.explanation}
                      </p>
                    </div>
                    
                    {apodData.copyright && (
                      <div>
                        <h4 className="text-sm font-semibold mb-1">Copyright</h4>
                        <p className="text-sm text-muted-foreground">{apodData.copyright}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-4">
                      {apodData.hdurl && (
                        <Button asChild variant="default">
                          <a href={apodData.hdurl} target="_blank" rel="noopener noreferrer">
                            View HD Image
                          </a>
                        </Button>
                      )}
                      <Button asChild variant="outline">
                        <a href={apodData.url} target="_blank" rel="noopener noreferrer">
                          Open Original
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}
