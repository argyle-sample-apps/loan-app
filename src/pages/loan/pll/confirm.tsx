import { ReactElement } from 'react'
import { Button } from 'components/button'
import WithBackButton from 'layouts/with-back-button'
import Link from 'next/link'

export default function ConfirmPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="mx-20">Pay distribution</div>
      <div className="mx-20">
        <Link href="/success" passHref>
          <Button as="a" green>
            Sign
          </Button>
        </Link>
      </div>
    </div>
  )
}

ConfirmPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>
}
