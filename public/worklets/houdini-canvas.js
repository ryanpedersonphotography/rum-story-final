/* global registerPaint */

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const toNumber = (input, fallback) => {
  const parsed = parseFloat(input)
  return Number.isFinite(parsed) ? parsed : fallback
}

const toColor = (input, fallback) => {
  const value = String(input || '').trim()
  return value.length ? value : fallback
}

const createRng = (seed = 1) => {
  let t = seed >>> 0
  return () => {
    t += 0x6D2B79F5
    let x = Math.imul(t ^ (t >>> 15), 1 | t)
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x)
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}

class HoudiniCanvasPainter {
  static get inputProperties() {
    return [
      '--houdini-color-primary',
      '--houdini-color-secondary',
      '--houdini-intensity',
      '--houdini-detail',
      '--houdini-seed',
      '--houdini-direction',
      '--houdini-variant',
    ]
  }

  paint(ctx, geom, properties) {
    const width = geom.width
    const height = geom.height

    const primary = toColor(properties.get('--houdini-color-primary'), '#d7c9bb')
    const secondary = toColor(properties.get('--houdini-color-secondary'), '#3d5a45')
    const intensity = clamp(toNumber(properties.get('--houdini-intensity'), 0.6), 0, 1)
    const detail = clamp(toNumber(properties.get('--houdini-detail'), 0.5), 0, 1)
    const seed = toNumber(properties.get('--houdini-seed'), 1)
    const direction = (properties.get('--houdini-direction') || 'horizontal').toString().trim() || 'horizontal'
    const variant = (properties.get('--houdini-variant') || 'wash').toString().trim() || 'wash'

    const rng = createRng(seed * 10 + height)

    ctx.clearRect(0, 0, width, height)

    switch (variant) {
      case 'divider':
        this.drawDivider(ctx, width, height, { primary, secondary, intensity, detail, direction, rng })
        break
      case 'flourish':
        this.drawFlourish(ctx, width, height, { primary, secondary, intensity, detail, rng })
        break
      case 'custom':
        this.drawWash(ctx, width, height, { primary, secondary, intensity, detail, direction, rng })
        break
      case 'wash':
      default:
        this.drawWash(ctx, width, height, { primary, secondary, intensity, detail, direction, rng })
        break
    }
  }

  drawDivider(ctx, width, height, { primary, secondary, intensity, detail, direction, rng }) {
    const waves = 2 + Math.round(detail * 4)
    const amplitude = height * clamp(0.2 + detail * 0.6, 0.15, 0.85)
    const offset = direction === 'vertical' ? width / 2 : height / 2

    ctx.beginPath()
    ctx.moveTo(0, offset)

    for (let i = 0; i < waves; i += 1) {
      const progress = (i + 1) / waves
      const x = progress * width
      const variance = (rng() - 0.5) * amplitude * 0.3
      const y = offset + Math.sin(progress * Math.PI * 2) * amplitude * 0.3 + variance
      const cp1x = x - (width / waves) * 0.5
      const cp2x = x - (width / waves) * 0.25
      const cp1y = offset + Math.sin(progress * Math.PI * 2 - Math.PI / 2) * amplitude * 0.25
      const cp2y = offset + Math.sin(progress * Math.PI * 2 - Math.PI / 4) * amplitude * 0.25
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
    }

    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()

    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, secondary)
    gradient.addColorStop(1, primary)

    ctx.fillStyle = gradient
    ctx.globalAlpha = clamp(0.6 + intensity * 0.4, 0, 1)
    ctx.fill()

    ctx.globalAlpha = 1
    ctx.lineWidth = Math.max(2, intensity * 8)
    ctx.strokeStyle = secondary
    ctx.stroke()
  }

  drawWash(ctx, width, height, { primary, secondary, intensity, detail, direction, rng }) {
    const layers = 3 + Math.round(detail * 4)

    const gradient = direction === 'vertical'
      ? ctx.createLinearGradient(0, 0, 0, height)
      : ctx.createLinearGradient(0, 0, width, height)

    gradient.addColorStop(0, secondary)
    gradient.addColorStop(1, primary)

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    for (let i = 0; i < layers; i += 1) {
      const opacity = clamp(intensity * (0.4 + i / layers), 0.05, 0.45)
      ctx.globalAlpha = opacity
      ctx.fillStyle = secondary
      this.drawOrganicBlob(ctx, width, height, rng, detail)
    }

    ctx.globalAlpha = 1
  }

  drawFlourish(ctx, width, height, { primary, secondary, intensity, detail, rng }) {
    ctx.fillStyle = primary
    ctx.globalAlpha = 0.35 + intensity * 0.4
    ctx.fillRect(0, 0, width, height)
    ctx.globalAlpha = 1

    const strokes = 2 + Math.round(detail * 4)
    for (let i = 0; i < strokes; i += 1) {
      const startX = rng() * width * 0.5
      const startY = rng() * height
      const radius = Math.max(width, height) * (0.3 + detail * 0.4)
      const endAngle = Math.PI * (1 + detail)

      ctx.beginPath()
      ctx.strokeStyle = secondary
      ctx.lineWidth = Math.max(2, intensity * 10)
      ctx.arc(startX, startY, radius, 0, endAngle, i % 2 === 0)
      ctx.stroke()
    }
  }

  drawOrganicBlob(ctx, width, height, rng, detail) {
    const points = 4 + Math.round(detail * 6)
    const radius = Math.min(width, height) * (0.2 + detail * 0.5)
    const centerX = width * (0.2 + rng() * 0.6)
    const centerY = height * (0.2 + rng() * 0.6)

    ctx.beginPath()
    for (let i = 0; i <= points; i += 1) {
      const angle = (i / points) * Math.PI * 2
      const distortion = 0.6 + rng() * 0.6
      const x = centerX + Math.cos(angle) * radius * distortion
      const y = centerY + Math.sin(angle) * radius * distortion
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.quadraticCurveTo(centerX, centerY, x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
  }
}

if (typeof registerPaint !== 'undefined') {
  registerPaint('houdini-canvas', HoudiniCanvasPainter)
}
