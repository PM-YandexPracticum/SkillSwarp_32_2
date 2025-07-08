import type { ReactNode } from 'react';

// Сделал такие интерфейсы для того, чтобы не было коллизий между типами: 
// onClick обязателен если type === button
// to обязателен если type === link

interface ButtonAsButton {
  type: 'button'
  onClick: () => void
  children: ReactNode
  className?: string
  to?: never
}

interface ButtonAsLink {
  type: 'link'
  to: string
  children: ReactNode
  className?: string
  onClick?: never
}

export type ButtonUIProps = ButtonAsButton | ButtonAsLink
