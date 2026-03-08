function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export function useCanvasExport() {
  async function exportCard({ role, photoSrc, photoTransform }) {
    const SCALE = 2
    const W = 500
    const H = 500

    const canvas = document.createElement('canvas')
    canvas.width = W * SCALE
    canvas.height = H * SCALE
    const ctx = canvas.getContext('2d')
    ctx.scale(SCALE, SCALE)

    await document.fonts.ready

    // ── BACKGROUND ──────────────────────────────────────────────────────────
    ctx.fillStyle = '#000814'
    ctx.fillRect(0, 0, W, H)

    const g1 = ctx.createRadialGradient(350, 150, 0, 350, 150, 300)
    g1.addColorStop(0, 'rgba(0,100,180,0.5)')
    g1.addColorStop(1, 'transparent')
    ctx.fillStyle = g1
    ctx.fillRect(0, 0, W, H)

    const g2 = ctx.createRadialGradient(100, 400, 0, 100, 400, 250)
    g2.addColorStop(0, 'rgba(0,207,255,0.2)')
    g2.addColorStop(1, 'transparent')
    ctx.fillStyle = g2
    ctx.fillRect(0, 0, W, H)

    const g3 = ctx.createRadialGradient(450, 450, 0, 450, 450, 200)
    g3.addColorStop(0, 'rgba(255,30,0,0.1)')
    g3.addColorStop(1, 'transparent')
    ctx.fillStyle = g3
    ctx.fillRect(0, 0, W, H)

    // ── GRID ─────────────────────────────────────────────────────────────────
    ctx.strokeStyle = 'rgba(0,207,255,0.07)'
    ctx.lineWidth = 1
    for (let x = 0; x <= W; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
    }
    for (let y = 0; y <= H; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
    }

    // ── SCANLINES ────────────────────────────────────────────────────────────
    ctx.fillStyle = 'rgba(0,0,0,0.10)'
    for (let y = 2; y < H; y += 4) {
      ctx.fillRect(0, y, W, 2)
    }

    // ── TOP BAR ──────────────────────────────────────────────────────────────
    ctx.strokeStyle = 'rgba(0,207,255,0.3)'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(0, 40); ctx.lineTo(W, 40); ctx.stroke()

    // Terminal dots: x padding 16, gap 5, dot size 10
    const dotColors = ['#ff5f57', '#febc2e', '#28c840']
    dotColors.forEach((color, i) => {
      const cx = 16 + i * 15 + 5
      ctx.beginPath()
      ctx.arc(cx, 20, 5, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
    })

    // Topbar title — terminal-dots group is 40px wide, gap 8, title margin-left 10
    ctx.font = '10px "Share Tech Mono"'
    ctx.fillStyle = 'rgba(0,207,255,0.6)'
    ctx.fillText('HTP_2026.exe', 76, 24)

    // Cursor block
    ctx.fillStyle = '#00CFFF'
    ctx.fillRect(76 + ctx.measureText('HTP_2026.exe').width + 3, 12, 7, 12)

    // ── HEADLINE ─────────────────────────────────────────────────────────────
    // Role text: Rajdhani 600 30px at top:52, left:18
    ctx.font = '600 30px Rajdhani'
    ctx.fillStyle = 'rgba(255,255,255,0.92)'
    ctx.fillText(role, 18, 79)

    // "HACK THE / PLANET CTF": Press Start 2P 16px, yellow + red shadow
    // margin-top:8 after role, line-height:1.75 → 28px per line
    const eventY1 = 79 + 8 + 20   // ~107, first line baseline
    const eventY2 = eventY1 + 28  // second line

    ctx.font = '16px "Press Start 2P"'
    // Red offset shadow (2px 2px)
    ctx.fillStyle = '#FF2200'
    ctx.fillText('HACK THE', 20, eventY1 + 2)
    ctx.fillText('PLANET CTF', 20, eventY2 + 2)
    // Main yellow text
    ctx.fillStyle = '#FFD700'
    ctx.shadowColor = 'rgba(255,215,0,0.6)'
    ctx.shadowBlur = 14
    ctx.fillText('HACK THE', 18, eventY1)
    ctx.fillText('PLANET CTF', 18, eventY2)
    ctx.shadowBlur = 0

    // ── PHOTO CIRCLE ─────────────────────────────────────────────────────────
    // bottom:68px, left:20px, size:200×200 → top = 500-68-200 = 232
    const px = 20, py = 232, pr = 100   // left, top, radius
    const pcx = px + pr, pcy = py + pr  // center (120, 332)
    const borderW = 4
    const innerR = pr - borderW

    if (photoSrc) {
      const img = await loadImage(photoSrc)

      // Replicate CSS background-size/position logic exactly:
      // background-size: scale% → rendered width = containerSize * scale/100
      const containerSize = pr * 2  // 200
      const renderedW = containerSize * (photoTransform.scale / 100)
      const renderedH = renderedW * (img.naturalHeight / img.naturalWidth)

      // background-position: calc(50% + x) calc(50% + y)
      // offset = 50% of (container - image) + user offset
      const drawX = px + (containerSize - renderedW) / 2 + photoTransform.x
      const drawY = py + (containerSize - renderedH) / 2 + photoTransform.y

      ctx.save()
      ctx.beginPath()
      ctx.arc(pcx, pcy, innerR, 0, Math.PI * 2)
      ctx.clip()
      ctx.drawImage(img, drawX, drawY, renderedW, renderedH)
      ctx.restore()
    } else {
      ctx.beginPath()
      ctx.arc(pcx, pcy, innerR, 0, Math.PI * 2)
      ctx.fillStyle = '#0a0a1a'
      ctx.fill()
    }

    // Inner dark vignette
    const vig = ctx.createRadialGradient(pcx, pcy, innerR * 0.6, pcx, pcy, innerR)
    vig.addColorStop(0, 'transparent')
    vig.addColorStop(1, 'rgba(0,0,0,0.5)')
    ctx.beginPath()
    ctx.arc(pcx, pcy, innerR, 0, Math.PI * 2)
    ctx.fillStyle = vig
    ctx.fill()

    // Outer glow ring
    ctx.beginPath()
    ctx.arc(pcx, pcy, pr, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(0,207,255,0.35)'
    ctx.lineWidth = 20
    ctx.stroke()

    // Black spacer ring (0 0 0 2px #000 in box-shadow)
    ctx.beginPath()
    ctx.arc(pcx, pcy, pr + 2, 0, Math.PI * 2)
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 4
    ctx.stroke()

    // Neon blue border
    ctx.beginPath()
    ctx.arc(pcx, pcy, pr - borderW / 2, 0, Math.PI * 2)
    ctx.strokeStyle = '#00CFFF'
    ctx.lineWidth = borderW
    ctx.stroke()

    // ── GLOBE LOGO ────────────────────────────────────────────────────────────
    // Drawn before info block so text renders on top (matches z-index: 5 vs 6)
    try {
      const logo = await loadImage('/logo.png')
      // Match CSS: top:-55px, right:-55px, width:400px, height:400px, object-fit:contain
      const cW = 400, cH = 400
      const cX = W - cW + 55  // right:-55px → right edge at W+55, left edge at W+55-400
      const cY = -55
      const s = Math.min(cW / logo.naturalWidth, cH / logo.naturalHeight)
      const drawW = logo.naturalWidth * s
      const drawH = logo.naturalHeight * s
      const drawX = cX + (cW - drawW) / 2
      const drawY = cY + (cH - drawH) / 2
      ctx.save()
      ctx.shadowColor = 'rgba(0,207,255,0.5)'
      ctx.shadowBlur = 16
      ctx.drawImage(logo, drawX, drawY, drawW, drawH)
      ctx.restore()
    } catch {
      // logo missing, skip
    }

    // ── INFO BLOCK ───────────────────────────────────────────────────────────
    // CSS: top:225px, left:250px, padding-left:18px, flex-col gap:6px
    const ix = 268
    let iy = 280

    // "CYBERSECURITY CTF" — .loc: 11px Share Tech Mono, #00CFFF 0.85
    ctx.font = '11px "Share Tech Mono"'
    ctx.fillStyle = '#00CFFF'
    ctx.globalAlpha = 0.85
    ctx.fillText('CYBERSECURITY CTF', ix, iy + 11)
    ctx.globalAlpha = 1
    iy += 14 + 6  // item height + gap

    // Divider (margin: 2px 0)
    iy += 2
    ctx.strokeStyle = 'rgba(0,207,255,0.25)'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(482, iy); ctx.stroke()
    iy += 1 + 2 + 6  // line + margin-bottom + gap

    // "20-21 MARCH 2026" — .date-big: Press Start 2P 12px, line-height:1.6
    ctx.font = '12px "Press Start 2P"'
    ctx.fillStyle = '#00CFFF'
    ctx.shadowColor = 'rgba(0,207,255,0.35)'
    ctx.shadowBlur = 12
    ctx.fillText('20-21 MARCH 2026', ix, iy + 12)
    ctx.shadowBlur = 0
    iy += Math.round(12 * 1.6) + 6  // 19px + gap

    // Divider (margin: 2px 0)
    iy += 2
    ctx.strokeStyle = 'rgba(0,207,255,0.25)'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(482, iy); ctx.stroke()
    iy += 1 + 2 + 6  // line + margin-bottom + gap

    // "SAIT DOWNTOWN CAMPUS" — .venue: 11px Share Tech Mono, white 0.8
    ctx.font = '11px "Share Tech Mono"'
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.fillText('SAIT DOWNTOWN CAMPUS', ix, iy + 11)
    iy += 14 + 6

    // "CALGARY, AB" — .loc: 11px, #00CFFF 0.85
    ctx.fillStyle = '#00CFFF'
    ctx.globalAlpha = 0.85
    ctx.fillText('CALGARY, AB', ix, iy + 11)
    ctx.globalAlpha = 1

    // ── BOTTOM BAR ────────────────────────────────────────────────────────────
    ctx.strokeStyle = 'rgba(0,207,255,0.3)'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(0, 490); ctx.lineTo(W, 490); ctx.stroke()

    // ── CARD BORDER ───────────────────────────────────────────────────────────
    ctx.strokeStyle = '#00CFFF'
    ctx.lineWidth = 2
    ctx.strokeRect(1, 1, W - 2, H - 2)

    return canvas.toDataURL('image/png')
  }

  return { exportCard }
}
