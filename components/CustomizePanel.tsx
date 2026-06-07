'use client'

import React from 'react'

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
  onConfigChange: (updates: Partial<FlowerConfig>) => void
}

const colorMap: Record<ColorType, { name: string; hex: string }> = {
  red: { name: 'Merah', hex: '#DC2626' },
  blue: { name: 'Biru', hex: '#2563EB' },
  purple: { name: 'Ungu', hex: '#7C3AED' },
  pink: { name: 'Pink', hex: '#EC4899' },
  white: { name: 'Putih', hex: '#FFFFFF' },
}

const flowerNames: Record<FlowerType, string> = {
  rose: 'Mawar',
  lily: 'Lily',
  sunflower: 'Matahari',
  tulip: 'Tulip',
  daisy: 'Daisy',
}

const CustomizePanel: React.FC<Props> = ({ config, onConfigChange }) => {
  const handleFlowerChange = (flower: FlowerType) => {
    onConfigChange({ type: flower })
  }

  const handleColorChange = (color: ColorType) => {
    onConfigChange({ color })
  }

  const handleQuantityChange = (quantity: number) => {
    onConfigChange({ quantity: Math.max(1, Math.min(7, quantity)) })
  }

  const handleStemChange = (stem: StemType) => {
    onConfigChange({ stemType: stem })
  }

  const handleWrapperChange = (wrapper: WrapperType) => {
    onConfigChange({ wrapperColor: wrapper })
  }

  const toggleButterfly = () => {
    onConfigChange({ hasButterfly: !config.hasButterfly })
  }

  const toggleGlitter = () => {
    onConfigChange({ hasGlitter: !config.hasGlitter })
  }

  const toggleTiara = () => {
    onConfigChange({ hasTiara: !config.hasTiara })
  }

  return (
    <div className="space-y-8">
      {/* Flower Type Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Pilih Jenis Bunga</h3>
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

      {/* Color Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Pilih Warna</h3>
        <div className="grid grid-cols-5 gap-3">
          {Object.entries(colorMap).map(([key, { name, hex }]) => (
            <button
              key={key}
              onClick={() => handleColorChange(key as ColorType)}
              className={`relative p-4 rounded-xl transition-all border-2 ${
                config.color === key ? 'border-foreground shadow-lg scale-110' : 'border-transparent'
              }`}
              title={name}
            >
              <div
                className="w-full h-16 rounded-lg shadow-md transition-transform hover:scale-105"
                style={{ 
                  backgroundColor: hex,
                  border: key === 'white' ? '2px solid #ddd' : 'none'
                }}
              />
              <p className="text-xs font-semibold mt-2 text-center text-foreground">{name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selection */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-foreground">Jumlah Bunga</h3>
          <span className="text-2xl font-bold text-primary">{config.quantity}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleQuantityChange(config.quantity - 1)}
            className="w-12 h-12 rounded-full bg-card border border-border text-foreground font-bold hover:bg-primary hover:text-primary-foreground transition-all"
          >
            −
          </button>
          <input
            type="range"
            min="1"
            max="7"
            value={config.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <button
            onClick={() => handleQuantityChange(config.quantity + 1)}
            className="w-12 h-12 rounded-full bg-card border border-border text-foreground font-bold hover:bg-primary hover:text-primary-foreground transition-all"
          >
            +
          </button>
        </div>
      </div>

      {/* Stem Type Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Warna Tangkai</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { key: 'green', name: 'Hijau', color: '#16A34A' },
            { key: 'brown', name: 'Coklat', color: '#92400E' },
            { key: 'white', name: 'Putih', color: '#F5F5F5' },
          ].map(({ key, name, color }) => (
            <button
              key={key}
              onClick={() => handleStemChange(key as StemType)}
              className={`p-4 rounded-xl font-semibold transition-all border-2 ${
                config.stemType === key
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg'
                  : 'bg-card text-foreground border-border hover:border-primary'
              }`}
            >
              <div
                className="w-full h-4 rounded mb-2"
                style={{ backgroundColor: color, border: key === 'white' ? '1px solid #ddd' : 'none' }}
              />
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Wrapper Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Warna Pembungkus</h3>
        <div className="grid grid-cols-5 gap-3">
          {[
            { key: 'pink', name: 'Pink', color: '#F472B6' },
            { key: 'gold', name: 'Gold', color: '#FCD34D' },
            { key: 'white', name: 'Putih', color: '#FFFFFF' },
            { key: 'purple', name: 'Ungu', color: '#D8B4FE' },
            { key: 'cream', name: 'Krem', color: '#FEF3C7' },
          ].map(({ key, name, color }) => (
            <button
              key={key}
              onClick={() => handleWrapperChange(key as WrapperType)}
              className={`relative p-3 rounded-lg transition-all border-2 ${
                config.wrapperColor === key ? 'border-foreground shadow-lg scale-110' : 'border-transparent'
              }`}
              title={name}
            >
              <div
                className="w-full h-14 rounded-md shadow-md transition-transform hover:scale-105"
                style={{ 
                  backgroundColor: color,
                  border: key === 'white' ? '2px solid #ddd' : 'none'
                }}
              />
              <p className="text-xs font-semibold mt-2 text-center text-foreground">{name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Accessories */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Aksesori</h3>
        <div className="space-y-3">
          {/* Butterfly Option */}
          <label className="flex items-center p-4 rounded-xl bg-card border-2 border-border hover:border-primary cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={config.hasButterfly}
              onChange={toggleButterfly}
              className="w-5 h-5 rounded cursor-pointer accent-primary"
            />
            <div className="ml-4">
              <p className="font-semibold text-foreground">🦋 Tambah Kupu-Kupu</p>
              <p className="text-sm text-muted-foreground">Tambahkan sentuhan cantik dengan kupu-kupu pink</p>
            </div>
          </label>

          {/* Glitter Option */}
          <label className="flex items-center p-4 rounded-xl bg-card border-2 border-border hover:border-primary cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={config.hasGlitter}
              onChange={toggleGlitter}
              className="w-5 h-5 rounded cursor-pointer accent-primary"
            />
            <div className="ml-4">
              <p className="font-semibold text-foreground">✨ Tambah Glitter</p>
              <p className="text-sm text-muted-foreground">Buat bunga Anda berkilau dengan efek glitter</p>
            </div>
          </label>

          {/* Tiara Option */}
          <label className="flex items-center p-4 rounded-xl bg-card border-2 border-border hover:border-primary cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={config.hasTiara}
              onChange={toggleTiara}
              className="w-5 h-5 rounded cursor-pointer accent-primary"
            />
            <div className="ml-4">
              <p className="font-semibold text-foreground">👑 Tambah Tiara Crown</p>
              <p className="text-sm text-muted-foreground">Tambahkan mahkota mewah di atas buket</p>
            </div>
          </label>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-secondary/50 rounded-xl p-6 space-y-3">
        <h4 className="font-bold text-foreground">Ringkasan Desain Anda</h4>
        <div className="space-y-2 text-sm text-foreground">
          <p>
            <span className="font-semibold">Jenis Bunga:</span> {flowerNames[config.type]}
          </p>
          <p>
            <span className="font-semibold">Warna:</span> {colorMap[config.color].name}
          </p>
          <p>
            <span className="font-semibold">Jumlah:</span> {config.quantity} batang
          </p>
          <p>
            <span className="font-semibold">Tangkai:</span>{' '}
            {config.stemType === 'green' ? 'Hijau' : config.stemType === 'brown' ? 'Coklat' : 'Putih'}
          </p>
          <p>
            <span className="font-semibold">Pembungkus:</span>{' '}
            {config.wrapperColor === 'pink' ? 'Pink' : config.wrapperColor === 'gold' ? 'Gold' : config.wrapperColor === 'white' ? 'Putih' : config.wrapperColor === 'purple' ? 'Ungu' : 'Krem'}
          </p>
          <p className="text-muted-foreground">
            {config.hasButterfly && '🦋 Kupu-kupu '}
            {(config.hasButterfly || config.hasGlitter || config.hasTiara) && (config.hasButterfly ? (config.hasGlitter || config.hasTiara ? '+ ' : '') : '')}
            {config.hasGlitter && '✨ Glitter '}
            {(config.hasButterfly || config.hasGlitter) && config.hasTiara && '+ '}
            {config.hasTiara && '👑 Tiara'}
            {!config.hasButterfly && !config.hasGlitter && !config.hasTiara && '(Tanpa aksesori tambahan)'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CustomizePanel
