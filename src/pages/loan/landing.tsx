import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components/buttons'
import { Heading, Paragraph } from 'components/typography'
import { StarsIcon } from 'components/icons'
import { formatCurrency } from 'utils/format'
import Fullscreen from 'layouts/fullscreen'

import { Slider } from 'components/Slider'
import { getCookie, setCookie } from 'cookies-next'
export default function EleventhPage() {
  const router = useRouter()
  const loanAmount = 4000
  const [adjustedLoanAmount, setAdjustedLoanAmount] = useState<string | number>(
    loanAmount
  )

  return (
    <div className="flex h-full flex-col bg-yellow-light pb-20">
      <div className="mt-auto px-20 pt-24">
        <div className="mb-22">
          <StarsIcon />
        </div>
        <Heading className="mb-16">Loan approved</Heading>
        <Paragraph>
          Based on your income we’re ready to provide a loan of up to{' '}
          {formatCurrency(loanAmount)} with 3% interest.
        </Paragraph>
        <Slider
          onChange={(event) => setAdjustedLoanAmount(event.target.value)}
          max={loanAmount}
          value={adjustedLoanAmount}
        />
        <Paragraph className="mb-8 text-gray-T50">Adjust loan amount</Paragraph>
        <Heading className="mb-40">
          {formatCurrency(adjustedLoanAmount)}
        </Heading>
        <Button
          onClick={async () => {
            setCookie('loan-amount', `${adjustedLoanAmount}`)
            if (getCookie('is-pll-selected')) {
              await setCookie('is-pd-open', true)
              router.push('/connect')
            } else {
              router.push('/loan/sign')
            }
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  )
}

EleventhPage.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>
}
