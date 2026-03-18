'use client'

import { useState } from 'react'
import { Category } from './DestinationCard'
import { AllIcon, MusicIcon, NatureIcon, HistoryIcon, FoodIcon, AdventureIcon, FamilyIcon, SearchIcon } from './Icons'

export type Region = 'all' | 'east' | 'middle' | 'west'

interface FilterBarProps {
  onRegionChange?:   (region: Region) => void
  onCategoryChange?: (category: Category | 'all') => void
  onSearch?:         (query: string) => void
  resultCount?:      number
}

const regions: { value: Region; label: string }[] = [
  { value: 'all',    label: 'All Regions' },
  { value: 'east',   label: 'East Tennessee' },
  { value: 'middle', label: 'Middle Tennessee' },
  { value: 'west',   label: 'West Tennessee' },
]

const categories: { value: Category | 'all'; label: string; icon: React.ReactNode }[] = [
  { value: 'all',       label: 'All',                   icon: <AllIcon size={15} /> },
  { value: 'music',     label: 'Music & Entertainment', icon: <MusicIcon size={15} /> },
  { value: 'nature',    label: 'Nature & Outdoors',      icon: <NatureIcon size={15} /> },
  { value: 'history',   label: 'History & Culture',      icon: <HistoryIcon size={15} /> },
  { value: 'food',      label: 'Food & Drink',            icon: <FoodIcon size={15} /> },
  { value: 'adventure', label: 'Adventure',               icon: <AdventureIcon size={15} /> },
  { value: 'family',    label: 'Family Fun',              icon: <FamilyIcon size={15} /> },
]

export default function FilterBar({
  onRegionChange,
  onCategoryChange,
  onSearch,
  resultCount,
}: FilterBarProps) {
  const [activeRegion,   setActiveRegion]   = useState<Region>('all')
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const [searchQuery,    setSearchQuery]    = useState('')

  function handleRegion(region: Region) {
    setActiveRegion(region)
    onRegionChange?.(region)
  }

  function handleCategory(cat: Category | 'all') {
    setActiveCategory(cat)
    onCategoryChange?.(cat)
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value)
    onSearch?.(e.target.value)
  }

  return (
    <div style={{
      position:     'sticky',
      top:          '100px',
      zIndex:       90,
      background:   '#fff',
      borderBottom: '1px solid #e5e5e5',
      boxShadow:    '0 1px 2px rgba(0,0,0,.05)',
    }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>

        {/* Row 1: Search + Region pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 0 10px', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative', flexShrink: 0, width: '320px' }}>
            <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }}>
              <SearchIcon size={16} />
            </div>
            <input
              type="text"
              placeholder="Search attractions or cities..."
              value={searchQuery}
              onChange={handleSearch}
              style={{
                width: '100%', height: '36px',
                paddingLeft: '38px', paddingRight: '16px',
                borderRadius: '9999px',
                border: '1px solid #e2e8f0',
                background: '#fff',
                fontSize: '13px', color: '#1e293b',
                outline: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,.05)',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Region pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {regions.map(r => (
              <RegionPill
                key={r.value}
                label={r.label}
                active={activeRegion === r.value}
                onClick={() => handleRegion(r.value)}
              />
            ))}
          </div>
        </div>

        {/* Row 2: Category chips + count */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(c => (
              <CategoryChip
                key={String(c.value)}
                label={c.label}
                icon={c.icon}
                active={activeCategory === c.value}
                onClick={() => handleCategory(c.value)}
              />
            ))}
          </div>
          {resultCount !== undefined && (
            <span style={{ fontSize: '14px', color: '#475569', flexShrink: 0, marginLeft: '16px' }}>
              Showing <strong style={{ color: '#0f172a' }}>{resultCount}</strong> attractions
            </span>
          )}
        </div>

      </div>
    </div>
  )
}

function RegionPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: '32px', padding: '0 16px',
        borderRadius: '9999px',
        fontSize: '11.5px', fontWeight: active ? 600 : 400,
        border: active ? 'none' : '1px solid #e5e5e5',
        background: active ? '#f59e0b' : hovered ? '#f9fafb' : '#fff',
        color: active ? '#fff' : '#0a0a0a',
        boxShadow: active ? '0 1px 3px rgba(0,0,0,.1)' : '0 1px 2px rgba(0,0,0,.05)',
        cursor: 'pointer', fontFamily: 'inherit',
        transition: 'all 0.15s ease', whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

function CategoryChip({ label, icon, active, onClick }: {
  label: string; icon: React.ReactNode; active: boolean; onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        height: '36px', padding: '0 14px',
        borderRadius: '9999px',
        fontSize: '13px', fontWeight: active ? 600 : 400,
        border: 'none',
        background: active ? '#0f172a' : hovered ? '#e2e8f0' : '#f1f5f9',
        color: active ? '#fff' : '#475569',
        cursor: 'pointer', fontFamily: 'inherit',
        transition: 'background 0.15s ease, color 0.15s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {icon}
      {label}
    </button>
  )
}