'use client';

import * as React from 'react';
import { cx } from '@/lib/react-interop';

type Columns =
  | 1 | 2 | 3 | 4 | 5 | 6
  | 'auto'; // auto-fit with minmax

type Align = 'start' | 'center' | 'end' | 'stretch';
type Justify = 'start' | 'center' | 'end' | 'between';

export interface CardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: Columns;      // default: 'auto' (responsive auto-fit)
  min?: string;           // min card width for auto-fit (e.g. '18rem')
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  align?: Align;          // cross-axis align
  justify?: Justify;      // main-axis distribution
  equalHeight?: boolean;  // force cards to equal height
  wrap?: boolean;         // allow wrapping in fallback flex mode
}

export default function CardGroup({
  columns = 'auto',
  min = '18rem',
  gap = 'lg',
  align = 'stretch',
  justify = 'start',
  equalHeight = true,
  wrap = true,
  className,
  style,
  children,
  ...rest
}: CardGroupProps) {
  return (
    <div
      className={cx('card-group', className)}
      data-columns={String(columns)}
      data-gap={gap}
      data-align={align}
      data-justify={justify}
      data-equal-height={equalHeight ? 'true' : 'false'}
      data-wrap={wrap ? 'true' : 'false'}
      style={{
        // used by CSS when columns='auto'
        ['--card-min' as any]: min,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}