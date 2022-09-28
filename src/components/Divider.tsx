import clsx from 'clsx'

type DividerProps = {
  className?: string
  color?: string
}

export const Divider = ({ className, color }: DividerProps) => {
  return (
    <div
      className={clsx('flex h-px', className, color ? color : 'bg-gray-T12')}
    />
  )
}
