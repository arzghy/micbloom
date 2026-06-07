'use client'

import Link from 'next/link'
import { ArrowRight, Flower2, Palette, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const flowers = [
    { name: 'Mawar', color: '#d8547f' },
    { name: 'Lily', color: '#e8758b' },
    { name: 'Matahari', color: '#f5a6c1' },
    { name: 'Tulip', color: '#d8547f' },
    { name: 'Daisy', color: '#e8d4dd' }
  ]

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">🌸 Ribbon Bloom</h1>
          <Link
            href="/customize"
            className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Mulai Desain
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Ciptakan Bunga
                <br />
                <span className="text-primary">Impian Anda</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                Desain bunga pita satin yang unik dan personal. Pilih warna, jenis, dan aksesori favorit Anda untuk menciptakan karya seni yang sempurna.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/customize"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all hover:shadow-lg"
              >
                Mulai Kustomisasi
                <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-primary text-primary font-semibold hover:bg-secondary transition-colors"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">5</p>
                <p className="text-sm text-muted-foreground">Pilihan Warna</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">5</p>
                <p className="text-sm text-muted-foreground">Jenis Bunga</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">∞</p>
                <p className="text-sm text-muted-foreground">Kombinasi</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 md:h-full min-h-96 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background rounded-3xl"></div>
            <div className="relative flex flex-col items-center justify-center gap-6">
              {/* Animated Flowers Grid */}
              <div className="grid grid-cols-3 gap-4">
                {flowers.map((flower, idx) => (
                  <div
                    key={idx}
                    className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm text-center animate-bounce"
                      style={{
                        backgroundColor: flower.color,
                        animationDelay: `${idx * 0.1}s`
                      }}
                    >
                      {flower.name}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground mt-4">Buat desain unik Anda sekarang</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-secondary/30 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-4xl md:text-5xl font-bold text-foreground">
              Fitur Lengkap Kustomisasi
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Semua tools yang Anda butuhkan untuk menciptakan bunga pita satin yang sempurna
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">5 Pilihan Warna</h4>
              <p className="text-muted-foreground">
                Pilih dari merah, biru, ungu, pink, dan putih yang cantik untuk menciptakan palet warna sempurna Anda.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Flower2 className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">5 Jenis Bunga</h4>
              <p className="text-muted-foreground">
                Mawar, Lily, Matahari, Tulip, dan Daisy. Setiap bunga dirancang dengan detail yang indah dan elegan.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Aksesori & Dekorasi</h4>
              <p className="text-muted-foreground">
                Tambahkan sentuhan istimewa dengan kupu-kupu, glitter, dan pilihan tangkai yang berbeda untuk hasil sempurna.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-20">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold text-primary-foreground">
            Siap Memulai Petualangan Desain?
          </h3>
          <p className="text-lg text-primary-foreground/90">
            Jangan tunda lagi! Buat bunga pita satin impian Anda hari ini dan bagikan kreativitas Anda dengan dunia.
          </p>
          <Link
            href="/customize"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary-foreground text-primary font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Mulai Kustomisasi Sekarang
            <ArrowRight className="ml-3 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p>© 2024 Ribbon Bloom. Kreativitas tanpa batas. 🌸</p>
      </footer>
    </main>
  )
}
