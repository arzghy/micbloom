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
    <main className="min-h-screen bg-background" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&family=Playfair+Display:ital,wght@0,700;1,500&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 20px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Kembali</span>
          </Link>

          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity text-sm gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Unduh</span>
          </button>
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

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: '1px solid #e8ddd5', padding: '32px 20px', background: '#faf8f5' }}>
        <div className="footer-inner" style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#c04e6a' }}>MicBloom</span>
            <span style={{ color: '#9a8278', fontSize: 13 }}>© 2026</span>
          </div>
        </div>
      </footer>
    </main>
  )
}