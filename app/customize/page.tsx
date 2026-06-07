'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'
import FlowerPreview, { FlowerConfig } from '@/components/FlowerPreview'
import CustomizePanel from '@/components/CustomizePanel'

export default function CustomizePage() {
  // Mengatur nilai default awal: Bunga Mawar Merah, Pembungkus Hitam, Pita Merah
  const [config, setConfig] = useState<FlowerConfig>({
    type: 'rose',
    color: 'red',
    wrapperColor: 'black',
    ribbonColor: 'red',
  })

  const handleConfigChange = (updates: Partial<FlowerConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  // Fungsi mengunduh gambar asli berdasarkan pilihan kombinasi dari folder public/
  const handleDownload = async () => {
    const fileName = `${config.color}-${config.wrapperColor}-${config.ribbonColor}.png`
    const imagePath = `/${fileName}`
    
    try {
      const response = await fetch(imagePath)
      if (!response.ok) throw new Error('File gambar tidak ditemukan di folder public')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Gagal mengunduh gambar:', error)
      alert(`Gagal mengunduh gambar.\nPastikan file dengan nama "${fileName}" sudah Anda masukkan ke dalam folder public/.`)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {/* Row 1 (mobile): back + action buttons */}
          <div className="flex justify-between items-center gap-2">
            <Link href="/" className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors shrink-0">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold text-sm sm:text-base">Kembali</span>
            </Link>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center px-3 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity text-sm"
              >
                <Download className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Unduh</span>
              </button>
            </div>
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