import { ReactElement } from 'react'
import { Heading, Paragraph } from 'components/typography'
import { formatCurrency } from 'utils/format'
import Fullscreen from 'layouts/fullscreen'
import { SuccessScreen } from 'views/success-screen'
import { useAtomValue } from 'jotai'
import { loanAmountAtom } from 'stores/global'
import { useCleanup } from 'hooks/use-cleanup'

export default function SuccessPage() {
  const loanAmount = useAtomValue(loanAmountAtom)
  const cleanup = useCleanup()

  return (
    <SuccessScreen
      route="/"
      button={'Done'}
      callback={() => {
        cleanup()
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
