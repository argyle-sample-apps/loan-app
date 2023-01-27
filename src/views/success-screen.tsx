import { useRouter } from 'next/router'
import { Button } from 'components/button'
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
            router.push(route || '/')

            if (callback) {
              setTimeout(() => {
                callback()
              }, 1000)
            }
          }}
        >
          {button || 'Done'}
        </Button>
      </div>
    </div>
  )
}
