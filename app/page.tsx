'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [activeFlower, setActiveFlower] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlower(prev => (prev + 1) % 5)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const flowers = [
    { name: 'Merah', image: '/red-black-red.png', color: '#b5395a', bg: '#fdeef3' },
    { name: 'Navy', image: '/navy-black-navy.png', color: '#1e3a8a', bg: '#e0e7ff' },
    { name: 'Ungu', image: '/purple-black-purple.png', color: '#7e22ce', bg: '#f3e8ff' },
    { name: 'Pink', image: '/pink-black-pink.png', color: '#db2777', bg: '#fce7f3' },
    { name: 'Putih', image: '/white-black-white.png', color: '#ffffff', bg: '#f3f4f6' },
  ]

  const whatsappNumber = '6287885695323' // Ganti dengan nomor WA yang sebenarnya
  const whatsappMessage = encodeURIComponent('Halo MicBloom! Saya ingin memesan buket pita satin. Bisa bantu saya?')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <main className="min-h-screen overflow-hidden" style={{ background: '#faf8f5', fontFamily: "'DM Sans', sans-serif" }}>
      
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&family=Playfair+Display:ital,wght@0,700;1,500&display=swap');
        
        * { box-sizing: border-box; }
        
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .float-anim { animation: float 6s ease-in-out infinite; }
        .loaded-1 { animation: floatUp 0.7s ease forwards; animation-delay: 0.1s; opacity: 0; }
        .loaded-2 { animation: floatUp 0.7s ease forwards; animation-delay: 0.25s; opacity: 0; }
        .loaded-3 { animation: floatUp 0.7s ease forwards; animation-delay: 0.4s; opacity: 0; }
        .loaded-4 { animation: floatUp 0.7s ease forwards; animation-delay: 0.55s; opacity: 0; }
        
        .wa-btn {
          background: #25D366;
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(37,211,102,0.35);
        }
        .wa-btn:hover {
          background: #1fb855;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(37,211,102,0.45);
        }
        .wa-btn::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          width: 0; height: 0;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.4s ease, height 0.4s ease;
        }
        .wa-btn:hover::before {
          width: 300px; height: 300px;
        }
        
        .wa-pulse {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: #25D366;
          animation: pulse-ring 2s ease-out infinite;
          z-index: -1;
        }
        
        .feature-card {
          background: white;
          border-radius: 20px;
          padding: 28px 24px;
          border: 1px solid #f0e8e1;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .feature-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(192,78,106,0.04) 0%, transparent 60%);
          pointer-events: none;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(192,78,106,0.12);
          border-color: #e8c5d0;
        }
        
        .testimonial-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid #f0e8e1;
          transition: all 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 48px rgba(192,78,106,0.1);
        }
        
        .info-card {
          background: white;
          border-radius: 20px;
          padding: 28px 24px;
          border: 1px solid #f0e8e1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.3s ease;
        }
        .info-card:hover {
          border-color: #c04e6a;
          box-shadow: 0 8px 32px rgba(192,78,106,0.1);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #c04e6a 0%, #e8758b 50%, #c04e6a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        
        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fdeef3;
          color: #c04e6a;
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        
        .stat-pill {
          background: white;
          border: 1px solid #f0e8e1;
          border-radius: 16px;
          padding: 16px 24px;
          text-align: center;
          transition: all 0.3s ease;
        }
        .stat-pill:hover {
          border-color: #c04e6a;
          background: #fdeef3;
        }
        
        .color-dot {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .color-dot:hover { transform: scale(1.15); }
        .color-dot.active { transform: scale(1.2); outline: 3px solid rgba(0,0,0,0.2); outline-offset: 2px; }

        /* ─── MOBILE RESPONSIVE ─── */
        @media (max-width: 768px) {
          .hero-section {
            padding: 88px 16px 48px !important;
          }
          .hero-h1 {
            font-size: 36px !important;
            margin-bottom: 14px !important;
          }
          .hero-desc {
            font-size: 15px !important;
            margin-bottom: 24px !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .hero-grid > div:last-child {
            order: 1;
          }
          .hero-flower-wrap {
            padding: 16px 8px 8px !important;
          }
          .flower-img-wrap {
            width: 160px !important;
            height: 200px !important;
          }
          .hero-buttons {
            gap: 8px !important;
          }
          .hero-buttons a {
            font-size: 14px !important;
            padding: 12px 20px !important;
          }
          .stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 8px !important;
          }
          .stat-pill {
            padding: 12px 8px !important;
          }
          .stat-pill > div:nth-child(2) {
            font-size: 16px !important;
          }
          .section-padding {
            padding: 64px 16px !important;
          }
          .section-padding-pink {
            padding: 64px 16px !important;
          }
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .final-cta-buttons {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .final-cta-buttons a {
            width: 100% !important;
            justify-content: center !important;
          }
          .footer-inner {
            justify-content: center !important;
            text-align: center !important;
          }
          .wa-float {
            bottom: 16px !important;
            right: 16px !important;
            width: 52px !important;
            height: 52px !important;
          }
        }

        @media (max-width: 480px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
          .flower-img-wrap {
            width: 130px !important;
            height: 165px !important;
          }
          .stats-grid {
            gap: 6px !important;
          }
          .stat-pill {
            padding: 10px 6px !important;
          }
          .stat-pill > div:first-child {
            font-size: 16px !important;
          }
          .stat-pill > div:nth-child(2) {
            font-size: 14px !important;
          }
        }
      `}</style>

      {/* ─── NAV ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrollY > 40 ? 'rgba(250,248,245,0.96)' : 'transparent',
        backdropFilter: scrollY > 40 ? 'blur(16px)' : 'none',
        borderBottom: scrollY > 40 ? '1px solid #e8ddd5' : 'none',
        transition: 'all 0.3s ease',
        padding: '0 20px',
      }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#c04e6a', letterSpacing: '-0.02em' }}>
              MicBloom
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/customize"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 20px', borderRadius: 999, background: '#c04e6a', color: 'white', fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}>
              Mulai Desain
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero-section" style={{ maxWidth: 1120, margin: '0 auto', padding: '112px 20px 80px' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          
          {/* Left */}
          <div>
            <div className="loaded-1">
              <span className="section-label">
                Bunga Pita Satin Kustom
              </span>
            </div>
            
            <div className="loaded-2">
              <h1 className="hero-h1" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 700, lineHeight: 1.1, color: '#1e1410', margin: '0 0 20px', letterSpacing: '-0.02em' }}>
                Rangkai Bunga<br />
                <span className="gradient-text">Impian Anda</span>
              </h1>
              <p className="hero-desc" style={{ fontSize: 17, color: '#6b5a52', lineHeight: 1.75, margin: '0 0 32px', maxWidth: 420 }}>
                Desain buket satin yang unik dan penuh makna. Pilih jenis, warna, dan aksesori favorit untuk sebuah karya yang benar-benar personal.
              </p>
            </div>
            
            <div className="loaded-3 hero-buttons" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
              <Link href="/customize"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 999, background: '#c04e6a', color: 'white', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 32px rgba(192,78,106,0.35)', transition: 'all 0.3s ease' }}>
                Mulai Kustomisasi
                <ArrowRight size={16} />
              </Link>
              <Link href="#kontak"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 999, background: 'white', color: '#1e1410', fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1.5px solid #e8ddd5', transition: 'all 0.3s ease' }}>
                Hubungi Kami
              </Link>
            </div>

            {/* Stats */}
            <div className="loaded-4 stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { n: '5 Warna', label: 'Bunga', icon: '🎨' },
                { n: '3 Warna', label: 'Pembungkus', icon: '💐' },
                { n: '5 Warna', label: 'Pita', icon: '🎀' },
              ].map((s, i) => (
                <div key={i} className="stat-pill">
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#c04e6a', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: '#9a8278', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Flower Showcase */}
          <div style={{ position: 'relative', marginTop: 32 }}>
            <div style={{
              position: 'absolute', inset: '-20px',
              background: `radial-gradient(ellipse at 60% 40%, ${flowers[activeFlower].bg} 0%, rgba(250,248,245,0) 70%)`,
              transition: 'background 0.8s ease',
              borderRadius: 40,
            }} />
            
            {/* Decorative blobs */}
            <div style={{ position: 'absolute', top: -16, right: 20, width: 80, height: 80, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: 'rgba(192,78,106,0.08)', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: 20, left: -10, width: 60, height: 60, borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%', background: 'rgba(192,78,106,0.06)', zIndex: 0 }} />

            <div className="hero-flower-wrap" style={{ position: 'relative', zIndex: 1, padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              
              {/* Main image */}
              <div className="float-anim flower-img-wrap" style={{ position: 'relative', width: 220, height: 280 }}>
                {flowers.map((f, i) => (
                  <div key={f.name} style={{
                    position: 'absolute', inset: 0,
                    opacity: activeFlower === i ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.18))',
                  }}>
                    <Image src={f.image} alt={`Buket ${f.name}`} fill style={{ objectFit: 'contain' }} priority={i === 0} />
                  </div>
                ))}
              </div>
              
              {/* Name badge */}
              <div style={{
                background: 'white',
                border: '1px solid #f0e8e1',
                borderRadius: 999,
                padding: '8px 20px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: flowers[activeFlower].color === '#ffffff' ? '#9a8278' : flowers[activeFlower].color, transition: 'color 0.4s ease' }}>
                  🌸 Mawar {flowers[activeFlower].name}
                </span>
              </div>

              {/* Color dots */}
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                {flowers.map((f, i) => (
                  <button key={f.name} onClick={() => setActiveFlower(i)}
                    className={`color-dot ${activeFlower === i ? 'active' : ''}`}
                    style={{ background: f.color, width: activeFlower === i ? 36 : 28, height: activeFlower === i ? 36 : 28 }}
                    title={f.name}
                  />
                ))}
              </div>
              
              <p style={{ fontSize: 12, color: '#9a8278', textAlign: 'center' }}>Klik untuk melihat warna lain</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE STRIP ─── */}
      <div style={{ background: '#c04e6a', padding: '14px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 20s linear infinite' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 500, letterSpacing: '0.05em', margin: '0 32px' }}>
              🌸 Bunga Pita Satin Custom &nbsp; ✨ Pilih Warna Sendiri &nbsp; 🎀 Pengiriman ke Seluruh Indonesia &nbsp; 💝 Hadiah Terbaik
            </span>
          ))}
        </div>
      </div>

      {/* ─── FEATURES ─── */}
      <section id="features" className="section-padding" style={{ maxWidth: 1120, margin: '0 auto', padding: '96px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-label">Kenapa MicBloom?</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, color: '#1e1410', margin: 0, lineHeight: 1.2 }}>
            Semua Ada di Sini
          </h2>
        </div>
        
        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { icon: '🎨', title: '5 Pilihan Warna Bunga', desc: 'Merah, navy, ungu, pink, dan putih. Semua terbuat dari pita satin premium yang lembut dan mengkilap.' },
            { icon: '🎀', title: 'Pita Pembungkus Custom', desc: 'Sesuaikan warna pita dengan selera. Tersedia 5 pilihan warna yang bisa dipadukan bebas.' },
            { icon: '📦', title: 'Packaging Cantik', desc: 'Setiap buket dikemas dengan rapi dan elegan, siap dijadikan hadiah tanpa perlu wrap ulang.' },
            { icon: '🚚', title: 'Pengiriman Seluruh Indonesia', desc: 'Kami kirim ke seluruh penjuru Indonesia dengan packaging aman agar buket tiba dalam kondisi sempurna.' },
            { icon: '💬', title: 'CS Responsif via WhatsApp', desc: 'Ada pertanyaan? Tim kami siap membantu 7 hari seminggu. Chat langsung lewat WhatsApp.' },
            { icon: '✨', title: 'Preview Sebelum Pesan', desc: 'Lihat tampilan buketmu secara langsung di website sebelum konfirmasi pesanan.' },
          ].map((f, i) => (
            <div key={f.title} className="feature-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e1410', margin: '0 0 8px' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#6b5a52', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CARA PESAN ─── */}
      <section className="section-padding-pink" style={{ background: '#fdeef3', padding: '96px 20px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label">Mudah & Cepat</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, color: '#1e1410', margin: 0 }}>
              Cara Memesan
            </h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, position: 'relative' }}>
            {[
              { step: '01', title: 'Pilih Desain', desc: 'Buka halaman kustomisasi dan pilih jenis bunga, warna, serta pita sesuai selera.', icon: '🎨' },
              { step: '02', title: 'Preview', desc: 'Lihat tampilan buketmu secara real-time sebelum lanjut ke pemesanan.', icon: '👁️' },
              { step: '03', title: 'Hubungi via WA', desc: 'Screenshot desainmu dan kirim ke WhatsApp kami untuk konfirmasi & pembayaran.', icon: '💬' },
              { step: '04', title: 'Terima Buket', desc: 'Buket dikirim langsung ke pintumu dengan packaging premium yang cantik.', icon: '🌺' },
            ].map((s, i) => (
              <div key={s.step} style={{ textAlign: 'center', position: 'relative' }}>
                {i < 3 && (
                  <div style={{ position: 'absolute', top: 28, left: '60%', right: '-40%', height: 2, background: 'linear-gradient(to right, #c04e6a, rgba(192,78,106,0.2))', display: 'none' }} className="step-line" />
                )}
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#c04e6a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(192,78,106,0.3)' }}>
                  {s.icon}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#c04e6a', letterSpacing: '0.1em', marginBottom: 8 }}>LANGKAH {s.step}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1e1410', margin: '0 0 8px' }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#6b5a52', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INFO + WHATSAPP SECTION ─── */}
      <section id="kontak" className="section-padding" style={{ background: '#faf8f5', padding: '96px 20px', borderTop: '1px solid #e8ddd5' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label">Hubungi Kami</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, color: '#1e1410', margin: 0 }}>
              Ada yang Ingin Ditanyakan?
            </h2>
          </div>

          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            
            {/* Left — Info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 16, color: '#6b5a52', lineHeight: 1.75, margin: '0 0 8px' }}>
                Tim MicBloom siap membantu dari pemilihan desain hingga pengiriman. Konsultasi gratis, respon cepat!
              </p>
              {[
                { icon: '🕐', title: 'Jam Operasional', desc: 'Senin–Minggu, 08.00–21.00 WIB' },
                { icon: '📍', title: 'Melayani', desc: 'Seluruh Indonesia via JNE / J&T / SiCepat' },
                { icon: '💳', title: 'Pembayaran', desc: 'Transfer Bank, GoPay, OVO, DANA, QRIS' },
                { icon: '🎁', title: 'Custom Order', desc: 'Mau desain khusus? Hubungi kami dulu!' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'white', border: '1px solid #f0e8e1', borderRadius: 16, padding: '16px 20px', transition: 'all 0.2s ease' }}
                  onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e8c5d0'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(192,78,106,0.08)'; }}
                  onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = '#f0e8e1'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1e1410', marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: '#6b5a52' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — WhatsApp CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* WA Card */}
              <div style={{ background: 'white', border: '1.5px solid #e8c5d0', borderRadius: 24, padding: '36px 32px', textAlign: 'center', boxShadow: '0 8px 40px rgba(192,78,106,0.08)' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', boxShadow: '0 8px 28px rgba(37,211,102,0.3)', position: 'relative' }}>
                  <div className="wa-pulse" />
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#1e1410', margin: '0 0 8px' }}>Chat via WhatsApp</h3>
                <p style={{ fontSize: 14, color: '#6b5a52', margin: '0 0 24px', lineHeight: 1.6 }}>
                  Konsultasi desain, konfirmasi pesanan, atau sekedar nanya-nanya — kami siap!
                </p>
                
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="wa-btn" style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px 28px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Mulai Chat Sekarang
                </a>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginTop: 14 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#25D366' }} />
                  <span style={{ fontSize: 12, color: '#9a8278' }}>Biasanya merespons dalam 5 menit</span>
                </div>
              </div>

              {/* Quick action chips */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'Tanya Harga', msg: 'Halo MicBloom! Saya ingin tanya harga buket pita satin dong 😊' },
                  { label: 'Custom Order', msg: 'Halo MicBloom! Saya ingin buat custom order buket spesial. Bisa bantu?' },
                  { label: 'Cek Stok', msg: 'Halo MicBloom! Mau tanya stok buket warna [warna] masih ada tidak?' },
                  { label: 'Info Pengiriman', msg: 'Halo MicBloom! Saya mau tanya tentang pengiriman ke [kota] ya.' },
                ].map(q => (
                  <a key={q.label} href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(q.msg)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ padding: '11px 14px', borderRadius: 12, background: 'white', border: '1px solid #e8ddd5', color: '#4a3329', fontSize: 13, fontWeight: 500, textDecoration: 'none', textAlign: 'center', transition: 'all 0.2s ease' }}
                    onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = '#f0faf4'; (e.currentTarget as HTMLElement).style.borderColor = '#86efac'; (e.currentTarget as HTMLElement).style.color = '#16a34a'; }}
                    onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'white'; (e.currentTarget as HTMLElement).style.borderColor = '#e8ddd5'; (e.currentTarget as HTMLElement).style.color = '#4a3329'; }}>
                    {q.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{ padding: '80px 20px', textAlign: 'center', background: '#fdeef3' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#1e1410', margin: '0 0 16px' }}>
            Siap Membuat Buket Impian?
          </h2>
          <p style={{ fontSize: 16, color: '#6b5a52', margin: '0 0 32px', lineHeight: 1.7 }}>
            Gratis, langsung, tanpa perlu daftar. Desain dalam hitungan menit.
          </p>
          <div className="final-cta-buttons" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/customize"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', borderRadius: 999, background: '#c04e6a', color: 'white', fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 8px 32px rgba(192,78,106,0.35)' }}>
              Mulai Kustomisasi Sekarang
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: '1px solid #e8ddd5', padding: '32px 20px', background: '#faf8f5' }}>
        <div className="footer-inner" style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#c04e6a' }}>MicBloom</span>
            <span style={{ color: '#9a8278', fontSize: 13 }}>© 2026</span>
          </div>
        </div>
      </footer>

      {/* ─── FLOATING WA BUTTON ─── */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="wa-float"
        style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 100, background: '#25D366', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(37,211,102,0.5)', transition: 'all 0.3s ease', textDecoration: 'none' }}
        title="Chat WhatsApp"
        onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; }}
        onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#25D366', animation: 'pulse-ring 2s ease-out infinite' }} />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </main>
  )
}