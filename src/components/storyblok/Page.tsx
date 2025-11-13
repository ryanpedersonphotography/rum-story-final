'use client'

import React from 'react'

interface PageProps {
  blok: any
}

export default function Page({ blok }: PageProps) {
  return (
    <div key={blok._uid}>
      {/* Content will be rendered here */}
    </div>
  )
}
