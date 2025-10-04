'use client'
import { APOD } from '@repo/shared'
import Image from 'next/image'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { ZoomIn, ZoomOut, RotateCcw, Maximize } from 'lucide-react'
import { Button } from '../ui/button'
import { useState, useEffect } from 'react'
import { useRef } from 'react'
import html2canvas from 'html2canvas'
import { Twitter, Facebook, Share2 } from 'lucide-react'
import { CommentSection } from '../apodCommentSection'

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

      {data.copyright && <p className="text-muted-foreground mt-4">{`© ${data.copyright}`}</p>}

      <div className="container mx-auto mt-8 flex flex-col md:px-8 lg:max-w-[900px]">
        <h1 className="mb-4 text-2xl font-bold">{data.title}</h1>
        <p className="text-muted-foreground">{data.explanation}</p>
      </div>

        {/* --- Professional Astronomy Quiz Section --- */}
        <div className="mt-8 w-full max-w-xl mx-auto rounded-3xl p-8 shadow-2xl border-2 border-blue-200 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #e0e7ff 0%, #fdf6e3 50%, #c7d2fe 100%)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            backdropFilter: 'blur(8px)',
          }}>
          {!quizStarted ? (
            <div className="flex flex-col items-center justify-center py-12">
              <h2 className="text-3xl font-extrabold mb-6 text-blue-800 flex items-center gap-3 drop-shadow-lg">
                <span>🧑‍🚀</span> <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-pink-400 bg-clip-text text-transparent">Astronomy Quiz</span>
              </h2>
              <input
                type="text"
                placeholder="Enter your name"
                className="mb-6 px-6 py-3 rounded-xl border-2 border-blue-200 text-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                maxLength={32}
              />
              <button
                className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-8 py-4 rounded-2xl text-2xl font-bold shadow-lg hover:scale-105 transition-all"
                onClick={() => userName.trim() && setQuizStarted(true)}
                disabled={!userName.trim()}
              >
                Start Quiz
              </button>
            </div>
          ) : (
            <>
              {/* Progress Bar */}
              {!showResult && (
                <div className="absolute top-0 left-0 w-full h-2 bg-blue-200 rounded-t-3xl">
                  <div style={{ width: `${((quizStep+1)/questions.length)*100}%` }} className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-t-3xl transition-all duration-500"></div>
                </div>
              )}
              {/* Timer Bar */}
              {!showResult && (
                <div className="w-full h-3 bg-gray-200 rounded-full my-4">
                  <div style={{ width: `${(timer/30)*100}%` }} className="h-full bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full transition-all duration-500"></div>
                </div>
              )}
              <h2 className="text-3xl font-extrabold mb-6 text-blue-800 flex items-center gap-3 drop-shadow-lg">
                <span>🧑‍🚀</span> <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-pink-400 bg-clip-text text-transparent">Astronomy Quiz</span>
              </h2>
              {!showResult ? (
                <div>
                  <div className="mb-6 text-xl font-bold text-blue-900 text-center drop-shadow">Question {quizStep+1} of {questions.length}</div>
                  <div className="mb-6 text-lg font-semibold text-gray-700 text-center drop-shadow-sm">{questions[quizStep].q}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {questions[quizStep].options.filter((opt): opt is string => typeof opt === 'string').map(opt => {
                      const isSelected = answers[quizStep] === opt
                      return (
                        <button
                          key={opt}
                          onClick={() => handleAnswer(opt)}
                          disabled={!!answers[quizStep]}
                          className={`w-full py-4 px-2 rounded-xl text-lg font-bold shadow-md border-2 transition-all duration-200
                            ${isSelected ? (opt === questions[quizStep].correct ? 'bg-gradient-to-r from-green-400 to-blue-400 border-green-500 scale-105 text-white' : 'bg-gradient-to-r from-red-300 to-pink-200 border-red-400 shake text-white') : 'bg-white hover:bg-blue-50 border-blue-200 text-blue-900'}
                            ${!!answers[quizStep] ? 'cursor-default' : 'cursor-pointer'}
                          `}
                          style={{ minHeight: '56px', letterSpacing: '0.02em' }}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                  {answers[quizStep] && (
                    <div className="mt-6 text-center">
                      {answers[quizStep] === questions[quizStep].correct ? (
                        <span className="text-green-600 text-2xl font-extrabold animate-bounce drop-shadow">🎉 Correct!</span>
                      ) : (
                        <span className="text-red-600 text-2xl font-extrabold animate-shake drop-shadow">❌ Incorrect!<br/>Correct answer: <b className="text-blue-700">{questions[quizStep].correct}</b></span>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-2 text-center">
                  <div className="mb-6 text-4xl font-extrabold text-yellow-600 flex items-center justify-center gap-3 drop-shadow-lg">
                    <span>🏆</span> <span className="bg-gradient-to-r from-yellow-500 via-pink-400 to-blue-400 bg-clip-text text-transparent">Quiz Result</span>
                  </div>
                  <div className="mb-4 text-2xl font-bold text-blue-900">Score: <span className="text-pink-700">{score} / {questions.length}</span></div>
                  <ul className="mb-6 text-base">
                    {questions.map((q, i) => (
                      <li key={i} className="mb-4 p-4 rounded-xl bg-gradient-to-r from-white via-blue-50 to-pink-50 border-2 border-blue-100 shadow">
                        <div className="font-bold mb-1 text-blue-800">Q{i+1}: {q.q}</div>
                        <div>
                          <span className={answers[i] === q.correct ? 'text-green-700 font-bold' : 'text-red-700 font-bold'}>
                            Your answer: {answers[i] || 'No answer'}
                          </span>
                          <span className="ml-2 text-blue-700">Correct: <b>{q.correct}</b></span>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">Explanation: {q.explanation}</div>
                      </li>
                    ))}
                  </ul>
                  <button onClick={resetQuiz} className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-8 py-3 rounded-xl text-lg font-bold shadow-lg hover:scale-105 transition-all">Try Again</button>
                </div>
              )}
              {/* Confetti animation for perfect score */}
              {showCertificate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <div ref={certificateRef} className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border-2 border-blue-200 relative">
                    <h3 className="text-2xl font-bold mb-4 text-blue-700">🎓 Astronomy Quiz Certificate</h3>
                    <div className="mb-6">
                      <div className="text-lg text-gray-700 mb-2">This certifies that</div>
                      <div className="text-3xl font-extrabold text-blue-800 mb-2">{userName || 'Anonymous'}</div>
                      <div className="text-lg text-gray-700 mb-2">answered all questions correctly!</div>
                      <div className="text-lg text-gray-700 mb-2">Score: <span className="text-green-700 font-bold">{score} / {questions.length}</span></div>
                      <div className="mt-4 text-base text-indigo-700">Share your achievement!</div>
                    </div>
                    <button
                      className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-6 py-2 rounded-xl font-bold shadow hover:scale-105 transition-all"
                      type="button"
                      onClick={() => setShowCertificate(false)}
                    >Close</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* --- Social Media Share Section --- */}
        <div className="mt-6 flex gap-4 items-center justify-center">
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
