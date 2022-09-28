import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components/buttons'
import { Heading, Paragraph } from 'components/typography'
import { AssignmentIcon } from 'components/icons'
import WithBackButton from 'layouts/with-back-button'

export default function FourthPage() {
  const router = useRouter()

  return (
    <div className="flex h-full flex-col ">
      <div className="mt-auto px-20">
        <div className="mb-16">
          <AssignmentIcon />
        </div>
        <Heading className="mb-8">
          All set.
          <span className="ml-8 text-gray-T50">
            Time to request your credit report
          </span>
        </Heading>
        <Paragraph className="mb-40 text-gray-T50">
          Requesting a credit inquiry may affect your credit score. Read more
        </Paragraph>
        <div className="mt-auto">
          <Button green onClick={() => router.push('/credit/checking')}>
            Apply now
          </Button>
        </div>
      </div>
    </div>
  )
}

FourthPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>
}
