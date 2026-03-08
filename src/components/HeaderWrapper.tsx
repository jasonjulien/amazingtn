'use client'

import { useState, useEffect } from 'react'
import Header from './Header'

interface HeaderWrapperProps {
  variant?: 'white' | 'transparent'
}

export default function HeaderWrapper({ variant = 'white' }: HeaderWrapperProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (variant !== 'transparent') return
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [variant])

  const effectiveVariant = variant === 'transparent' && scrolled ? 'white' : variant

  return <Header variant={effectiveVariant} />
}