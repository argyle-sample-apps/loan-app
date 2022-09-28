import { ReactElement } from 'react'
import { Heading, Paragraph } from 'components/typography'
import Fullscreen from 'layouts/fullscreen'
import { SuccessScreen } from 'views/SuccessScreen'
import { getCookie } from 'cookies-next'

export default function SuccessPage() {
  return (
    <SuccessScreen
      route={
        getCookie('is-bank-verification-selected')
          ? '/bank/landing'
          : '/connect'
      }
      button={'Continue'}
    >
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
