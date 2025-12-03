let registrationPromise: Promise<void> | null = null
let customPropertiesRegistered = false

const CUSTOM_PROPERTIES = [
  { name: '--houdini-color-primary', syntax: '<color>', inherits: true, initialValue: '#ffffff' },
  { name: '--houdini-color-secondary', syntax: '<color>', inherits: true, initialValue: '#000000' },
  { name: '--houdini-intensity', syntax: '<number>', inherits: true, initialValue: '0.5' },
  { name: '--houdini-detail', syntax: '<number>', inherits: true, initialValue: '0.6' },
  { name: '--houdini-seed', syntax: '<number>', inherits: true, initialValue: '1' },
  { name: '--houdini-direction', syntax: '<custom-ident>', inherits: true, initialValue: 'horizontal' },
  { name: '--houdini-variant', syntax: '<custom-ident>', inherits: true, initialValue: 'wash' },
]

type CSSPaintModule = {
  addModule: (input: string) => Promise<void>
}

type CSSWithExtensions = {
  paintWorklet?: CSSPaintModule
  registerProperty?: (definition: CSSPropertyDefinition) => void
}

const getCSS = (): (typeof window.CSS & CSSWithExtensions) | undefined =>
  typeof window !== 'undefined' && typeof window.CSS !== 'undefined'
    ? (window.CSS as typeof window.CSS & CSSWithExtensions)
    : undefined

const supportsPaintWorklet = () => Boolean(getCSS()?.paintWorklet)

const supportsRegisterProperty = () => typeof getCSS()?.registerProperty === 'function'

function registerCustomProperties() {
  if (customPropertiesRegistered) return
  if (!supportsRegisterProperty()) {
    customPropertiesRegistered = true
    return
  }

  const css = getCSS()
  CUSTOM_PROPERTIES.forEach((definition) => {
    try {
      css?.registerProperty?.(definition)
    } catch {
      // Ignore duplicates
    }
  })

  customPropertiesRegistered = true
}

type CSSPropertyDefinition = {
  name: string
  syntax: string
  inherits: boolean
  initialValue: string
}

export function ensureHoudiniCanvas(): Promise<void> {
  if (!supportsPaintWorklet()) {
    return Promise.resolve()
  }

  if (!registrationPromise) {
    registerCustomProperties()
    const css = getCSS()
    registrationPromise = css?.paintWorklet?.addModule('/worklets/houdini-canvas.js').catch((error: unknown) => {
      console.error('[HoudiniCanvas] Failed to load paint worklet', error)
    }) ?? Promise.resolve()
  }

  return registrationPromise
}

export function isHoudiniCanvasSupported() {
  return supportsPaintWorklet()
}
