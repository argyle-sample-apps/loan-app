import { useResizeDetector } from 'react-resize-detector'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { LeftArrowIcon } from 'components/icons'

type WithBackButtonProps = {
  children: React.ReactNode
  warning?: boolean
}

function WithBackButton({ children, warning }: WithBackButtonProps) {
  const { height, ref } = useResizeDetector()
  const router = useRouter()

  return (
    <div
      id="__container"
      className={clsx('h-full', warning ? 'bg-red-light' : 'bg-white')}
      ref={ref}
    >
      <div className="px-24 pt-32 pb-16">
        <button className="block h-12 w-[15px]" onClick={() => router.back()}>
          <LeftArrowIcon />
        </button>
      </div>
      <main
        className="scrollbar overflow-auto"
        style={height ? { height: height - 80 } : {}}
      >
        {children}
      </main>
    </div>
  )
}

export default WithBackButton
