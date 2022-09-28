import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Fullscreen from 'layouts/fullscreen'
import { setCookie } from 'cookies-next'
import { Button } from 'components/buttons'
import { AccountBalanceSmallIcon, LogoutIcon } from 'components/icons'
import { Heading, Paragraph, Footnote } from 'components/typography'
import { Toggle } from 'components/Toggle'
import { Divider } from 'components/Divider'
import { useEphemeralStore } from 'stores/ephemeral'

export default function Home() {
  const router = useRouter()
  const [isBankVerificationSelected, setIsBankVerificationSelected] =
    useState<boolean>(false)
  const [isPLLSelected, setIsPLLSelected] = useState<boolean>(false)

  const setLinkScriptVisible = useEphemeralStore(
    (state) => state.setLinkScriptVisible
  )

  useEffect(() => {
    setLinkScriptVisible(true)
  }, [setLinkScriptVisible])

  return (
    <div className="flex h-full flex-col pb-20">
      <div className="px-20 pt-[98px]">
        <Heading className="mb-8 mr-20">Before you begin</Heading>
        <Paragraph className="mb-24 text-gray-T50">
          Set your parameters for the demo presentation.
        </Paragraph>
        <Divider className="my-20" />
        <div className="grid grid-cols-toggle">
          <div>
            <AccountBalanceSmallIcon />
          </div>
          <div className="mr-16 ">
            <Paragraph className="mb-5 text-black">Bank verification</Paragraph>
            <Footnote className="text-gray-pastel">
              Include the bank verification flow after the credit score{' '}
            </Footnote>
          </div>
          <Toggle
            id="bank-verification"
            checked={isBankVerificationSelected}
            onChange={() =>
              setIsBankVerificationSelected(!isBankVerificationSelected)
            }
          />
        </div>
        <Divider className="my-20" />
        <div className="grid grid-cols-toggle">
          <div>
            <LogoutIcon />
          </div>
          <div className="mr-16">
            <Paragraph className="mb-5 text-black">
              Direct deposit update for Paycheck-linked lending
            </Paragraph>
            <Footnote className="text-gray-pastel">
              Include the direct deposit update flow to demo Paycheck-linked
              lending (PLL)
            </Footnote>
          </div>
          <Toggle
            checked={isPLLSelected}
            onChange={() => setIsPLLSelected(!isPLLSelected)}
            id="direct-deposit"
          />
        </div>
        <Divider className="my-20" />
      </div>
      <div className="mt-auto px-20">
        <Button
          green
          onClick={() => {
            setCookie('is-pll-selected', isPLLSelected)
            setCookie(
              'is-bank-verification-selected',
              isBankVerificationSelected
            )
            router.push('/landing')
          }}
        >
          Start demo
        </Button>
      </div>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>
}
