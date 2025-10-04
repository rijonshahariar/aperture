'use client'
import { APOD } from '@repo/shared'
import Image from 'next/image'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { ZoomIn, ZoomOut, RotateCcw, Maximize } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { Twitter, Facebook, Share2, Trophy, User, Clock } from 'lucide-react'
import { CommentSection } from '../apodCommentSection'
import { motion } from 'framer-motion'

interface APodInfoProps {
  data: APOD | undefined
  hasController?: boolean
  date?: string
}

  export default function ApodInfo({ data, hasController = false }: Readonly<APodInfoProps>) {
  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false)
  const [userName, setUserName] = useState('')
  const certificateRef = useRef<HTMLDivElement>(null)
  const [showCertificate, setShowCertificate] = useState(false)
  const [quizStep, setQuizStep] = useState(0)
  const [answers, setAnswers] = useState<(string | null)[]>([null, null, null])
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [timer, setTimer] = useState(30)

  // Generate 3 interesting MCQ questions from description
  const description = data?.explanation || ''
  // Extract a key sentence for fill-in-the-blank
  const sentences = description.split('.').map(s => s.trim()).filter(Boolean)
  const mainSentence = sentences[0] || ''
  const mainSubject = mainSentence.split(' ')[2] || 'object'
  // Find a keyword (longest word)
  const words = description.split(/\s+/).filter(w => w.length > 4)
  const keyword = words.sort((a, b) => b.length - a.length)[0] || 'galaxy'
  // Distractors for true fact
  const distractors = [
    `This APOD shows a ${keyword}.`,
    `The image was taken in 1999.`,
    `It is a famous star cluster.`,
    `The subject is Mars.`,
  ]
  // Real fact from description
  const realFact = mainSentence.length > 10 ? mainSentence : `This APOD shows ${mainSubject}.`
  // Fill-in-the-blank
  const blankSentence = mainSentence.replace(mainSubject, '_____')
  // Questions
  const questions = [
    {
      q: `Fill in the blank: ${blankSentence}`,
      options: [mainSubject, keyword, 'galaxy', 'star'],
      correct: mainSubject,
      explanation: `The main subject described is '${mainSubject}'.`,
    },
    {
      q: `Which fact is true about this APOD?`,
      options: [realFact, ...distractors.filter(d => d !== realFact).slice(0,3)],
      correct: realFact,
      explanation: `The true fact is: "${realFact}" (from the description).`,
    },
    {
      q: `What is a keyword from the description?`,
      options: [keyword, 'galaxy', 'star', mainSubject],
      correct: keyword,
      explanation: `The keyword '${keyword}' is found in the description.`,
    },
  ]

  // Timer effect
  useEffect(() => {
    if (!quizStarted) return;
    if (showResult || quizStep > 2) return;
    if (timer <= 0) {
      setShowResult(true);
      return;
    }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, showResult, quizStep, quizStarted]);

  // Reset timer when quiz starts
  useEffect(() => {
    if (quizStarted) setTimer(30);
  }, [quizStarted]);

  // Handle answer
  const handleAnswer = (ans: string) => {
    const correct = questions[quizStep].correct
    setAnswers(prev => {
      const next = [...prev]
      next[quizStep] = ans
      return next
    })
    if (ans === correct) setScore(s => s + 1)
    if (quizStep === 2) {
      setShowResult(true)
      // Show certificate only if all answers are correct
      setTimeout(() => {
        if (score + (ans === correct ? 1 : 0) === questions.length) {
          setShowCertificate(true)
        }
      }, 300)
    } else {
      setQuizStep(s => s + 1)
    }
  }

  const resetQuiz = () => {
    setQuizStep(0)
    setAnswers([null, null, null])
    setScore(0)
    setShowResult(false)
    setShowCertificate(false)
    setTimer(30)
  }
  if (!data) {
    return (
      <div className="h-[60vh] py-8 text-center">
        <h1 className="text-xl text-red-500">No data found!</h1>
        <p className="text-muted-foreground mt-2">Try again later</p>
      </div>
      )
    }

  return (
    <div className="container mx-auto flex flex-col items-center px-4">

      {/* {data.url && (
        <h1 className="mb-5 text-3xl font-bold select-none sm:text-4xl lg:text-5xl">
          {data.title}
        </h1>
      )} */}


      {data.url && (
        <div className="w-full max-w-4xl mb-6">
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={4}
            wheel={{ step: 0.1 }}
            pinch={{ step: 5 }}
            doubleClick={{ mode: 'toggle', step: 0.7 }}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <div className="relative">
                {/* Control buttons */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                  <Button
                    onClick={() => zoomIn()}
                    size="sm"
                    variant="secondary"
                    className="h-10 w-10 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => zoomOut()}
                    size="sm"
                    variant="secondary"
                    className="h-10 w-10 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => resetTransform()}
                    size="sm"
                    variant="secondary"
                    className="h-10 w-10 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => window.open(data.hdurl || data.url, '_blank')}
                    size="sm"
                    variant="secondary"
                    className="h-10 w-10 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>

                {/* Instructions overlay */}
                <div className="absolute bottom-4 left-4 z-10 bg-black/50 text-white text-xs p-2 rounded backdrop-blur-sm">
                  <p>💡 Double-click to zoom • Scroll to zoom • Drag to pan</p>
                </div>

                <TransformComponent
                  wrapperClass="!w-full !h-[70vh] border border-border rounded-xl overflow-hidden bg-muted/20"
                  contentClass="!w-full !h-full flex items-center justify-center"
                >
                  <Image
                    src={data.url}
                    className="max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing"
                    alt={data.title}
                    width={900}
                    height={900}
                    priority
                    draggable={false}
                  />
                </TransformComponent>
              </div>
            )}
          </TransformWrapper>
        </div>
      )}

      {/* Copyright and Social Media Share Section */}
      <div className="mt-6 flex justify-between items-center w-full max-w-4xl">
        {data.copyright && (
          <p className="text-muted-foreground">{`© ${data.copyright}`}</p>
        )}
        
        {/* Social Media Share Section */}
        <div className="flex gap-4 items-center">
          <span className="text-sm font-medium">Share this photo:</span>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(data.url)}&text=${encodeURIComponent(data.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Twitter"
            className="hover:text-blue-500"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
            className="hover:text-blue-700"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(data.title + ' ' + data.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on WhatsApp"
            className="hover:text-green-600"
          >
            <Share2 className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="container mx-auto mt-8 flex flex-col md:px-8 lg:max-w-[900px]">
        <h1 className="mb-4 text-2xl font-bold">{data.title}</h1>
        <p className="text-muted-foreground">{data.explanation}</p>
      </div>

        {/* --- Professional Astronomy Quiz Section --- */}
        <Card className="mt-12 w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex mt-5 items-center justify-center gap-3 text-foreground text-center">
              <span className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Astronomy Quiz
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!quizStarted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-4 space-y-6"
              >
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    Test Your Cosmic Knowledge
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Answer questions about this APOD image and earn your astronomy certificate!
                  </p>
                </div>
                
                <div className="w-full max-w-sm space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Your Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      maxLength={32}
                      className="w-full"
                    />
                  </div>
                  
                  <Button
                    onClick={() => userName.trim() && setQuizStarted(true)}
                    disabled={!userName.trim()}
                    className="w-full"
                    size="lg"
                  >
                    Start Quiz
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Progress Bar */}
                {!showResult && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Progress</span>
                      <span>{quizStep + 1} of {questions.length}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((quizStep + 1) / questions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Timer */}
                {!showResult && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Time Remaining
                      </span>
                      <span className="font-mono">{timer}s</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(timer / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {!showResult ? (
                  <motion.div
                    key={quizStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        Question {quizStep + 1}
                      </h3>
                      <p className="text-muted-foreground">
                        {questions[quizStep].q}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {questions[quizStep].options.filter((opt): opt is string => typeof opt === 'string').map(opt => {
                        const isSelected = answers[quizStep] === opt
                        const isCorrect = opt === questions[quizStep].correct
                        const showResult = !!answers[quizStep]
                        
                        return (
                          <motion.button
                            key={opt}
                            onClick={() => handleAnswer(opt)}
                            disabled={showResult}
                            whileHover={!showResult ? { scale: 1.02 } : {}}
                            whileTap={!showResult ? { scale: 0.98 } : {}}
                            className={`
                              p-4 rounded-lg border-2 text-left transition-all duration-200
                              ${!showResult 
                                ? 'bg-muted/50 hover:bg-muted border-border hover:border-primary/50 cursor-pointer'
                                : isSelected
                                  ? isCorrect
                                    ? 'bg-green-500/20 border-green-500 text-green-700'
                                    : 'bg-red-500/20 border-red-500 text-red-700'
                                  : isCorrect
                                    ? 'bg-green-500/10 border-green-500/50 text-green-600'
                                    : 'bg-muted/30 border-border text-muted-foreground'
                              }
                            `}
                          >
                            <span className="text-sm font-medium">{opt}</span>
                          </motion.button>
                        )
                      })}
                    </div>
                    
                    {answers[quizStep] && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        {answers[quizStep] === questions[quizStep].correct ? (
                          <div className="text-green-600 font-semibold flex items-center justify-center gap-2">
                            <span className="text-xl">🎉</span>
                            Correct!
                          </div>
                        ) : (
                          <div className="text-red-600 font-semibold flex items-center justify-center gap-2">
                            <span className="text-xl">❌</span>
                            <div className="text-center">
                              <div>Incorrect!</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Correct answer: <span className="text-foreground font-medium">{questions[quizStep].correct}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-3 text-2xl font-bold">
                        <Trophy className="h-8 w-8 text-yellow-500" />
                        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                          Quiz Complete!
                        </span>
                      </div>
                      
                      <div className="text-lg font-semibold text-foreground">
                        Score: <span className="text-primary">{score} / {questions.length}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {questions.map((q, i) => (
                        <Card key={i} className="bg-muted/30 border-border/50">
                          <CardContent className="p-4 text-left">
                            <div className="space-y-2">
                              <div className="font-medium text-foreground text-sm">
                                Q{i + 1}: {q.q}
                              </div>
                              <div className="space-y-1 text-xs">
                                <div className={answers[i] === q.correct ? 'text-green-600' : 'text-red-600'}>
                                  Your answer: {answers[i] || 'No answer'}
                                </div>
                                <div className="text-muted-foreground">
                                  Correct: <span className="text-foreground">{q.correct}</span>
                                </div>
                                <div className="text-muted-foreground">
                                  {q.explanation}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <Button onClick={resetQuiz} variant="outline" className="w-full">
                      Try Again
                    </Button>
                  </motion.div>
                )}
                
                {/* Certificate Modal */}
                {showCertificate && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      ref={certificateRef}
                      className="bg-card rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 text-center border border-border"
                    >
                      <div className="space-y-4">
                        <div className="text-3xl">🎓</div>
                        <h3 className="text-xl font-bold text-foreground">
                          Astronomy Quiz Certificate
                        </h3>
                        <div className="space-y-2">
                          <p className="text-muted-foreground">This certifies that</p>
                          <p className="text-2xl font-bold text-primary">
                            {userName || 'Anonymous'}
                          </p>
                          <p className="text-muted-foreground">
                            answered all questions correctly!
                          </p>
                          <p className="text-muted-foreground">
                            Score: <span className="text-green-600 font-semibold">{score} / {questions.length}</span>
                          </p>
                        </div>
                        <Button
                          onClick={() => setShowCertificate(false)}
                          className="w-full"
                        >
                          Close
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

       

      {/* --- Comments & Reactions Section --- */}
      <CommentSection apodId={data?.date || ''} />

      {hasController && (
        <div className="mt-8">
          <button className="btn">Previous</button>
          <button className="btn">Next</button>
        </div>
      )}
    </div>
  )
}
