import { ReactElement } from 'react'
import { Heading, Paragraph } from 'components/typography'
import { formatCurrency } from 'utils/format'
import Fullscreen from 'layouts/fullscreen'
import { SuccessScreen } from 'views/SuccessScreen'
import { getCookie } from 'cookies-next'
import { clearCookies } from 'utils'
import { useGlobalStore } from 'stores/global'
import { useEphemeralStore } from 'stores/ephemeral'

export default function SuccessPage() {
  const amount = getCookie('loan-amount')?.toString() || ''
  const loanAmount = amount ? parseInt(amount) : 4000

  const setUser = useGlobalStore((state) => state.setUser)

  const setLinkScriptVisible = useEphemeralStore(
    (state) => state.setLinkScriptVisible
  )

  return (
    <SuccessScreen
      route="/"
      button={'Done'}
      callback={() => {
        clearCookies()
        setLinkScriptVisible(false)
        setUser('', '')
      }}
    >
      <Heading className="mb-16">Success</Heading>
      <Paragraph className="mb-40 text-gray-T50">
        Your loan of {formatCurrency(loanAmount)} will be paid out today.
      </Paragraph>
    </SuccessScreen>
  )
}

SuccessPage.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>
}
