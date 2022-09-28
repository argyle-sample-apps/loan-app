import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components/buttons'
import { CancelIcon } from 'components/icons'
import { Heading, Paragraph } from 'components/typography'
import WithBackButton from 'layouts/with-back-button'

export default function NinthPage() {
  const router = useRouter()
  return (
    <div className="flex h-full flex-col">
      <div className="mt-auto px-20">
        <div className="mb-16">
          <CancelIcon />
        </div>
        <Heading className="mb-16">
          Oops.{' '}
          <span className="text-gray-T50">We could not connect your bank</span>
        </Heading>
        <Paragraph className="mb-40 text-gray-T50">
          Please connect your work account instead to verify income and
          employment.
        </Paragraph>
        <div className="mt-auto">
          <Button onClick={() => router.push('/connect')}>
            Connect your work
          </Button>
        </div>
      </div>
    </div>
  )
}

NinthPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton warning>{page}</WithBackButton>
}
