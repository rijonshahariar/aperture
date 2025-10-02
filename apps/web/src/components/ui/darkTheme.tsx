'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

interface DarkModeProps {
  readonly rounded?: boolean
}

export function ModeToggle({ rounded = false }: DarkModeProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const userTheme = localStorage.getItem('theme') || 'dark'
    setTheme(userTheme)
  }, [setTheme])

  if (!mounted) {
    return (
      <Button>
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('cursor-pointer', { 'rounded-full': rounded })}
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}>
      <motion.div
        className="flex items-center justify-center"
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
          type: 'spring',
          bounce: 0.1,
        }}>
        <Sun className="h-[1rem] w-[1rem] dark:hidden" />
        <Moon className="hidden h-[1rem] w-[1rem] dark:block" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
