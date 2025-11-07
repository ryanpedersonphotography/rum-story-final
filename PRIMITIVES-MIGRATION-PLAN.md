# PRIMITIVES MIGRATION PLAN

**Goal:** Migrate to the new Section system and refactor primitives safely, without breaking production or Storyblok preview.

---

## 0) Repo Safety & Working Branch

```bash
# ensure clean index
git status

# stash any local work (kept locally, not pushed)
git stash push -m "pre-migration-safety"

# create a fresh feature branch
git switch -c refactor/sections-primitives
```

---

## 1) File & Folder Layout (authoritative)

```
src/
  components/
    layout/
      Section.tsx              # NEW (scaffold below)
    primitives/
      Media.tsx                # NEW wrapper around next/image
      Card/
        Card.tsx               # NEW façade + slot subcomponents
        Card.css               # NEW (tokens only)
  content-mocks/
    home.json                  # Mock data for development
  types/
    layout.ts                  # NEW types (SectionProps, etc.)
styles/
  components/
    section-system.css         # NEW (all Section data-attr CSS)
legacy/
  sections/                    # MOVE old section components here
  css/                         # MOVE legacy section CSS here
```

**Commands** (adjust paths as needed):

```bash
mkdir -p src/components/layout src/components/primitives/Card src/content-mocks src/types styles/components legacy/sections legacy/css

# Move legacy section components (examples)
git mv src/components/ui/Section.tsx legacy/sections/Section.tsx || true
git mv src/components/ui/SectionShell.tsx legacy/sections/SectionShell.tsx || true
git mv src/components/ui/SectionEnhanced.tsx legacy/sections/SectionEnhanced.tsx || true

# Move legacy CSS (examples)
git mv src/styles/components/section.css legacy/css/section.css || true
git mv src/styles/components/section.variants.css legacy/css/section.variants.css || true
git mv src/styles/components/section.wrapper.css legacy/css/section.wrapper.css || true

# Create new files
touch src/components/layout/Section.tsx
touch src/components/primitives/Media.tsx
touch src/components/primitives/Card/Card.tsx
touch src/components/primitives/Card/Card.css
touch src/styles/components/section-system.css
touch src/types/layout.ts
```

---

## 2) ESLint Guardrails (block legacy imports)

In `.eslintrc.*` add:

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          "@/components/ui/Section*",
          "@/styles/components/section*"
        ]
      }
    ]
  }
}
```

**Optional (strict):** prevent importing from legacy/ except demo pages:

```json
{
  "overrides": [
    {
      "files": ["src/**/*.{ts,tsx}"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": ["@/legacy/*"]
          }
        ]
      }
    },
    {
      "files": ["src/app/demo/**"],
      "rules": {
        "no-restricted-imports": "off"
      }
    }
  ]
}
```

---

## 3) Type Definitions

**src/types/layout.ts**

```typescript
export type SectionLayer = 'base' | 'partial' | 'isolated';
export type SectionWidth = 'prose' | 'content' | 'wide' | 'full';
export type SectionAlign = 'left' | 'center' | 'right';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  layer?: SectionLayer;
  width?: SectionWidth;
  align?: SectionAlign;
  elevation?: 0 | 1 | 2 | 3;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}
```

---

## 4) New Section Component (scaffold)

**src/components/layout/Section.tsx**

```typescript
import * as React from 'react';
import type { SectionProps } from '@/types/layout';
import { cx } from '@/lib/react-interop'; // or simple join if you prefer

const DEFAULTS = {
  layer: 'base' as const,
  width: 'content' as const,
  align: 'center' as const,
  elevation: 0 as const,
  as: 'section' as const
};

export function Section(props: SectionProps) {
  const {
    layer = DEFAULTS.layer,
    width = DEFAULTS.width,
    align = DEFAULTS.align,
    elevation = DEFAULTS.elevation,
    as: Tag = DEFAULTS.as,
    className,
    children,
    ...rest
  } = props;

  return (
    <Tag
      data-layer={layer}
      data-width={width}
      data-align={align}
      data-elevation={elevation}
      className={cx('section', className)}
      {...rest}
    >
      <div className="section__container">{children}</div>
    </Tag>
  );
}

export default Section;
```

---

## 5) Section CSS (tokens + data attributes)

**src/styles/components/section-system.css**

```css
.section {
  /* rail offset support */
  margin-top: calc(var(--rail-toolbar-height, 0px) * -1);
  padding-top: var(--rail-toolbar-height, 0px);
}

@media (max-width: 768px) {
  .section {
    margin-top: 0;
    padding-top: var(--space-component-md, 24px);
  }
}

.section__container {
  width: var(--section-width, min(1200px, 100vw - var(--gutter, 24px) * 2));
  margin-inline: auto;
  padding-inline: var(--space-component-lg, 24px);
}

/* Width mapping */
.section[data-width="prose"]  { --section-width: min(65ch, 100vw - var(--gutter, 24px) * 2); }
.section[data-width="content"]{ --section-width: min(1200px, 100vw - var(--gutter, 24px) * 2); }
.section[data-width="wide"]   { --section-width: min(1400px, 100vw - var(--gutter, 24px) * 2); }
.section[data-width="full"]   { --section-width: 100vw; padding-inline: 0; }

/* Layer mapping (with safe fallbacks) */
.section[data-layer="base"] {
  background: var(--section-layer-base, var(--surface-0, transparent));
}
.section[data-layer="partial"] {
  background: var(--section-layer-partial, var(--surface-1, transparent));
}
.section[data-layer="isolated"] {
  background: var(--section-layer-isolated, var(--surface-2, transparent));
}

/* Align mapping */
.section[data-align="left"]   { display: flex; justify-content: flex-start; }
.section[data-align="center"] { display: flex; justify-content: center; }
.section[data-align="right"]  { display: flex; justify-content: flex-end; }

/* Elevation mapping */
.section[data-elevation="0"] { box-shadow: none; }
.section[data-elevation="1"] { box-shadow: var(--shadow-elev-1, 0 4px 14px oklch(0 0 0 / .08)); }
.section[data-elevation="2"] { box-shadow: var(--shadow-elev-2, 0 12px 28px oklch(0 0 0 / .15)); }
.section[data-elevation="3"] { box-shadow: var(--shadow-elev-3, 0 24px 54px oklch(0 0 0 / .22)); }
```

**Import section-system.css** near your global component imports (after tokens), or directly in your layout file:

```typescript
import '@/styles/components/section-system.css';
```

---

## 6) Media Primitive (wrapper around next/image)

**src/components/primitives/Media.tsx**

```typescript
'use client';

import Image, { ImageProps } from 'next/image';
import * as React from 'react';

type Ratio = '1/1' | '4/3' | '16/9' | '21/9';
type Fit = 'cover' | 'contain' | 'fill';

interface MediaProps extends Omit<ImageProps, 'fill'> {
  ratio?: Ratio;
  fit?: Fit;
  priority?: boolean;
  className?: string;
}

const ratioToPercent: Record<Ratio, string> = {
  '1/1':  '100%',
  '4/3':  '75%',
  '16/9': '56.25%',
  '21/9': '42.86%'
};

export default function Media({
  ratio = '16/9',
  fit = 'cover',
  className,
  alt,
  ...img
}: MediaProps) {
  return (
    <div className={className} style={{ position: 'relative', width: '100%' }}>
      <div style={{ paddingTop: ratioToPercent[ratio] }} />
      <Image
        {...img}
        alt={alt}
        fill
        style={{ objectFit: fit }}
        sizes="(min-width: 1200px) 1200px, 100vw"
      />
    </div>
  );
}
```

---

## 7) Deprecate Alternating Blocks (safely)

- Move `alternating-blocks.css` to `legacy/css/`.
- Add a banner comment to each legacy file:

```typescript
/** @deprecated Moved to Section system. Do not import in new code. */
```

- If needed, export a no-op proxy for runtime compatibility during migration, but prefer removing imports and replacing with Section.

---

## 8) Demo Route (confidence check)

Create `/app/demo/sections/page.tsx` that renders:
- One section per combination you care about (layer, width, align, elevation)
- One or two leaf components (e.g., WhyCard using existing Heading, Text, Button)

---

## 9) Lint & Dead Code Checks

```bash
# Typecheck (if TS)
npm run typecheck || tsc --noEmit

# Lint
npm run lint

# Optional: knip / depcheck
npx knip
npx depcheck
```

---

## 10) Commit & PR

```bash
git add .
git commit -m "chore: introduce Section system, Media primitive, legacy isolation"
git push -u origin refactor/sections-primitives
```

**Create PR with:**
- Summary of changes
- Screenshots from `/demo/sections`
- Note ESLint restrictions prevent regression

---

## 11) Rollback Plan (1-liner)

```bash
git switch -
git revert -m 1 <merge_commit_sha>   # if merged as a PR
# or
git reset --hard <pre-migration-sha> # if still on branch and you need to nuke
```

---

## Notes for Storyblok Safety

- Keep existing components registered until the new leaf components ship.
- No CMS schema changes until the Section system is stable.
- You can map Storyblok fields to Section props later via a thin adapter.

---

## Minimal Success Criteria (for this PR)

- Section.tsx renders correctly with all 4 props.
- section-system.css applies the data-attribute mapping reliably.
- Media.tsx works with aspect ratios and next/image.
- Legacy section imports are blocked by ESLint in non-demo code.
- `/demo/sections` page visually proves combinations.

---

**Quick Follow-up:** Want me to also drop in a Card primitive skeleton (TS + CSS) so leaf components have a ready pattern?