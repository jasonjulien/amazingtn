'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import HeaderWrapper from '@/components/HeaderWrapper'
import { useItinerary, ItineraryDay, ItineraryStop } from '@/context/ItineraryContext'
import { LocationIcon, ArrowIcon, PlusIcon } from '@/components/Icons'

const regionLabel: Record<string, string> = {
  east:   'East Tennessee',
  middle: 'Middle Tennessee',
  west:   'West Tennessee',
}

const categoryColors: Record<string, { bg: string; color: string }> = {
  music:     { bg: '#ede9fe', color: '#6d28d9' },
  nature:    { bg: '#d1fae5', color: '#047857' },
  history:   { bg: '#fef3c7', color: '#b45309' },
  food:      { bg: '#fee2e2', color: '#b91c1c' },
  adventure: { bg: '#cffafe', color: '#0e7490' },
  family:    { bg: '#fce7f3', color: '#be185d' },
}

export default function ItineraryPage() {
  const { days, addDay, removeDay, removeStop, totalStops, moveStop } = useItinerary()
  const [activeDay, setActiveDay]         = useState<string>(days[0]?.id ?? '')
  const [dragOverDay, setDragOverDay]     = useState<string | null>(null)
  const draggingStop  = useRef<{ slug: string; fromDayId: string } | null>(null)

  const activeDayId  = days.find(d => d.id === activeDay)?.id ?? days[0]?.id ?? ''
  const currentDay   = days.find(d => d.id === activeDayId)
  const regions      = [...new Set(days.flatMap(d => d.stops.map(s => s.region)))]

  function onDragStart(slug: string, fromDayId: string) {
    draggingStop.current = { slug, fromDayId }
  }

  function onDragOverTab(e: React.DragEvent, dayId: string) {
    e.preventDefault()
    setDragOverDay(dayId)
  }

  function onDropOnTab(e: React.DragEvent, toDayId: string) {
    e.preventDefault()
    setDragOverDay(null)
    if (!draggingStop.current) return
    const { slug, fromDayId } = draggingStop.current
    if (fromDayId !== toDayId) {
      moveStop(slug, fromDayId, toDayId)
      setActiveDay(toDayId)
    }
    draggingStop.current = null
  }

  function onDragLeaveTab() {
    setDragOverDay(null)
  }

  return (
    <div style={{ background: '#fafaf9', minHeight: '100vh' }}>
      <HeaderWrapper variant="transparent" />

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', padding: '80px 48px 64px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <p style={{ fontSize: '13px', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '12px' }}>
            Trip Planner
          </p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, color: '#fff', lineHeight: 1.1, marginBottom: '12px' }}>
            Your Tennessee <strong>Itinerary</strong>
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '520px', lineHeight: 1.65 }}>
            Add destinations as you explore the site, then drag stops between days to organize your trip.
          </p>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '56px 48px' }}>
        {totalStops === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px', alignItems: 'start' }}>

            {/* ── Left: Day builder ── */}
            <div>

              {/* Day tabs — also drop targets */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
                {days.map(day => (
                  <DayTab
                    key={day.id}
                    day={day}
                    active={day.id === activeDayId}
                    isDragOver={dragOverDay === day.id}
                    onClick={() => setActiveDay(day.id)}
                    onDragOver={e => onDragOverTab(e, day.id)}
                    onDrop={e => onDropOnTab(e, day.id)}
                    onDragLeave={onDragLeaveTab}
                    onRemove={days.length > 1 ? () => {
                      removeDay(day.id)
                      if (activeDayId === day.id) setActiveDay(days.find(d => d.id !== day.id)?.id ?? '')
                    } : undefined}
                  />
                ))}
                <button
                  onClick={addDay}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    height: '36px', padding: '0 16px', borderRadius: '9999px',
                    fontSize: '13px', fontWeight: 500, color: '#475569',
                    background: '#fff', border: '1px dashed #cbd5e1',
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  <PlusIcon size={12} strokeWidth={2.5} />
                  Add Day
                </button>
              </div>

              {/* Drag hint */}
              {totalStops > 0 && days.length > 1 && (
                <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 9l4-4 4 4M5 15l4 4 4-4M19 5v14"/>
                  </svg>
                  Drag any stop onto a day tab to move it
                </p>
              )}

              {/* Stops for active day */}
              {currentDay && (
                currentDay.stops.length === 0 ? (
                  <div style={{
                    border: '2px dashed #e2e8f0', borderRadius: '16px',
                    padding: '48px', textAlign: 'center', color: '#94a3b8',
                  }}>
                    <p style={{ fontSize: '15px', marginBottom: '8px' }}>No stops for {currentDay.label} yet.</p>
                    <p style={{ fontSize: '13px' }}>
                      Browse <Link href="/explore" style={{ color: '#f59e0b' }}>destinations</Link> and hit + Add, or drag a stop from another day onto this tab.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {currentDay.stops.map((stop, i) => (
                      <StopCard
                        key={stop.slug}
                        stop={stop}
                        index={i}
                        onRemove={() => removeStop(stop.slug, currentDay.id)}
                        onDragStart={() => onDragStart(stop.slug, currentDay.id)}
                      />
                    ))}
                  </div>
                )
              )}
            </div>

            {/* ── Right: Trip summary ── */}
            <div style={{ position: 'sticky', top: '120px' }}>
              <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
                <div style={{ background: '#0f172a', padding: '20px 24px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>Trip Summary</h3>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Your Tennessee adventure</p>
                </div>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <SummaryRow label="Days" value={String(days.length)} />
                  <SummaryRow label="Total Stops" value={String(totalStops)} />
                  <SummaryRow
                    label="Regions"
                    value={regions.length === 0 ? '—' : regions.map(r => regionLabel[r] ?? r).join(', ')}
                    small
                  />
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {days.map(d => (
                      <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: '#64748b' }}>{d.label}</span>
                        <span style={{ fontWeight: 600, color: '#1e293b' }}>{d.stops.length} stop{d.stops.length !== 1 ? 's' : ''}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button style={{
                      height: '44px', borderRadius: '9999px',
                      background: '#f59e0b', color: '#0f172a',
                      fontSize: '14px', fontWeight: 600,
                      border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    }}>
                      Save Itinerary
                    </button>
                    <Link href="/explore" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      height: '44px', borderRadius: '9999px',
                      background: '#fff', border: '1px solid #e5e5e5',
                      color: '#475569', fontSize: '13px',
                    }}>
                      Add More Destinations
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Day tab ── */
function DayTab({ day, active, isDragOver, onClick, onDragOver, onDrop, onDragLeave, onRemove }: {
  day: ItineraryDay
  active: boolean
  isDragOver: boolean
  onClick: () => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onDragLeave: () => void
  onRemove?: () => void
}) {
  const bg = isDragOver ? '#f59e0b' : active ? '#0f172a' : '#fff'
  const color = isDragOver ? '#fff' : active ? '#fff' : '#475569'
  const border = isDragOver ? 'none' : active ? 'none' : '1px solid #e5e5e5'

  return (
    <div
      style={{ display: 'flex', alignItems: 'center' }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
    >
      <button
        onClick={onClick}
        style={{
          height: '36px',
          padding: onRemove ? '0 10px 0 16px' : '0 16px',
          borderRadius: onRemove ? '9999px 0 0 9999px' : '9999px',
          fontSize: '13px', fontWeight: active ? 600 : 400,
          color, background: bg, border,
          borderRight: onRemove ? 'none' : undefined,
          cursor: 'pointer', fontFamily: 'inherit',
          transition: 'all 0.15s ease', whiteSpace: 'nowrap',
          transform: isDragOver ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {day.label}
        {day.stops.length > 0 && (
          <span style={{
            marginLeft: '6px',
            background: isDragOver ? 'rgba(255,255,255,0.3)' : active ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
            color: isDragOver || active ? '#fff' : '#64748b',
            fontSize: '11px', fontWeight: 600,
            padding: '1px 6px', borderRadius: '9999px',
          }}>
            {day.stops.length}
          </span>
        )}
      </button>
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            height: '36px', width: '28px',
            borderRadius: '0 9999px 9999px 0',
            fontSize: '14px',
            color: active ? 'rgba(255,255,255,0.7)' : '#94a3b8',
            background: bg, border,
            borderLeft: active ? '1px solid rgba(255,255,255,0.15)' : '1px solid #e5e5e5',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s ease',
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}

/* ─── Stop card ── */
function StopCard({ stop, index, onRemove, onDragStart }: {
  stop: ItineraryStop
  index: number
  onRemove: () => void
  onDragStart: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const cat = categoryColors[stop.category] ?? { bg: '#f1f5f9', color: '#475569' }

  return (
    <div
      draggable
      onDragStart={() => { setDragging(true); onDragStart() }}
      onDragEnd={() => setDragging(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        background: '#fff', borderRadius: '12px', padding: '16px',
        boxShadow: hovered ? '0 4px 12px rgba(0,0,0,.08)' : '0 1px 3px rgba(0,0,0,.05)',
        transition: 'box-shadow 0.2s ease, opacity 0.2s ease',
        opacity: dragging ? 0.4 : 1,
        cursor: 'grab',
      }}
    >
      {/* Drag handle */}
      <div style={{ color: '#cbd5e1', flexShrink: 0, cursor: 'grab' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="9" cy="6" r="1" fill="currentColor" stroke="none"/>
          <circle cx="15" cy="6" r="1" fill="currentColor" stroke="none"/>
          <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none"/>
          <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none"/>
          <circle cx="9" cy="18" r="1" fill="currentColor" stroke="none"/>
          <circle cx="15" cy="18" r="1" fill="currentColor" stroke="none"/>
        </svg>
      </div>

      {/* Index */}
      <div style={{
        width: '32px', height: '32px', borderRadius: '9999px',
        background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '13px', fontWeight: 700, color: '#64748b', flexShrink: 0,
      }}>
        {index + 1}
      </div>

      {/* Thumbnail */}
      {stop.heroImage && (
        <div style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
          <img src={stop.heroImage} alt={stop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {stop.name}
          </h4>
          <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', background: cat.bg, color: cat.color, flexShrink: 0 }}>
            {stop.category}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8' }}>
          <LocationIcon size={13} strokeWidth={2} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '12px' }}>{stop.city}, {regionLabel[stop.region] ?? stop.region}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <Link
          href={`/destinations/${stop.slug}`}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '32px', height: '32px', borderRadius: '9999px',
            background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569',
          }}
        >
          <ArrowIcon size={14} strokeWidth={2} />
        </Link>
        <button
          onClick={onRemove}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '32px', height: '32px', borderRadius: '9999px',
            background: '#fff5f5', border: '1px solid #fecaca',
            color: '#ef4444', fontSize: '16px', cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}

/* ─── Summary row ── */
function SummaryRow({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
      <span style={{ fontSize: '13px', color: '#64748b' }}>{label}</span>
      <span style={{ fontSize: small ? '12px' : '15px', fontWeight: 600, color: '#1e293b', textAlign: 'right' }}>{value}</span>
    </div>
  )
}

/* ─── Empty state ── */
function EmptyState() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 0' }}>
      <div style={{
        width: '72px', height: '72px', borderRadius: '16px',
        background: '#f1f5f9', display: 'flex', alignItems: 'center',
        justifyContent: 'center', margin: '0 auto 24px', color: '#94a3b8',
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
        </svg>
      </div>
      <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#1e293b', marginBottom: '10px' }}>Your itinerary is empty</h2>
      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '28px', maxWidth: '340px', margin: '0 auto 28px', lineHeight: 1.65 }}>
        Browse destinations and click <strong>+ Add</strong> on any card to start building your trip.
      </p>
      <Link href="/explore" style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        height: '44px', padding: '0 24px', borderRadius: '9999px',
        background: '#f59e0b', color: '#0f172a', fontSize: '14px', fontWeight: 600,
      }}>
        Explore Destinations <ArrowIcon size={16} strokeWidth={2} />
      </Link>
    </div>
  )
}