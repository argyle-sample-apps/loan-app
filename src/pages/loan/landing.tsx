import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components/button'
import { Heading, Paragraph } from 'components/typography'
import { StarsIcon } from 'components/icons'
import { formatCurrency } from 'utils/format'
import Fullscreen from 'layouts/fullscreen'
import { Slider } from 'components/slider'
import { useAtomValue, useSetAtom } from 'jotai'
import { triggerPdAtom, isPLLSelectedAtom, loanAmountAtom } from 'stores/global'

export default function EleventhPage() {
  const router = useRouter()
  const loanAmount = 4000
  const [adjustedLoanAmount, setAdjustedLoanAmount] =
    useState<number>(loanAmount)
  const setLoanAmount = useSetAtom(loanAmountAtom)
  const isPLLSelected = useAtomValue(isPLLSelectedAtom)
  const setTriggerPd = useSetAtom(triggerPdAtom)

  useEffect(() => {
    router.prefetch(isPLLSelected ? '/connect' : '/loan/sign')
  }, [router, isPLLSelected])

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
          onChange={(event) =>
            setAdjustedLoanAmount(Number(event.target.value))
          }
          max={loanAmount}
          value={adjustedLoanAmount}
        />
        <Paragraph className="mb-8 text-gray-T50">Adjust loan amount</Paragraph>
        <Heading className="mb-40">
          {formatCurrency(adjustedLoanAmount)}
        </Heading>
        <Button
          onClick={() => {
            setLoanAmount(adjustedLoanAmount)

            if (isPLLSelected) {
              setTriggerPd(true)

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
