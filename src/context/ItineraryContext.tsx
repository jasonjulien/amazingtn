'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'

export interface ItineraryStop {
  slug:       string
  name:       string
  city:       string
  region:     string
  category:   string
  heroImage?: string
}

export interface ItineraryDay {
  id:    string
  label: string
  stops: ItineraryStop[]
}

interface ItineraryContextValue {
  days:       ItineraryDay[]
  addStop:    (stop: ItineraryStop, dayId?: string) => void
  removeStop: (slug: string, dayId: string) => void
  moveStop:   (slug: string, fromDayId: string, toDayId: string) => void
  addDay:     () => void
  removeDay:  (dayId: string) => void
  isAdded:    (slug: string) => boolean
  totalStops: number
}

const STORAGE_KEY = 'amazingtn_itinerary'
const defaultDays: ItineraryDay[] = [{ id: 'day-1', label: 'Day 1', stops: [] }]

function loadFromStorage(): ItineraryDay[] {
  if (typeof window === 'undefined') return defaultDays
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultDays
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) return parsed
  } catch {}
  return defaultDays
}

const ItineraryContext = createContext<ItineraryContextValue | null>(null)

export function ItineraryProvider({ children }: { children: ReactNode }) {
  const [days, setDays] = useState<ItineraryDay[]>(defaultDays)

  // Load from localStorage on mount
  useEffect(() => {
    setDays(loadFromStorage())
  }, [])

  // Persist to localStorage on every change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(days))
    }
  }, [days])

  const addStop = useCallback((stop: ItineraryStop, dayId?: string) => {
    setDays(prev => {
      const alreadyAdded = prev.some(d => d.stops.some(s => s.slug === stop.slug))
      if (alreadyAdded) return prev
      const targetId = dayId ?? prev[0]?.id
      return prev.map(d =>
        d.id === targetId ? { ...d, stops: [...d.stops, stop] } : d
      )
    })
  }, [])

  const removeStop = useCallback((slug: string, dayId: string) => {
    setDays(prev =>
      prev.map(d =>
        d.id === dayId ? { ...d, stops: d.stops.filter(s => s.slug !== slug) } : d
      )
    )
  }, [])

  const moveStop = useCallback((slug: string, fromDayId: string, toDayId: string) => {
    setDays(prev => {
      const stop = prev.find(d => d.id === fromDayId)?.stops.find(s => s.slug === slug)
      if (!stop) return prev
      return prev.map(d => {
        if (d.id === fromDayId) return { ...d, stops: d.stops.filter(s => s.slug !== slug) }
        if (d.id === toDayId)   return { ...d, stops: [...d.stops, stop] }
        return d
      })
    })
  }, [])

  const addDay = useCallback(() => {
    setDays(prev => {
      const nums = prev
        .map(d => parseInt(d.id.replace('day-', '')))
        .filter(n => !isNaN(n))
      const next = nums.length > 0 ? Math.max(...nums) + 1 : prev.length + 1
      return [...prev, { id: `day-${next}`, label: `Day ${next}`, stops: [] }]
    })
  }, [])

  const removeDay = useCallback((dayId: string) => {
    setDays(prev => prev.length <= 1 ? prev : prev.filter(d => d.id !== dayId))
  }, [])

  const isAdded = useCallback((slug: string) =>
    days.some(d => d.stops.some(s => s.slug === slug))
  , [days])

  const totalStops = days.reduce((sum, d) => sum + d.stops.length, 0)

  return (
    <ItineraryContext.Provider value={{ days, addStop, removeStop, moveStop, addDay, removeDay, isAdded, totalStops }}>
      {children}
    </ItineraryContext.Provider>
  )
}

export function useItinerary() {
  const ctx = useContext(ItineraryContext)
  if (!ctx) throw new Error('useItinerary must be used inside ItineraryProvider')
  return ctx
}