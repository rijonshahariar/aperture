import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hoverCard'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Linkedin } from 'lucide-react'

import Link from 'next/link'

interface ContributorProps {
  nickname: string
  name: string
  role: string
  img: string
  linkedin: string
  github: string
}

export function Contributor({ nickname, name, role, img, linkedin, github }: ContributorProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">{nickname}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <div className="flex justify-between gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={img} />
            <AvatarFallback>{nickname}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h4 className="mb-2 text-sm font-semibold">{name}</h4>
            <p className="text-muted-foreground text-sm">{role}</p>
            <div className="mt-2 flex w-full justify-center gap-4">
              <Link href={github} target="_blank" rel="noopener noreferrer">
                <SiGithub className="hover:text-muted-foreground h-6 w-6 transition-all duration-50 ease-linear" />
              </Link>
              <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="hover:text-muted-foreground h-6 w-6 transition-all duration-50 ease-linear" />
              </Link>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
