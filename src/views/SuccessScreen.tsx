import { useRouter } from 'next/router'
import { Button } from 'components/buttons'
import { CheckCircleIcon } from 'components/icons'

export const SuccessScreen = ({ route, button, children, callback }: any) => {
  const router = useRouter()
  return (
    <div className="flex h-full flex-col bg-green-light pb-20">
      <div className="mt-auto px-20 pt-24">
        <div className="mb-22">
          <CheckCircleIcon />
        </div>
        {children}
        <Button
          onClick={() => {
            callback && callback()
            router.push(route || '/')
          }}
        >
          {button || 'Done'}
        </Button>
      </div>
    </div>
  )
}
