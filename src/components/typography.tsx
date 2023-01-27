import clsx from 'clsx'

type TypographyProps = {
  children: React.ReactNode
  className?: string
}

/* title: ['40px', '46px'], */
export function Title({ children, className }: TypographyProps) {
  return (
    <h1
      className={clsx(
        'text-title font-normal tracking-[-.01em]  text-black',
        className
      )}
    >
      {children}
    </h1>
  )
}

/* heading: ['30px', '36px'], */
export function Heading({ children, className }: TypographyProps) {
  return (
    <h2
      className={clsx(
        'tracking-title text-heading font-normal tracking-[-.01em] text-black',
        className
      )}
    >
      {children}
    </h2>
  )
}

/* subheading: ['26px', '32px'], */
export function Subheading({ children, className }: TypographyProps) {
  return (
    <h3
      className={clsx(
        'text-subheading font-normal tracking-[-.01em]',
        className ? className : 'text-gray-T50'
      )}
    >
      {children}
    </h3>
  )
}

/* paragraph: ['18px', '25px'], */
export function Paragraph({ children, className }: TypographyProps) {
  return (
    <p
      className={clsx(
        'text-paragraph font-normal',
        className ? className : 'text-gray-T50'
      )}
    >
      {children}
    </p>
  )
}

export function Subparagraph({ children, className }: TypographyProps) {
  return (
    <p className={clsx('text-md font-normal text-black', className)}>
      {children}
    </p>
  )
}

/* footnote: ['12px', '15px'], */
export function Footnote({ children, className }: TypographyProps) {
  return (
    <h4
      className={clsx(
        'text-footnote font-normal',
        className ? className : 'text-gray-T50'
      )}
    >
      {children}
    </h4>
  )
}

export function Strong({ children, className }: TypographyProps) {
  return (
    <span className={clsx('font-normal text-black', className)}>
      {children}
    </span>
  )
}
