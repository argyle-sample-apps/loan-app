import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components/buttons'
import { AccountBalanceIcon } from 'components/icons'
import { Heading, Paragraph } from 'components/typography'
import WithBackButton from 'layouts/with-back-button'

export default function SeventhPage() {
  const router = useRouter()
  return (
    <div className="flex h-full flex-col ">
      <div className="mt-auto px-20">
        <div className="mb-20">
          <AccountBalanceIcon />
        </div>
        <Heading className="mb-20">Bank information verification</Heading>
        <Paragraph className="mb-40 text-gray-T50">
          To proceed with your application, we need to verify your bank
          information.
        </Paragraph>
        <div className="mt-auto">
          <Button green onClick={() => router.push('/bank/connecting')}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

SeventhPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>
}
