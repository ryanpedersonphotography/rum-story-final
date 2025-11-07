'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot'; // optional; remove if you prefer not to use asChild
import { cx } from '@/lib/react-interop';

type CardVariant = 'elevated' | 'outline' | 'ghost';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardRadius = 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;               // allow <a> or any element to be the root (via <Slot>)
  interactive?: boolean;           // focus ring + hover lift
  variant?: CardVariant;           // visual style
  padding?: CardPadding;           // internal padding scale
  radius?: CardRadius;             // border-radius scale
  elevation?: 0 | 1 | 2 | 3;       // shadow depth (tokens)
}

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    asChild,
    interactive = false,
    variant = 'elevated',
    padding = 'md',
    radius = 'lg',
    elevation = 1,
    className,
    ...rest
  },
  ref
) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      ref={ref}
      role="group"
      tabIndex={interactive ? 0 : undefined}
      className={cx('card', className)}
      data-variant={variant}
      data-padding={padding}
      data-radius={radius}
      data-elevation={elevation}
      data-interactive={interactive ? 'true' : 'false'}
      {...rest}
    />
  );
});

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, ...rest },
  ref
) {
  return <div ref={ref} className={cx('card__header', className)} {...rest} />;
});

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(function CardMedia(
  { className, ...rest },
  ref
) {
  return <div ref={ref} className={cx('card__media', className)} {...rest} />;
});

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(function CardBody(
  { className, ...rest },
  ref
) {
  return <div ref={ref} className={cx('card__body', className)} {...rest} />;
});

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, ...rest },
  ref
) {
  return <div ref={ref} className={cx('card__footer', className)} {...rest} />;
});

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: keyof JSX.IntrinsicElements; // e.g. h2/h3
}
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { as: Tag = 'h3', className, ...rest },
  ref
) {
  // @ts-expect-error dynamic heading element
  return <Tag ref={ref} className={cx('card__title', className)} {...rest} />;
});

export interface CardSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}
const CardSubtitle = React.forwardRef<HTMLParagraphElement, CardSubtitleProps>(function CardSubtitle(
  { className, ...rest },
  ref
) {
  return <p ref={ref} className={cx('card__subtitle', className)} {...rest} />;
});

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(function CardActions(
  { className, ...rest },
  ref
) {
  return <div ref={ref} className={cx('card__actions', className)} {...rest} />;
});

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Media: CardMedia,
  Body: CardBody,
  Footer: CardFooter,
  Title: CardTitle,
  Subtitle: CardSubtitle,
  Actions: CardActions,
});

export default Card;