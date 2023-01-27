import Link from 'next/link'
import { ReactElement, useCallback, useEffect } from 'react'
import { Button } from 'components/button'
import { CancelIcon } from 'components/icons'
import { Heading, Paragraph } from 'components/typography'
import WithBackButton from 'layouts/with-back-button'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useAtomValue } from 'jotai'
import { isPLLSelectedAtom } from 'stores/global'

export default function NinthPage() {
  const router = useRouter()
  const userId = getCookie('argyle-x-user-id') as string
  const isPLLSelected = useAtomValue(isPLLSelectedAtom)

  const getNextRoute = useCallback(() => {
    if (userId && !isPLLSelected) {
      return '/loan/landing'
    }

    return '/connect'
  }, [userId, isPLLSelected])

  useEffect(() => {
    router.prefetch(getNextRoute())
  }, [router, getNextRoute])

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
          <Link href={getNextRoute()} passHref>
            <Button as="a">Continue</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

NinthPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton warning>{page}</WithBackButton>
}
