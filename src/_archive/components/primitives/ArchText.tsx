import React from 'react'

interface ArchTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  color?: string
}

export function ArchText({ text, className, style, color = 'currentColor' }: ArchTextProps) {
  return (
    <div className={className} style={{ ...style, width: '300px', height: '80px' }}>
      <svg viewBox="0 0 300 80" width="100%" height="100%" style={{ overflow: 'visible' }}>
        {/* Gentle Arch Path - Flattened for subtlety */}
        <path id="arch-curve" d="M 20,80 Q 150,40 280,80" fill="transparent" />
        <text width="300">
          <textPath 
            href="#arch-curve" 
            startOffset="50%" 
            textAnchor="middle"
            style={{ 
              fill: color, 
              fontFamily: 'var(--font-script)', 
              fontSize: '2.2rem',
              fontWeight: 400
            }}
          >
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  )
}
