'use client'

import { useEffect, useRef } from 'react'

export default function Home() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = 80

    const lights = []
    const numLights = Math.floor(canvas.width / 40)

    for (let i = 0; i < numLights; i++) {
      lights.push({
        x: (i * canvas.width) / numLights + 20,
        y: 40,
        radius: 6,
        color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181'][Math.floor(Math.random() * 5)],
        glowPhase: Math.random() * Math.PI * 2,
        glowSpeed: 0.02 + Math.random() * 0.03
      })
    }

    let animationId

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw wire
      ctx.strokeStyle = '#333'
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let i = 0; i < canvas.width; i += 20) {
        const y = 40 + Math.sin(i * 0.05) * 3
        if (i === 0) {
          ctx.moveTo(i, y)
        } else {
          ctx.lineTo(i, y)
        }
      }
      ctx.stroke()

      // Draw lights
      lights.forEach(light => {
        light.glowPhase += light.glowSpeed
        const glow = Math.sin(light.glowPhase) * 0.5 + 0.5
        const glowIntensity = 10 + glow * 20

        // Outer glow
        const gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.radius + glowIntensity)
        gradient.addColorStop(0, light.color)
        gradient.addColorStop(0.5, light.color + '66')
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(light.x, light.y, light.radius + glowIntensity, 0, Math.PI * 2)
        ctx.fill()

        // Light bulb
        ctx.fillStyle = light.color
        ctx.beginPath()
        ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2)
        ctx.fill()

        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.beginPath()
        ctx.arc(light.x - 2, light.y - 2, light.radius * 0.3, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = 80
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div style={{
      margin: 0,
      padding: 0,
      backgroundColor: '#000',
      minHeight: '100vh',
      overflow: 'hidden',
      fontFamily: "'Cormorant Garamond', serif"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&display=swap" rel="stylesheet" />

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '300',
            letterSpacing: '3px',
            color: '#fff',
            margin: 0,
            textTransform: 'uppercase'
          }}>
            Big Christmas Tree
          </h1>
          <div style={{
            display: 'flex',
            gap: '40px',
            fontSize: '16px',
            letterSpacing: '2px',
            color: '#ccc'
          }}>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }}>Collection</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }}>About</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }}>Contact</a>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '80px'
          }}
        />
      </nav>

      {/* Main Content */}
      <main style={{
        paddingTop: '180px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 180px)'
      }}>
        <div style={{
          position: 'relative',
          width: '90%',
          maxWidth: '1200px',
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Christmas Tree SVG */}
          <svg viewBox="0 0 800 1000" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 40px rgba(255, 215, 0, 0.3))' }}>
            {/* Tree pot */}
            <rect x="340" y="880" width="120" height="100" fill="#8B4513" stroke="#654321" strokeWidth="2" />
            <rect x="330" y="870" width="140" height="20" fill="#A0522D" stroke="#654321" strokeWidth="2" />

            {/* Tree layers - from bottom to top */}
            <ellipse cx="400" cy="850" rx="280" ry="60" fill="#0d4d21" />
            <ellipse cx="400" cy="840" rx="280" ry="55" fill="#0f5a27" />

            <ellipse cx="400" cy="750" rx="260" ry="55" fill="#0d4d21" />
            <ellipse cx="400" cy="740" rx="260" ry="50" fill="#0f5a27" />

            <ellipse cx="400" cy="650" rx="240" ry="55" fill="#0d4d21" />
            <ellipse cx="400" cy="640" rx="240" ry="50" fill="#11662d" />

            <ellipse cx="400" cy="550" rx="220" ry="50" fill="#0d4d21" />
            <ellipse cx="400" cy="540" rx="220" ry="45" fill="#11662d" />

            <ellipse cx="400" cy="460" rx="190" ry="45" fill="#0d4d21" />
            <ellipse cx="400" cy="450" rx="190" ry="40" fill="#137233" />

            <ellipse cx="400" cy="380" rx="160" ry="40" fill="#0d4d21" />
            <ellipse cx="400" cy="370" rx="160" ry="38" fill="#137233" />

            <ellipse cx="400" cy="310" rx="130" ry="35" fill="#0d4d21" />
            <ellipse cx="400" cy="300" rx="130" ry="33" fill="#158239" />

            <ellipse cx="400" cy="250" rx="100" ry="30" fill="#0d4d21" />
            <ellipse cx="400" cy="240" rx="100" ry="28" fill="#158239" />

            <ellipse cx="400" cy="200" rx="70" ry="25" fill="#0d4d21" />
            <ellipse cx="400" cy="190" rx="70" ry="23" fill="#179245" />

            {/* Star on top */}
            <g transform="translate(400, 140)">
              <defs>
                <radialGradient id="starGlow">
                  <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                  <stop offset="50%" stopColor="#FFA500" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="0" cy="0" r="40" fill="url(#starGlow)" />
              <path
                d="M 0,-25 L 6,-8 L 24,-8 L 10,2 L 15,19 L 0,9 L -15,19 L -10,2 L -24,-8 L -6,-8 Z"
                fill="#FFD700"
                stroke="#FFA500"
                strokeWidth="1.5"
              />
              <path
                d="M 0,-20 L 4,-10 L 15,-10 L 6,0 L 10,12 L 0,5 L -10,12 L -6,0 L -15,-10 L -4,-10 Z"
                fill="#FFED4E"
                opacity="0.8"
              />
            </g>

            {/* Ornaments - Gold */}
            <circle cx="320" cy="850" r="12" fill="#FFD700" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="480" cy="840" r="11" fill="#FFD700" opacity="0.9">
              <animate attributeName="opacity" values="1;0.9;1" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="350" cy="750" r="10" fill="#FFD700" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="450" cy="740" r="11" fill="#FFD700" opacity="0.9">
              <animate attributeName="opacity" values="1;0.9;1" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="300" cy="650" r="10" fill="#FFD700" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="640" r="9" fill="#FFD700" opacity="0.9">
              <animate attributeName="opacity" values="1;0.9;1" dur="2.3s" repeatCount="indefinite" />
            </circle>

            {/* Ornaments - Red */}
            <circle cx="380" cy="820" r="11" fill="#DC143C" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2.1s" repeatCount="indefinite" />
            </circle>
            <circle cx="420" cy="810" r="10" fill="#DC143C" opacity="0.9">
              <animate attributeName="opacity" values="1;0.9;1" dur="1.9s" repeatCount="indefinite" />
            </circle>
            <circle cx="370" cy="700" r="10" fill="#DC143C" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="430" cy="690" r="11" fill="#DC143C" opacity="0.9">
              <animate attributeName="opacity" values="1;0.9;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="330" cy="600" r="9" fill="#DC143C" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="470" cy="590" r="10" fill="#DC143C" opacity="0.9">
              <animate attributeName="opacity" values="1;0.9;1" dur="1.8s" repeatCount="indefinite" />
            </circle>

            {/* Ornaments - Silver */}
            <circle cx="360" cy="780" r="10" fill="#C0C0C0" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="440" cy="770" r="11" fill="#C0C0C0" opacity="0.9">
              <animate attributeName="opacity" values="1;0.9;1" dur="2.1s" repeatCount="indefinite" />
            </circle>
            <circle cx="320" cy="680" r="9" fill="#C0C0C0" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="1.9s" repeatCount="indefinite" />
            </circle>
            <circle cx="480" cy="670" r="10" fill="#C0C0C0" opacity="0.9">
              <animate attributeName="opacity" values="1;0.9;1" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="310" cy="570" r="10" fill="#C0C0C0" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="490" cy="560" r="9" fill="#C0C0C0" opacity="0.9">
              <animate attributeName="opacity" values="1;0.9;1" dur="2.2s" repeatCount="indefinite" />
            </circle>

            {/* More ornaments on upper sections */}
            <circle cx="350" cy="500" r="9" fill="#FFD700" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2.1s" repeatCount="indefinite" />
            </circle>
            <circle cx="450" cy="490" r="8" fill="#DC143C" opacity="0.9">
              <animate attributeName="opacity" values="1;0.9;1" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="380" cy="430" r="8" fill="#C0C0C0" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="420" cy="420" r="9" fill="#FFD700" opacity="0.9">
              <animate attributeName="opacity" values="1;0.9;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="360" cy="360" r="8" fill="#DC143C" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="440" cy="350" r="7" fill="#C0C0C0" opacity="0.9">
              <animate attributeName="opacity" values="1;0.9;1" dur="1.9s" repeatCount="indefinite" />
            </circle>
            <circle cx="380" cy="290" r="7" fill="#FFD700" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="420" cy="280" r="7" fill="#DC143C" opacity="0.9">
              <animate attributeName="opacity" values="1;0.9;1" dur="2.1s" repeatCount="indefinite" />
            </circle>

            {/* Garland lights effect */}
            <circle cx="280" cy="850" r="4" fill="#FFED4E">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="520" cy="840" r="4" fill="#FFED4E">
              <animate attributeName="opacity" values="1;0.5;1" dur="1.7s" repeatCount="indefinite" />
            </circle>
            <circle cx="260" cy="750" r="4" fill="#FFED4E">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <circle cx="540" cy="740" r="4" fill="#FFED4E">
              <animate attributeName="opacity" values="1;0.5;1" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="240" cy="650" r="4" fill="#FFED4E">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="560" cy="640" r="4" fill="#FFED4E">
              <animate attributeName="opacity" values="1;0.5;1" dur="1.9s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </main>
    </div>
  )
}
