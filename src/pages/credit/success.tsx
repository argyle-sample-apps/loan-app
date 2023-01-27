import { ReactElement, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Heading, Paragraph } from 'components/typography'
import Fullscreen from 'layouts/fullscreen'
import { SuccessScreen } from 'views/success-screen'
import { isBankVerificationSelectedAtom } from 'stores/global'
import { useAtomValue } from 'jotai'
import { getCookie } from 'cookies-next'

export default function SuccessPage() {
  const router = useRouter()
  const isBankVerificationSelected = useAtomValue(
    isBankVerificationSelectedAtom
  )

  const userId = getCookie('argyle-x-user-id') as string

  const getNextRoute = useCallback(() => {
    if (isBankVerificationSelected) {
      return '/bank/landing'
    }

    if (userId) {
      return '/loan/landing'
    }

    return '/connect'
  }, [isBankVerificationSelected, userId])

  useEffect(() => {
    router.prefetch(getNextRoute())
  }, [router, isBankVerificationSelected, getNextRoute])

  return (
    <SuccessScreen route={getNextRoute()} button={'Continue'}>
      <Heading className="mb-16">
        Success.{' '}
        <span className="text-gray-T50">You’re eligible for a loan</span>
      </Heading>
      <Paragraph className="mb-40 text-gray-T50">
        Click ‘Continue’ to proceed with your application.
      </Paragraph>
    </SuccessScreen>
  )
}

SuccessPage.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>
}
