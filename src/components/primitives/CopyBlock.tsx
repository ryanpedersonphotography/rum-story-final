import { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'
import { Stack } from './Stack'

interface CopyBlockProps {
  eyebrow?: string
  scriptLine?: string
  heading: ReactNode
  lead?: ReactNode
  body?: ReactNode
  align?: 'left' | 'center' | 'right'
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CopyBlock({
  eyebrow,
  scriptLine,
  heading,
  lead,
  body,
  align = 'left',
  gap = 'sm',
  className = '',
}: CopyBlockProps) {
  return (
    <Stack 
      gap={gap} 
      className={`text-${align} ${className}`}
      align={align === 'center' ? 'center' : align === 'right' ? 'end' : 'start'}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      
      <div className="Stack" data-gap="xs">
        {scriptLine && (
          <div className="ty-script">{scriptLine}</div>
        )}
        <h2 className="ty-h2">{heading}</h2>
      </div>

      {lead && <div className="ty-lead">{lead}</div>}
      
      {body && <div className="ty-body">{body}</div>}
    </Stack>
  )
}
