# Rum River Wedding Barn – Botanical Luxe Theme Spec

(Single Source of Truth – Color & Usage Rules)

## 0. Theme Overview

**Core vibe:**
Nature-first, calm, upscale rustic. UI chrome gets out of the way so barn wood + greenery + people in photos are the stars.

**Key principles:**
1. The frame is green + ivory, not brown.
2. Brown lives in the photography, not as UI paint.
3. Gold and blush are accents only, used sparingly.
4. All combinations must be high contrast, legible, and low-muddy.

---

## 1. Core Brand Palette (Base Hex Colors)

These are the only base colors the system is allowed to use. Anything else must be derived (tints/shades) from these.

| Name | Hex | Usage |
| :--- | :--- | :--- |
| **Forest Ink** | `#1A281F` | Main dark; replaces “warm walnut” as primary UI dark |
| **Ivory Canvas** | `#F7F5F1` | Main page background |
| **Eucalyptus Sage** | `#8FA093` | Primary soft accent / surfaces |
| **Antique Gold** | `#C5A059` | Primary highlight / CTA accent |
| **Soft Rose** | `#D8A7B1` | Micro accent only (tags, small details) |
| **Charcoal** | `#22201F` | For text on light backgrounds where pure black is needed |
| **Line Greige** | `#D7D2C9` | Hairlines, borders, dividers |
| **Overlay Ink** | `#101613` | For overlays, modals, dimming (with opacity) |
| **Error Red** | `#B4443A` | Validation, destructive actions |
| **Success Green** | `#3D6A4D` | Success state (derived from Forest) |

---

## 2. Token Model

### 2.1 Core Tokens (implementation-facing)

These define the raw color values.

```css
:root {
  /* Brand cores */
  --rr-color-forest-ink:    #1A281F;
  --rr-color-ivory-canvas:  #F7F5F1;
  --rr-color-sage:          #8FA093;
  --rr-color-gold:          #C5A059;
  --rr-color-rose:          #D8A7B1;
  --rr-color-charcoal:      #22201F;
  --rr-color-line-greige:   #D7D2C9;
  --rr-color-overlay-ink:   #101613;
  --rr-color-error:         #B4443A;
  --rr-color-success:       #3D6A4D;

  /* Common derived tones (can also be generated in code) */
  --rr-color-ivory-strong:  #F1EEE7; /* slightly darker ivory for cards */
  --rr-color-sage-soft:     #A4B2A6; /* lighter sage for large surfaces */
  --rr-color-sage-deep:     #6F8478; /* darker sage for chips/labels */
  --rr-color-gold-soft:     rgba(197, 160, 89, 0.18);
  --rr-color-ink-soft:      rgba(26, 40, 31, 0.85);
}
```

### 2.2 Semantic Tokens (design-system level)

These are what atoms/recipes should actually reference.

```css
:root {
  /* Backgrounds */
  --rr-bg-page:        var(--rr-color-ivory-canvas);
  --rr-bg-canvas-soft: #FBFAF7; /* very subtle lift over page */
  --rr-bg-surface:     var(--rr-color-ivory-strong);
  --rr-bg-surface-alt: var(--rr-color-sage-soft);
  --rr-bg-hero:        var(--rr-color-ivory-canvas);
  --rr-bg-footer:      #141915; /* near-black green-brown */

  /* Text */
  --rr-text-main:      var(--rr-color-forest-ink);
  --rr-text-soft:      rgba(26, 40, 31, 0.72);
  --rr-text-on-dark:   #FDFBF7;
  --rr-text-accent:    var(--rr-color-gold);
  --rr-text-meta:      rgba(26, 40, 31, 0.55);
  --rr-text-error:     var(--rr-color-error);

  /* Borders / lines */
  --rr-border-subtle:  var(--rr-color-line-greige);
  --rr-border-strong:  rgba(26, 40, 31, 0.28);

  /* Brand accents */
  --rr-accent-primary:     var(--rr-color-gold);       /* primary CTA, key highlights */
  --rr-accent-secondary:   var(--rr-color-sage);       /* pills, chips, secondary buttons */
  --rr-accent-tertiary:    var(--rr-color-rose);       /* micro moments only */
  --rr-accent-focus-ring:  rgba(197, 160, 89, 0.75);   /* gold-ish focus outline */

  /* States */
  --rr-state-hover:        rgba(26, 40, 31, 0.04);     /* light hover wash on light bg */
  --rr-state-pressed:      rgba(26, 40, 31, 0.08);
  --rr-state-selected:     rgba(143, 160, 147, 0.18);  /* sage tint */
  --rr-state-disabled:     rgba(26, 40, 31, 0.28);

  /* Overlays */
  --rr-overlay-scrim:      rgba(16, 22, 19, 0.58);     /* modals / lightboxes */
}
```

---

## 3. Usage Rules by Role

### 3.1 Page / Global
*   **Page background:** `--rr-bg-page` everywhere. No random off-whites.
*   **Default body text:** `--rr-text-main` on `--rr-bg-page` or `--rr-bg-surface`.
*   **Global dividers:** `--rr-border-subtle` only. Never use darker than `--rr-border-strong` for typical lines.

### 3.2 Typography
*   **H1/Hero headings:** `--rr-text-main`
*   **H2/H3 section titles:** `--rr-text-main`
*   **Kicker/eyebrow text** (e.g. “The Venue”, “Real weddings”): `--rr-text-accent` (gold) or `--rr-text-meta` on light backgrounds.
*   **Body copy:** `--rr-text-main`
*   **Small meta** (labels, legal, timestamps): `--rr-text-meta`

*Never set long body copy in sage or rose. Those are for accents and labels only.*

### 3.3 Buttons & Links

**Primary CTA** (e.g. “Schedule a tour”, “Check availability”):
*   **Background:** `--rr-accent-primary` (gold)
*   **Text:** `--rr-text-on-dark`
*   **Border:** none or 1px `--rr-accent-primary`
*   **Hover:** slightly darker gold or overlay: `background: linear-gradient(90deg, #B99545, #CFAE60);`
*   **Active/pressed:** add `box-shadow: inset 0 0 0 1px rgba(0,0,0,0.15)` and slightly darken.

**Secondary button** (ghost / outline):
*   **Background:** transparent
*   **Text:** `--rr-text-main`
*   **Border:** `--rr-accent-secondary` (sage)
*   **Hover:** light sage fill: `background-color: rgba(143, 160, 147, 0.12);`

**Text links:**
*   **Default:** `color: var(--rr-accent-secondary);` (sage)
*   **Hover:** darken sage slightly or add underline: `text-decoration: underline;`
*   *Do not use gold as default inline link color; reserve gold for high-impact CTAs / badges.*

### 3.4 Cards / Surfaces

**Default card** (info, FAQs, pricing snippets):
*   **Background:** `--rr-bg-surface`
*   **Border:** `--rr-border-subtle`
*   **Heading:** `--rr-text-main`
*   **Body:** `--rr-text-soft`
*   **Subtle highlight stripe or tag:** use `--rr-accent-secondary` (sage) or `--rr-accent-primary` (gold) as a 2–4px top border, not entire background.

**Highlight card** (e.g. testimonial, featured wedding):
*   **Background:** `--rr-bg-surface-alt` (sage-soft) OR ivory surface with gold border.
*   **Text:** `--rr-text-main` (never white on sage; contrast stays high).
*   **Quote marks or small icon:** `--rr-accent-primary` or `--rr-accent-tertiary`.

### 3.5 Hero / Masthead

**Hero background rules:**
*   **Default hero BG:** `--rr-bg-hero` (ivory) with a large photo doing the heavy lifting.
*   **Optional overlay gradient for hero image:**

```css
--rr-hero-gradient: linear-gradient(
  135deg,
  rgba(16, 22, 19, 0.75) 0%,
  rgba(16, 22, 19, 0.35) 40%,
  rgba(247, 245, 241, 0.0) 100%
);
```

**Usage:**
*   On image-heavy hero: `background-image: var(--rr-hero-gradient), url(...);`
*   Hero title over image: `--rr-text-on-dark`
*   Kicker/tagline: `--rr-text-on-dark` with `opacity: 0.85`

*Never use full-screen gold or rose hero backgrounds. Those colors should highlight content, not be the entire viewport.*

### 3.6 Sections

Define a small set of allowed section patterns:

1.  **Standard light section**
    *   Background: `--rr-bg-page`
    *   Headings: `--rr-text-main`
    *   Dividers: `--rr-border-subtle`
2.  **Framed section** (e.g. pricing, key details)
    *   Background: `--rr-bg-surface`
    *   Card(s) on top: same or `--rr-bg-page` with border.
3.  **Sage wash section** (use sparingly)
    *   Background: `--rr-bg-surface-alt` (sage-soft)
    *   Only for short bands: callouts, testimonials, “as seen in,” etc.
4.  **Hero-adjacent section** (just under hero)
    *   Background: `--rr-bg-page`
    *   Use gold or sage for horizontal rules, but keep 80–90% of the area light.

### 3.7 Footer
*   **Background:** `--rr-bg-footer` (#141915)
*   **Text:** `--rr-text-on-dark`
*   **Links:** `color: var(--rr-accent-secondary);` (sage) or soft gold `rgba(197,160,89,0.9)`
*   **Dividers:** `rgba(255,255,255,0.12)`

*No pink in the footer.*

---

## 4. States & Feedback
*   **Focus (keyboard):** Use `box-shadow: 0 0 0 2px var(--rr-accent-focus-ring);` on focusable elements.
*   **Error:**
    *   Text / labels: `--rr-text-error`
    *   Border: `--rr-color-error`
    *   Background (for error chips): `rgba(180, 68, 58, 0.10)`
*   **Success:**
    *   Icons / checkmarks: `--rr-color-success`
    *   Chips / badges background: `rgba(61, 106, 77, 0.10)`

/* ... (previous content) ... */

## 4.5 Dark Theme Overrides

These values override the default light theme when `[data-theme='dark']` is active.

```css
:root[data-theme='dark'] {
  /* Dark backgrounds flip: page is deep forest, surfaces are dark-sage/charcoal */
  --rr-bg-page:        #050806;              /* almost-black green */
  --rr-bg-canvas-soft: #0C110E;
  --rr-bg-surface:     #141915;              /* dark footer tone reused */
  --rr-bg-surface-alt: #1E2721;              /* dark sage-leaning surface */
  --rr-bg-hero:        #050806;
  --rr-bg-footer:      #020404;

  /* Text in dark: mostly ivory with softer variants */
  --rr-text-main:      #F7F5F1;
  --rr-text-soft:      rgba(247, 245, 241, 0.78);
  --rr-text-on-dark:   #FDFBF7;
  --rr-text-accent:    var(--rr-color-gold);  /* gold still works on dark */
  --rr-text-meta:      rgba(247, 245, 241, 0.62);
  --rr-text-error:     #F9A59A;              /* lighter red on dark */

  /* Borders in dark: lighter than bg, low-contrast */
  --rr-border-subtle:  rgba(247, 245, 241, 0.12);
  --rr-border-strong:  rgba(247, 245, 241, 0.22);

  /* Accents: same hues, slightly stronger use allowed */
  --rr-accent-primary:     var(--rr-color-gold);
  --rr-accent-secondary:   #A8B9AC;          /* slightly lighter sage for contrast */
  --rr-accent-tertiary:    #E0B4C0;          /* brighter rose */
  --rr-accent-focus-ring:  rgba(197, 160, 89, 0.85);

  /* States in dark: light-on-dark washes */
  --rr-state-hover:        rgba(247, 245, 241, 0.06);
  --rr-state-pressed:      rgba(247, 245, 241, 0.10);
  --rr-state-selected:     rgba(143, 160, 147, 0.25);
  --rr-state-disabled:     rgba(247, 245, 241, 0.35);

  --rr-overlay-scrim:      rgba(5, 8, 6, 0.82);

  /* Component-level dark variants */
  --hero-bg-warm: linear-gradient(
    135deg,
    rgba(5, 8, 6, 0.95) 0%,
    rgba(5, 8, 6, 0.78) 40%,
    rgba(5, 8, 6, 0.0) 100%
  );

  --hero-bg-glass-light: rgba(20, 25, 21, 0.8);
  --hero-bg-glass-dark:  rgba(5, 8, 6, 0.85);

  --overlay-card-bottom: linear-gradient(
    180deg,
    rgba(5, 8, 6, 0.0) 0%,
    rgba(5, 8, 6, 0.9) 100%
  );

  --mosaic-highlight: linear-gradient(
    120deg,
    rgba(247, 245, 241, 0.06),
    rgba(247, 245, 241, 0.0)
  );

  --feature-shell-spotlight: radial-gradient(
    circle at top,
    rgba(247, 245, 241, 0.12),
    rgba(5, 8, 6, 0.95)
  );

  --feature-shell-outline: rgba(247, 245, 241, 0.26);
}
```

---

## 5. Old → New Mapping (for your existing tokens)

If you already have these tokens in the codebase, this is how they should be repointed under Botanical Luxe:

*   `--warm-walnut` → **deprecated** as a primary color. If you must keep the name for compatibility, change its value to `#1A281F` and treat it as forest-ink, or better: migrate to new token names.
*   `--dusty-rose` → re-map to `--rr-color-rose` (#D8A7B1) and restrict usage to small accents only.
*   `--sage-green` → re-map to `--rr-color-sage` (#8FA093) and use as primary accent/secondary background.
*   `--accent-gold` / `--champagne-gold` → consolidate to `--rr-color-gold` (#C5A059) plus `--rr-color-gold-soft` for tints.
*   `--romantic-ivory` / `--cream-pearl` → consolidate to `--rr-color-ivory-canvas` (#F7F5F1) for page BG and `--rr-color-ivory-strong` for cards.

*Goal: you end up with one ivory, one gold, one sage, not three slightly different versions fighting each other.*

---

## 6. Hard “Do / Don’t” Rules

**Do:**
*   Use ivory as the default background everywhere.
*   Use forest ink or charcoal for nearly all text.
*   Use sage for:
    *   secondary buttons
    *   tags/chips
    *   subtle section backgrounds
*   Use gold only where you want immediate attention:
    *   primary buttons
    *   key dividers / small icons
    *   important numbers or labels
*   Keep blush/rose to micro accents: small tags, highlights, subtle badges.

**Don’t:**
*   Don’t use brown UI panels, nav bars, or full sections.
*   Don’t put long text on sage or rose backgrounds.
*   Don’t use more than two accents at once in a single module (e.g. sage + gold is fine; sage + gold + rose in one card is not).
*   Don’t invent new random off-whites, greys, or greens; stick to the defined tokens.
