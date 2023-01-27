import { ReactElement } from 'react'
import Link from 'next/link'
import { useAtom } from 'jotai'
import Fullscreen from 'layouts/fullscreen'
import { Button } from 'components/button'
import {
  AccountBalanceSmallIcon,
  LogoutIcon,
  AutoFixIcon,
} from 'components/icons'
import { Heading, Paragraph, Footnote } from 'components/typography'
import { Switch } from 'components/switch'
import { Divider } from 'components/divider'
import {
  isBankVerificationSelectedAtom,
  isPLLSelectedAtom,
  isAutofillSelectedAtom,
} from 'stores/global'

export default function Home() {
  const [isBankVerificationSelected, setIsBankVerificationSelected] = useAtom(
    isBankVerificationSelectedAtom
  )
  const [isPLLSelected, setIsPLLSelected] = useAtom(isPLLSelectedAtom)

  const [isAutofillSelected, setIsAutofillSelected] = useAtom(
    isAutofillSelectedAtom
  )

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
          <Switch
            checked={isBankVerificationSelected}
            onChange={() =>
              setIsBankVerificationSelected(!isBankVerificationSelected)
            }
          />
        </div>

        <Divider className="my-20" />
        <div className="grid grid-cols-toggle">
          <div>
            <AutoFixIcon />
          </div>
          <div className="mr-16">
            <Paragraph className="mb-5 text-black">
              Application autofill
            </Paragraph>
            <Footnote className="text-gray-pastel">
              Include the autofill feature to streamline application data entry
            </Footnote>
          </div>
          <Switch
            checked={isAutofillSelected}
            onChange={() => setIsAutofillSelected(!isAutofillSelected)}
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
          <Switch
            checked={isPLLSelected}
            onChange={() => setIsPLLSelected(!isPLLSelected)}
          />
        </div>
        <Divider className="my-20" />
      </div>
      <div className="mt-auto px-20">
        <Link href="/landing" passHref>
          <Button as="a" green>
            Start demo
          </Button>
        </Link>
      </div>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>
}
