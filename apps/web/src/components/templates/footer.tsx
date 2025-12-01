'use client'
import { motion, useReducedMotion } from 'motion/react'
import type { ComponentProps, ReactNode } from 'react'
import React from 'react'

import { SiHashnode } from '@icons-pack/react-simple-icons'
import PlanetLogo from '../ui/planetLogo'

interface FooterLink {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface FooterSection {
  label: string
  links: FooterLink[]
}

const footerLinks: FooterSection[] = [
  {
    label: 'Navigation',
    links: [
      { title: 'Picture of The Day', href: '/apod' },
      { title: 'Gallery', href: '/gallery' },
      { title: 'Favorites', href: '/favorites' },
      { title: 'Blog', href: '/blog' },
    ],
  },

  {
    label: 'Legal & Support',
    links: [
      { title: 'About Us', href: '/about' },
      { title: 'Contact Us', href: '/contact' },
      { title: 'Privacy Policy', href: '/privacy' },
      { title: 'Terms & Conditions', href: '/terms' },
    ],
  },
]

export function Footer() {
  return (
      <footer className="relative mx-auto mt-24 w-full max-w-7xl rounded-t-4xl border-t px-4 pt-12 pb-8 select-none shadow-lg lg:px-6 lg:py-16" style={{ background: 'var(--background)' }}>
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer>
          <PlanetLogo size={52}/>
          <p className="text-muted-foreground mt-8 text-sm md:mt-0">
            © {new Date().getFullYear()} Aperture. All rights reserved.
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs">{section.label}</h3>
                <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="hover:text-foreground inline-flex items-center transition-all duration-300">
                        {link.icon && <link.icon className="me-1 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
      {/* <div className="w-full flex justify-center mt-8">
        <span className="text-xs text-gray-400">Made with ❤️ Team DigiExperts for NASA Space Apps Hackathon</span>
      </div> */}
    </footer>
  )
}

type ViewAnimationProps = {
  delay?: number
  className?: ComponentProps<typeof motion.div>['className']
  children: ReactNode
}

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return children
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}>
      {children}
    </motion.div>
  )
}
