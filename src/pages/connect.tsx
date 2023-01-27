import { ReactElement, useEffect } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Button } from 'components/button'
import { BadgeIcon } from 'components/icons'
import { Heading, Paragraph } from 'components/typography'
import { ArgyleLink } from 'components/argyle-link'
import Fullscreen from 'layouts/fullscreen'
import { useAtomValue } from 'jotai'
import {
  triggerPdAtom,
  isPLLSelectedAtom,
  selectedItemAtom,
  selectedItemPdSupportedAtom,
} from 'stores/global'
import { useLink } from 'hooks/use-link'

export default function ConnectPage() {
  const router = useRouter()

  const triggerPd = useAtomValue(triggerPdAtom)
  const isPLLSelected = useAtomValue(isPLLSelectedAtom)
  const selectedItem = useAtomValue(selectedItemAtom)
  const selectedItemPdSupported = useAtomValue(selectedItemPdSupportedAtom)

  const { openLink, isLinkLoading, setLinkInstance, setIsLinkOpen } = useLink()

  const selectedLinkItem = isPLLSelected
    ? selectedItemPdSupported
      ? selectedItem
      : null
    : selectedItem || null

  const onClose = () => {
    setIsLinkOpen(false)

    if (triggerPd) {
      router.push('/loan/pll/sign')
    } else {
      router.push('/loan/landing')
    }
  }

  useEffect(() => {
    if (triggerPd) {
      openLink()
    }
  }, [triggerPd, openLink])

  useEffect(() => {
    router.prefetch('/loan/pll/sign')
    router.prefetch('/loan/landing')
  }, [router])

  return (
    <>
      <ArgyleLink
        customConfig={{
          onClose: onClose,
          linkItems: selectedLinkItem ? [selectedLinkItem] : [],
          payDistributionUpdateFlow: isPLLSelected && triggerPd,
        }}
        onLinkInit={(link) => {
          setLinkInstance(link)
        }}
      />
      <div className="flex h-full flex-col">
        <div className="mt-auto px-20">
          <div className="mb-20">
            <BadgeIcon />
          </div>
          <Heading className="mb-20">Employment data verification</Heading>
          <Paragraph className="mb-20 text-gray-T50">
            To proceed with your application, we need to verify your income and
            employment information
          </Paragraph>
          <div className="mt-auto pb-20">
            <div className={clsx('flex', isLinkLoading && 'animate-pulse')}>
              <Button onClick={openLink}>Continue</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ConnectPage.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>
}
