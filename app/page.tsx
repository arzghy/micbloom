'use client'

import Link from 'next/link'
import { ArrowRight, Flower2, Palette, Sparkles } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeFlower, setActiveFlower] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlower(prev => (prev + 1) % 5)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  const flowers = [
    { name: 'Mawar', emoji: '🌹', color: '#b5395a', bg: '#fdeef3' },
    { name: 'Lily', emoji: '🌸', color: '#c2537a', bg: '#fce8ef' },
    { name: 'Matahari', emoji: '🌻', color: '#a8722a', bg: '#fdf3e3' },
    { name: 'Tulip', emoji: '🌷', color: '#c04e6a', bg: '#fce5ec' },
    { name: 'Daisy', emoji: '🌼', color: '#7a9e3b', bg: '#f0f7e3' },
  ]

  const features = [
    {
      icon: <Palette className="w-5 h-5" />,
      title: '5 Pilihan Warna',
      desc: 'Merah, biru, ungu, pink, dan putih — semua warna satin yang lembut dan elegan.',
    },
    {
      icon: <Flower2 className="w-5 h-5" />,
      title: '1 Jenis Bunga',
      desc: 'Tersedia bunga pita satin dengan jenis Bunga Mawar.',
    },
  ]

  return (
    <main className="min-h-screen bg-[#faf8f5] overflow-hidden">

      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e8ddd5]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-[22px] leading-none">🌸</span>
            <span className="font-bold text-[17px] tracking-tight text-[#2a1f1a]">
              MicBloom
            </span>
          </div>
          <Link
            href="/customize"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#c04e6a] text-white text-sm font-semibold hover:bg-[#a83f5a] transition-colors"
          >
            Mulai Desain
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-16 md:pt-28 md:pb-24"
      >
        <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <span className="block w-8 h-px bg-[#c04e6a]" />
            <span className="text-[13px] font-medium tracking-widest uppercase text-[#c04e6a]">
              Bunga Pita Satin Kustom
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left */}
            <div>
              <h1 className="text-[48px] sm:text-[60px] md:text-[64px] font-bold leading-[1.05] tracking-tight text-[#1e1410] mb-6">
                Rangkai Bunga
                <br />
                <span className="text-[#c04e6a]">Impian&thinsp;Anda</span>
              </h1>
              <p className="text-[17px] text-[#6b5a52] leading-relaxed mb-8 max-w-[400px]">
                Desain bunga pita satin yang unik dan penuh makna — pilih jenis, warna, dan aksesori favorit untuk sebuah karya yang benar-benar personal.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/customize"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#c04e6a] text-white font-semibold text-[15px] hover:bg-[#a83f5a] transition-colors shadow-sm"
                >
                  Mulai Kustomisasi
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <Link
  href="#features"
  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#d9c9be] text-[#4a3329] font-medium text-[15px] hover:bg-[#f0e8e1] transition-colors"
>
  Lihat Fitur
</Link>
              </div>

              {/* Stat strip */}
              <div className="mt-10 flex gap-8">
                {[
                  { n: '5', label: 'Pilihan Warna' },
                  { n: '1', label: 'Jenis Bunga' },
                ].map(({ n, label }) => (
                  <div key={label}>
                    <p className="text-[28px] font-bold text-[#c04e6a] leading-none">{n}</p>
                    <p className="text-[12px] text-[#9a8278] mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — flower showcase */}
            <div className="relative">
              <div className="absolute inset-0 -z-0 rounded-[40px] bg-gradient-to-br from-[#fdeef3] to-[#f0e8e1] opacity-60" />

              <div className="relative z-10 p-8 sm:p-10 flex flex-col items-center gap-6">
                <div
                  className="w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-md"
                  style={{ backgroundColor: flowers[activeFlower].bg }}
                >
                  <span className="text-[52px] leading-none">{flowers[activeFlower].emoji}</span>
                  <span
                    className="text-[12px] font-semibold mt-1.5"
                    style={{ color: flowers[activeFlower].color }}
                  >
                    {flowers[activeFlower].name}
                  </span>
                </div>

                <div className="flex gap-3">
                  {flowers.map((f, i) => (
                    <button
                      key={f.name}
                      onClick={() => setActiveFlower(i)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-[20px] transition-all ${
                        activeFlower === i
                          ? 'scale-110 shadow-md ring-2 ring-white ring-offset-1'
                          : 'opacity-50 hover:opacity-80'
                      }`}
                      style={{ backgroundColor: f.bg }}
                      title={f.name}
                    >
                      {f.emoji}
                    </button>
                  ))}
                </div>

                <p className="text-[13px] text-[#9a8278] text-center">
                  Klik untuk melihat tiap jenis bunga
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="border-t border-[#e8ddd5]" />
      </div>

      {/* ─── FEATURES ─── */}
      <section id="features" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="flex flex-col md:flex-row gap-16 md:gap-20">
          <div className="md:w-[280px] shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-[#c04e6a]" />
              <span className="text-[12px] font-medium tracking-widest uppercase text-[#c04e6a]">
                Fitur
              </span>
            </div>
            <h2 className="text-[34px] md:text-[40px] font-bold leading-tight text-[#1e1410]">
              Semua Ada<br />di Sini
            </h2>
            <p className="text-[15px] text-[#6b5a52] mt-4 leading-relaxed">
              Alat kustomisasi lengkap untuk menciptakan buquet satin yang sempurna.
            </p>
          </div>

          <div className="flex-1 grid sm:grid-cols-1 gap-6">
            {features.map((feat, i) => (
              <div
                key={feat.title}
                className={`flex gap-5 p-6 rounded-2xl border border-[#e8ddd5] bg-white transition-all duration-500 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#fdeef3] flex items-center justify-center text-[#c04e6a] shrink-0">
                  {feat.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-[#1e1410] mb-1">{feat.title}</h3>
                  <p className="text-[14px] text-[#6b5a52] leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section className="mx-4 sm:mx-8 mb-20 rounded-3xl overflow-hidden bg-[#2a1f1a] relative">
        <div className="absolute inset-0 opacity-[0.04] select-none pointer-events-none text-[80px] grid grid-cols-6 gap-0 overflow-hidden leading-none">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="block text-center">🌸</span>
          ))}
        </div>

        <div className="relative z-10 px-8 sm:px-14 py-16 sm:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[32px] sm:text-[40px] font-bold text-white leading-tight mb-3">
              Siap Berkreasi?
            </h2>
            <p className="text-[16px] text-[#c4a8a0] max-w-[400px] leading-relaxed">
              Buat buquet satin impian Anda sekarang. Gratis, langsung, tanpa perlu daftar.
            </p>
          </div>
          <Link
            href="/customize"
            className="shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#c04e6a] text-white font-bold text-[15px] hover:bg-[#e05c7a] transition-colors shadow-lg"
          >
            Mulai Kustomisasi Sekarang
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[#e8ddd5] py-10 text-center">
        <p className="text-[13px] text-[#9a8278]">
          © 2026 MicBloom
        </p>
      </footer>
    </main>
  )
}