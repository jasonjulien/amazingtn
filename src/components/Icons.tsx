// Shared icon library — all icons use currentColor so they
// inherit color from their parent element automatically.

interface IconProps {
  size?: number
  strokeWidth?: number
  className?: string
  style?: React.CSSProperties
}

const base = (size: number, sw: number) => ({
  width:           size,
  height:          size,
  fill:            'none',
  stroke:          'currentColor',
  strokeWidth:     sw,
  strokeLinecap:   'round' as const,
  strokeLinejoin:  'round' as const,
})

export function MusicIcon({ size = 20, strokeWidth = 1.75, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} viewBox="0 0 24 24" style={style}>
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  )
}

export function NatureIcon({ size = 20, strokeWidth = 1.75, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} viewBox="0 0 24 24" style={style}>
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z"/>
      <path d="M12 9v6M9 12h6"/>
    </svg>
  )
}

export function HistoryIcon({ size = 20, strokeWidth = 1.75, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} viewBox="0 0 24 24" style={style}>
      <path d="M3 21h18"/>
      <path d="M5 21V7l7-4 7 4v14"/>
      <path d="M9 21v-6h6v6"/>
    </svg>
  )
}

export function FoodIcon({ size = 20, strokeWidth = 1.75, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} viewBox="0 0 24 24" style={style}>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="1" x2="6" y2="4"/>
      <line x1="10" y1="1" x2="10" y2="4"/>
      <line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  )
}

export function AdventureIcon({ size = 20, strokeWidth = 1.75, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} viewBox="0 0 24 24" style={style}>
      <path d="M3 17l4-8 4 4 4-6 6 10H3z"/>
      <path d="M3 21h18"/>
    </svg>
  )
}

export function FamilyIcon({ size = 20, strokeWidth = 1.75, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} viewBox="0 0 24 24" style={style}>
      <circle cx="9" cy="5" r="2"/>
      <circle cx="16" cy="5" r="2"/>
      <path d="M5 20v-5a4 4 0 0 1 8 0v5"/>
      <path d="M14 20v-3a3 3 0 0 1 6 0v3"/>
    </svg>
  )
}

export function LocationIcon({ size = 16, strokeWidth = 2, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} viewBox="0 0 24 24" style={style}>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

export function SearchIcon({ size = 16, strokeWidth = 2, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} viewBox="0 0 24 24" style={style}>
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  )
}

export function ArrowIcon({ size = 20, strokeWidth = 2, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} viewBox="0 0 24 24" style={style}>
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}

export function PlusIcon({ size = 14, strokeWidth = 2.5, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} viewBox="0 0 24 24" style={style}>
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )
}

export function PhoneIcon({ size = 16, strokeWidth = 2, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} viewBox="0 0 24 24" style={style}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2 .84h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

export function MailIcon({ size = 16, strokeWidth = 2, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} viewBox="0 0 24 24" style={style}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

export function MapPinIcon({ size = 16, strokeWidth = 2, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} viewBox="0 0 24 24" style={style}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

export function AllIcon({ size = 16, strokeWidth = 2, style }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} viewBox="0 0 24 24" style={style}>
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  )
}