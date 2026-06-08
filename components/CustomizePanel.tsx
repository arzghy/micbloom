'use client'

import React from 'react'
import { FlowerType, ColorType, WrapperType, RibbonType, FlowerConfig } from './FlowerPreview'

interface Props {
  config: FlowerConfig
  onConfigChange: (updates: Partial<FlowerConfig>) => void
}

const colorMap: Record<ColorType, { name: string; hex: string }> = {
  red: { name: 'Merah', hex: '#DC2626' },
  navy: { name: 'Navy', hex: '#1E3A8A' },
  purple: { name: 'Ungu', hex: '#7C3AED' },
  pink: { name: 'Pink', hex: '#EC4899' },
  white: { name: 'Putih', hex: '#FFFFFF' },
}

const wrapperMap: Record<WrapperType, { name: string; hex: string }> = {
  black: { name: 'Hitam', hex: '#171717' },
  white: { name: 'Putih', hex: '#FFFFFF' },
  softpink: { name: 'Soft Pink', hex: '#FADADD' },
}

const ribbonMap: Record<RibbonType, { name: string; hex: string }> = {
  red: { name: 'Merah', hex: '#DC2626' },
  navy: { name: 'Navy', hex: '#1E3A8A' },
  purple: { name: 'Ungu', hex: '#7C3AED' },
  pink: { name: 'Pink', hex: '#EC4899' },
  white: { name: 'Putih', hex: '#FFFFFF' },
}

const flowerNames: Record<FlowerType, string> = {
  rose: 'Mawar',
}

const CustomizePanel: React.FC<Props> = ({ config, onConfigChange }) => {
  const handleFlowerChange = (flower: FlowerType) => onConfigChange({ type: flower })
  const handleColorChange = (color: ColorType) => onConfigChange({ color })
  const handleWrapperChange = (wrapper: WrapperType) => onConfigChange({ wrapperColor: wrapper })
  const handleRibbonChange = (ribbon: RibbonType) => onConfigChange({ ribbonColor: ribbon })

  return (
    <div className="space-y-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Flower Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Pilih Jenis Bunga</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(flowerNames).map(([key, name]) => (
            <button
              key={key}
              onClick={() => handleFlowerChange(key as FlowerType)}
              className={`p-4 rounded-xl font-semibold transition-all border-2 ${
                config.type === key
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-105'
                  : 'bg-card text-foreground border-border hover:border-primary'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Flower Color */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Pilih Warna Bunga</h3>
        <div className="grid grid-cols-5 gap-3">
          {Object.entries(colorMap).map(([key, { name, hex }]) => (
            <button
              key={key}
              onClick={() => handleColorChange(key as ColorType)}
              className="relative p-2 rounded-xl transition-all"
              style={{
                outline: config.color === key ? '2.5px solid #171717' : '2.5px solid transparent',
                outlineOffset: '2px',
                boxShadow: config.color === key ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
              }}
              title={name}
            >
              <div
                className="w-full rounded-lg shadow-md"
                style={{
                  backgroundColor: hex,
                  height: 64,
                  border: key === 'white' ? '1.5px solid #e5e7eb' : 'none',
                }}
              />
              <p className="text-xs font-semibold mt-2 text-center text-foreground">{name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Wrapper Color */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Warna Pembungkus</h3>
        <div className="grid grid-cols-5 gap-3">
          {Object.entries(wrapperMap).map(([key, { name, hex }]) => (
            <button
              key={key}
              onClick={() => handleWrapperChange(key as WrapperType)}
              className="relative p-2 rounded-xl transition-all"
              style={{
                outline: config.wrapperColor === key ? '2.5px solid #171717' : '2.5px solid transparent',
                outlineOffset: '2px',
                boxShadow: config.wrapperColor === key ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
              }}
              title={name}
            >
              <div
                className="w-full rounded-lg shadow-md"
                style={{
                  backgroundColor: hex,
                  height: 64,
                  border: key === 'white' || key === 'softpink'
                    ? '1.5px solid #e5e7eb'
                    : 'none',
                }}
              />
              <p className="text-xs font-semibold mt-2 text-center text-foreground">{name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Ribbon Color */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Warna Pita Pembungkus</h3>
        <div className="grid grid-cols-5 gap-3">
          {Object.entries(ribbonMap).map(([key, { name, hex }]) => (
            <button
              key={key}
              onClick={() => handleRibbonChange(key as RibbonType)}
              className="relative p-2 rounded-xl transition-all"
              style={{
                outline: config.ribbonColor === key ? '2.5px solid #171717' : '2.5px solid transparent',
                outlineOffset: '2px',
                boxShadow: config.ribbonColor === key ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
              }}
              title={name}
            >
              <div
                className="w-full rounded-lg shadow-md"
                style={{
                  backgroundColor: hex,
                  height: 64,
                  border: key === 'white' ? '1.5px solid #e5e7eb' : 'none',
                }}
              />
              <p className="text-xs font-semibold mt-2 text-center text-foreground">{name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-secondary/50 rounded-xl p-6 space-y-3">
        <h4 className="font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Ringkasan Desain Anda</h4>
        <div className="space-y-2 text-sm text-foreground">
          <p><span className="font-semibold">Jenis Bunga:</span> {config.type ? flowerNames[config.type] : '-'}</p>
          <p><span className="font-semibold">Warna Bunga:</span> {config.color ? colorMap[config.color]?.name : '-'}</p>
          <p><span className="font-semibold">Pembungkus:</span> {config.wrapperColor ? wrapperMap[config.wrapperColor]?.name : '-'}</p>
          <p><span className="font-semibold">Pita:</span> {config.ribbonColor ? ribbonMap[config.ribbonColor]?.name : '-'}</p>
        </div>
      </div>
    </div>
  )
}

export default CustomizePanel