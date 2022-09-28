import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components/buttons'
import WithBackButton from 'layouts/with-back-button'

export default function ConfirmPage() {
  const router = useRouter()

  return (
    <div className="flex h-full flex-col">
      <div className="mx-20">Pay distribution</div>
      <div className="mx-20">
        <Button green onClick={() => router.push('/success')}>
          Sign
        </Button>
      </div>
    </div>
  )
}

ConfirmPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>
}
