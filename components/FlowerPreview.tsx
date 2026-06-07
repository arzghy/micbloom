'use client'

import React, { useState, useEffect } from 'react'

type FlowerType = 'rose' | 'lily' | 'sunflower' | 'tulip' | 'daisy'
type ColorType = 'red' | 'blue' | 'purple' | 'pink' | 'white'
type StemType = 'green' | 'brown' | 'white'
type WrapperType = 'pink' | 'gold' | 'white' | 'purple' | 'cream'

interface FlowerConfig {
  type: FlowerType
  color: ColorType
  quantity: number
  stemType: StemType
  wrapperColor: WrapperType
  hasButterfly: boolean
  hasGlitter: boolean
  hasTiara: boolean
}

interface Props {
  config: FlowerConfig
}

interface StemPosition {
  offsetX: number
  offsetY: number
  index: number
}

const colorMap: Record<ColorType, string> = {
  red: '#C41E3A',
  blue: '#1E40AF',
  purple: '#6D28D9',
  pink: '#DB2777',
  white: '#FFFFFF',
}

const stemColorMap: Record<StemType, string> = {
  green: '#15803D',
  brown: '#654321',
  white: '#E5E7EB',
}

const wrapperColorMap: Record<WrapperType, string> = {
  pink: '#FFC0CB',
  gold: '#FFD700',
  white: '#FFFFFF',
  purple: '#DDA0DD',
  cream: '#FFFDD0',
}

const FlowerPreview: React.FC<Props> = ({ config }) => {
  const [stemPositions, setStemPositions] = useState<StemPosition[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const seed = config.type + config.color + config.quantity
    const positions = Array.from({ length: config.quantity }).map((_, idx) => {
      const hash = seed.split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
      }, 0)
      const pseudoRandom = Math.sin(hash + idx) * 10000
      const offset = pseudoRandom - Math.floor(pseudoRandom)
      return {
        offsetX: (offset - 0.5) * 40,
        offsetY: idx * 20,
        index: idx,
      }
    })
    setStemPositions(positions)
  }, [config.type, config.color, config.quantity])

  const flowerColor = colorMap[config.color]
  const stemColor = stemColorMap[config.stemType]
  const wrapperColor = wrapperColorMap[config.wrapperColor]
  const bowColor = config.wrapperColor === 'white' ? '#FFB6D9' : config.wrapperColor === 'gold' ? '#DAA520' : config.wrapperColor === 'purple' ? '#BA55D3' : config.wrapperColor === 'cream' ? '#F4A460' : '#FF69B4'

  const shadeColor = (color: string, percent: number) => {
    const num = parseInt(color.replace('#', ''), 16)
    const amt = Math.round(2.55 * percent)
    const R = Math.min(255, Math.max(0, (num >> 16) + amt))
    const G = Math.min(255, Math.max(0, (num >> 8) & 0x00FF) + amt)
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt))
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)
  }

  // REALISTIC ROSE - Bundle of curved petals
  const renderRose = (color: string, x: number, y: number) => {
    const dark = shadeColor(color, -40)
    const light = shadeColor(color, 30)
    const mid = color

    return (
      <g key={`rose-${x}-${y}`}>
        {/* Outer layer - 10 large petals forming a dome */}
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i * 360) / 10
          const rad = (angle * Math.PI) / 180
          const px = x + Math.cos(rad) * 28
          const py = y + Math.sin(rad) * 25
          return (
            <ellipse
              key={`petal-outer-${i}`}
              cx={px}
              cy={py}
              rx={18}
              ry={24}
              fill={light}
              opacity="0.85"
              transform={`rotate(${angle + 20} ${px} ${py})`}
            />
          )
        })}
        
        {/* Middle layer - 8 petals */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8 + 22.5
          const rad = (angle * Math.PI) / 180
          const px = x + Math.cos(rad) * 18
          const py = y + Math.sin(rad) * 16
          return (
            <ellipse
              key={`petal-mid-${i}`}
              cx={px}
              cy={py}
              rx={16}
              ry={20}
              fill={mid}
              opacity="0.9"
              transform={`rotate(${angle + 15} ${px} ${py})`}
            />
          )
        })}

        {/* Inner layer - 6 petals (darker center) */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 360) / 6
          const rad = (angle * Math.PI) / 180
          const px = x + Math.cos(rad) * 10
          const py = y + Math.sin(rad) * 9
          return (
            <ellipse
              key={`petal-inner-${i}`}
              cx={px}
              cy={py}
              rx={13}
              ry={16}
              fill={dark}
              opacity="0.95"
              transform={`rotate(${angle + 10} ${px} ${py})`}
            />
          )
        })}

        {/* Center bud */}
        <circle cx={x} cy={y} r={8} fill={dark} opacity="1" />
        
        {/* Green leaves at base */}
        <ellipse cx={x - 8} cy={y + 12} rx={5} ry={10} fill="#2D5016" opacity="0.8" transform={`rotate(-30 ${x - 8} ${y + 12})`} />
        <ellipse cx={x + 8} cy={y + 12} rx={5} ry={10} fill="#2D5016" opacity="0.8" transform={`rotate(30 ${x + 8} ${y + 12})`} />
      </g>
    )
  }

  // REALISTIC LILY - Open flower with 6 petals
  const renderLily = (color: string, x: number, y: number) => {
    const light = shadeColor(color, 25)
    return (
      <g key={`lily-${x}-${y}`}>
        {/* 6 open petals */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 360) / 6
          const rad = (angle * Math.PI) / 180
          const px = x + Math.cos(rad) * 22
          const py = y + Math.sin(rad) * 20
          return (
            <ellipse
              key={`lily-petal-${i}`}
              cx={px}
              cy={py}
              rx={12}
              ry={28}
              fill={i % 2 === 0 ? color : light}
              opacity="0.88"
              transform={`rotate(${angle} ${px} ${py})`}
            />
          )
        })}

        {/* Center stamens */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 360) / 6
          const rad = (angle * Math.PI) / 180
          const px = x + Math.cos(rad) * 8
          const py = y + Math.sin(rad) * 8
          return (
            <circle
              key={`stamen-${i}`}
              cx={px}
              cy={py}
              r={3}
              fill="#F59E0B"
              opacity="0.9"
            />
          )
        })}
        <circle cx={x} cy={y} r={5} fill="#FCD34D" opacity="0.9" />
      </g>
    )
  }

  // REALISTIC SUNFLOWER - Large petals with seed center
  const renderSunflower = (color: string, x: number, y: number) => {
    const light = shadeColor(color, 20)
    return (
      <g key={`sunflower-${x}-${y}`}>
        {/* 20 large petals */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i * 360) / 20
          const rad = (angle * Math.PI) / 180
          const px = x + Math.cos(rad) * 26
          const py = y + Math.sin(rad) * 26
          return (
            <ellipse
              key={`sunflower-petal-${i}`}
              cx={px}
              cy={py}
              rx={10}
              ry={32}
              fill={i % 2 === 0 ? color : light}
              opacity="0.88"
              transform={`rotate(${angle} ${px} ${py})`}
            />
          )
        })}

        {/* Brown seed center */}
        <circle cx={x} cy={y} r={18} fill="#92400E" opacity="0.95" />
        
        {/* Seed pattern */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12
          const rad = (angle * Math.PI) / 180
          const px = x + Math.cos(rad) * 8
          const py = y + Math.sin(rad) * 8
          return (
            <circle
              key={`seed-${i}`}
              cx={px}
              cy={py}
              r={2}
              fill="#78350F"
              opacity="0.7"
            />
          )
        })}
      </g>
    )
  }

  // REALISTIC TULIP - Cup shape
  const renderTulip = (color: string, x: number, y: number) => {
    const light = shadeColor(color, 25)
    const dark = shadeColor(color, -30)
    return (
      <g key={`tulip-${x}-${y}`}>
        {/* 3 main petals forming cup */}
        <path
          d={`M ${x - 12} ${y + 8} Q ${x - 15} ${y - 10} ${x - 10} ${y - 25} Q ${x - 5} ${y - 20} ${x} ${y + 8}`}
          fill={dark}
          opacity="0.9"
        />
        <path
          d={`M ${x} ${y + 8} Q ${x - 5} ${y - 20} ${x + 10} ${y - 25} Q ${x + 15} ${y - 10} ${x + 12} ${y + 8}`}
          fill={light}
          opacity="0.85"
        />
        <path
          d={`M ${x - 8} ${y + 5} Q ${x} ${y - 15} ${x + 8} ${y + 5}`}
          fill={color}
          opacity="0.88"
        />

        {/* Green leaves */}
        <ellipse cx={x - 6} cy={y + 15} rx={3} ry={12} fill="#2D5016" opacity="0.8" transform={`rotate(-25 ${x - 6} ${y + 15})`} />
        <ellipse cx={x + 6} cy={y + 15} rx={3} ry={12} fill="#2D5016" opacity="0.8" transform={`rotate(25 ${x + 6} ${y + 15})`} />
      </g>
    )
  }

  // REALISTIC DAISY - White petals with yellow center
  const renderDaisy = (color: string, x: number, y: number) => {
    return (
      <g key={`daisy-${x}-${y}`}>
        {/* 16 white petals */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16
          const rad = (angle * Math.PI) / 180
          const px = x + Math.cos(rad) * 20
          const py = y + Math.sin(rad) * 20
          return (
            <ellipse
              key={`daisy-petal-${i}`}
              cx={px}
              cy={py}
              rx={8}
              ry={20}
              fill={color}
              opacity="0.9"
              transform={`rotate(${angle} ${px} ${py})`}
            />
          )
        })}

        {/* Yellow center */}
        <circle cx={x} cy={y} r={12} fill="#FCD34D" opacity="0.95" />
        
        {/* Center texture */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8
          const rad = (angle * Math.PI) / 180
          const px = x + Math.cos(rad) * 5
          const py = y + Math.sin(rad) * 5
          return (
            <circle
              key={`daisy-center-${i}`}
              cx={px}
              cy={py}
              r={1.5}
              fill="#F59E0B"
              opacity="0.6"
            />
          )
        })}
      </g>
    )
  }

  const renderFlower = (type: FlowerType, color: string, x: number, y: number) => {
    switch (type) {
      case 'rose':
        return renderRose(color, x, y)
      case 'lily':
        return renderLily(color, x, y)
      case 'sunflower':
        return renderSunflower(color, x, y)
      case 'tulip':
        return renderTulip(color, x, y)
      case 'daisy':
        return renderDaisy(color, x, y)
      default:
        return null
    }
  }

  const renderBow = () => {
    return (
      <g key="ribbon-bow">
        <ellipse cx="165" cy="360" rx="32" ry="28" fill={bowColor} opacity="0.92" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.25))" />
        <ellipse cx="235" cy="360" rx="32" ry="28" fill={bowColor} opacity="0.92" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.25))" />
        <circle cx="200" cy="360" r="20" fill={shadeColor(bowColor, -15)} opacity="0.98" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
        <path d="M 180 375 L 160 420 L 175 425 L 195 380 Z" fill={bowColor} opacity="0.88" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
        <path d="M 220 375 L 240 420 L 225 425 L 205 380 Z" fill={bowColor} opacity="0.88" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
        <circle cx="195" cy="355" r="5" fill="white" opacity="0.5" />
      </g>
    )
  }

  const renderTiara = () => {
    if (!config.hasTiara) return null
    return (
      <g key="tiara-crown">
        <path d="M 170 95 Q 200 85 230 95" fill="#FFD700" stroke="#DAA520" strokeWidth="2" opacity="0.95" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.2))" />
        <path d="M 185 95 L 175 70 L 190 95 Z" fill="#FFD700" opacity="0.9" />
        <path d="M 200 95 L 200 55 L 208 95 Z" fill="#FFD700" opacity="0.98" />
        <path d="M 215 95 L 225 70 L 210 95 Z" fill="#FFD700" opacity="0.9" />
        {[175, 190, 200, 210, 225].map((gx, idx) => (
          <circle key={`gem-${idx}`} cx={gx} cy="85" r="3.5" fill="#FF1493" opacity="0.85" filter="drop-shadow(0 0 3px #FF1493)" />
        ))}
      </g>
    )
  }

  const renderWrapper = () => {
    const wrapGradId = `wrap-grad-${Date.now()}`
    return (
      <g key="sparkly-wrapper">
        <defs>
          <linearGradient id={wrapGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={wrapperColor} stopOpacity="0.96" />
            <stop offset="100%" stopColor={shadeColor(wrapperColor, -20)} stopOpacity="0.88" />
          </linearGradient>
        </defs>

        <path
          d="M 130 360 Q 110 390 125 430 L 275 430 Q 290 390 270 360 Z"
          fill="white"
          opacity="0.92"
          stroke="#F0F0F0"
          strokeWidth="1"
          filter="drop-shadow(0 5px 12px rgba(0,0,0,0.2))"
        />

        <path
          d="M 135 365 Q 115 395 130 430 L 270 430 Q 285 395 265 365 Z"
          fill={`url(#${wrapGradId})`}
          opacity="0.94"
          filter="drop-shadow(0 4px 10px rgba(0,0,0,0.15))"
        />

        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`cross-h-${i}`}
            x1={120 + i * 16}
            y1="365"
            x2={120 + i * 16}
            y2="430"
            stroke="white"
            strokeWidth="0.6"
            opacity="0.35"
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={`cross-v-${i}`}
            x1="130"
            y1={365 + i * 10}
            x2="270"
            y2={365 + i * 10}
            stroke="white"
            strokeWidth="0.6"
            opacity="0.35"
          />
        ))}

        {Array.from({ length: 6 }).map((_, idx) => {
          const foldX = 130 + idx * 23
          return (
            <path
              key={`fold-${idx}`}
              d={`M ${foldX} 365 Q ${foldX + 10} 390 ${foldX} 430`}
              stroke={shadeColor(wrapperColor, -30)}
              strokeWidth="1.2"
              fill="none"
              opacity="0.45"
            />
          )
        })}

        {isClient &&
          config.hasGlitter &&
          Array.from({ length: 10 }).map((_, idx) => {
            const angle = (idx * 360) / 10
            const rad = (angle * Math.PI) / 180
            const sx = 200 + Math.cos(rad) * 80
            const sy = 395 + Math.sin(rad) * 50
            return (
              <circle
                key={`wrapper-glitter-${idx}`}
                cx={sx}
                cy={sy}
                r="3"
                fill="#FCD34D"
                opacity="0.9"
                filter="drop-shadow(0 0 3px #FCD34D)"
                style={{
                  animation: `twinkle ${1.8 + idx * 0.15}s infinite`,
                }}
              />
            )
          })}
      </g>
    )
  }

  const renderButterflyDecoration = () => {
    if (!config.hasButterfly) return null
    return (
      <g key="butterfly-decoration" transform="translate(115, 345)">
        <ellipse cx="-16" cy="0" rx="14" ry="20" fill="#EC4899" opacity="0.92" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.2))" />
        <ellipse cx="16" cy="0" rx="14" ry="20" fill="#EC4899" opacity="0.92" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.2))" />
        <circle cx="-16" cy="-6" r="4" fill="#FBBF24" opacity="0.8" />
        <circle cx="16" cy="-6" r="4" fill="#FBBF24" opacity="0.8" />
        <circle cx="0" cy="0" r="5" fill="#1F2937" />
        <line x1="0" y1="-5" x2="-10" y2="-20" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="-5" x2="10" y2="-20" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  }

  return (
    <svg viewBox="0 0 400 600" className="w-full max-w-md mx-auto" style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.25))' }}>
      <defs>
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.35; filter: drop-shadow(0 0 2px #FCD34D); }
            50% { opacity: 1; filter: drop-shadow(0 0 5px #FCD34D); }
          }
        `}</style>
      </defs>

      <circle cx="200" cy="300" r="160" fill="#f5f5f3" opacity="0.15" />

      {isClient &&
        stemPositions.map((pos) => {
          const baseX = 200 + (pos.index - Math.floor(config.quantity / 2)) * 48
          const baseY = 430
          const topX = baseX + pos.offsetX
          const topY = 140 + pos.offsetY
          return (
            <line
              key={`stem-${pos.index}`}
              x1={baseX}
              y1={baseY}
              x2={topX}
              y2={topY}
              stroke={stemColor}
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.85"
              filter="drop-shadow(0 2px 3px rgba(0,0,0,0.1))"
            />
          )
        })}

      {isClient && renderWrapper()}
      {isClient && renderTiara()}
      {isClient && renderBow()}

      {isClient &&
        stemPositions.map((pos) => {
          const baseX = 200 + (pos.index - Math.floor(config.quantity / 2)) * 48
          const topX = baseX + pos.offsetX
          const topY = 140 + pos.offsetY
          return (
            <g key={`flower-${pos.index}`}>
              {renderFlower(config.type, flowerColor, topX, topY)}
            </g>
          )
        })}

      {isClient && renderButterflyDecoration()}

      <text x="200" y="585" textAnchor="middle" fontSize="13" fill="#888" fontStyle="italic">
        Luxury Bouquet
      </text>
    </svg>
  )
}

export default FlowerPreview
