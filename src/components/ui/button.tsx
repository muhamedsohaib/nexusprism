import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'ghost'

type BaseProps = {
  children: ReactNode
  variant?: ButtonVariant
  full?: boolean
  className?: string
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>

type ButtonLinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function Button({ children, variant = 'primary', full = false, className, ...props }: ButtonProps) {
  return (
    <button className={classNames('button', variant, full && 'full', className)} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({ children, variant = 'primary', full = false, className, href, ...props }: ButtonLinkProps) {
  const classes = classNames('button', variant, full && 'full', className)

  if (href.startsWith('/')) {
    return <Link className={classes} href={href}>{children}</Link>
  }

  return <a className={classes} href={href} {...props}>{children}</a>
}
