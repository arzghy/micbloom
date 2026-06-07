'use client'

import React from 'react'
import Image from 'next/image'

export type FlowerType = 'rose'
export type ColorType = 'red' | 'navy' | 'purple' | 'pink' | 'white'
export type WrapperType = 'black'
export type RibbonType = 'red' | 'navy' | 'purple' | 'pink' | 'white'

export interface FlowerConfig {
  type: FlowerType
  color: ColorType
  wrapperColor: WrapperType
  ribbonColor: RibbonType
}

interface Props {
  config: FlowerConfig
}

const FlowerPreview: React.FC<Props> = ({ config }) => {
  const safeColor = config.color || 'red'
  const safeWrapper = config.wrapperColor || 'black'
  const safeRibbon = config.ribbonColor || 'red'

  // Path mengarah otomatis ke folder public/
  const imagePath = `/${safeColor}-${safeWrapper}-${safeRibbon}.png`

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4] flex items-center justify-center">
      <div className="relative w-full h-full drop-shadow-2xl transition-transform duration-500 hover:scale-105">
        <Image
          src={imagePath}
          alt={`Buket ${safeColor}-${safeWrapper}-${safeRibbon}`}
          fill
          className="object-contain"
          priority
        />
      </div>
      
      <div className="absolute -bottom-6 left-0 right-0 text-center">
        <p className="text-sm text-muted-foreground font-medium">
          MicBloom
        </p>
      </div>
    </div>
  )
}

export default FlowerPreview