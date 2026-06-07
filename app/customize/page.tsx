'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Share2 } from 'lucide-react'
import FlowerPreview from '@/components/FlowerPreview'
import CustomizePanel from '@/components/CustomizePanel'

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

export default function CustomizePage() {
  const [config, setConfig] = useState<FlowerConfig>({
    type: 'rose',
    color: 'pink',
    quantity: 3,
    stemType: 'green',
    wrapperColor: 'pink',
    hasButterfly: false,
    hasGlitter: false,
    hasTiara: false,
  })

  const handleConfigChange = (updates: Partial<FlowerConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  const handleDownload = () => {
    alert(`Desain bunga Anda sedang diunduh!\n\nJenis: ${config.type}\nWarna: ${config.color}\nJumlah: ${config.quantity}\nTangkai: ${config.stemType}\nPembungkus: ${config.wrapperColor}\nKupu-kupu: ${config.hasButterfly ? 'Ya' : 'Tidak'}\nGlitter: ${config.hasGlitter ? 'Ya' : 'Tidak'}\nTiara: ${config.hasTiara ? 'Ya' : 'Tidak'}`)
  }

  const handleShare = () => {
    alert(`Desain Anda telah dibagikan!\n\nBagikan dengan teman dan keluarga desain bunga pita satin unik Anda.`)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Kembali</span>
          </Link>
          <h1 className="text-2xl font-bold text-primary">🌸 Ribbon Bloom - Kustomisasi</h1>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-primary text-primary font-medium hover:bg-secondary transition-colors"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Bagikan
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4 mr-2" />
              Unduh
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Preview Section */}
          <div className="flex items-center justify-center bg-gradient-to-br from-secondary to-background rounded-3xl p-8 min-h-96 lg:min-h-[600px]">
            <FlowerPreview config={config} />
          </div>

          {/* Customize Panel */}
          <CustomizePanel config={config} onConfigChange={handleConfigChange} />
        </div>
      </div>
    </main>
  )
}
