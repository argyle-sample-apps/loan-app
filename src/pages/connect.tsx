import { ReactElement, useEffect, useState } from 'react'
import clsx from 'clsx'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Button } from 'components/buttons'
import { BadgeIcon } from 'components/icons'
import { Heading, Paragraph, Subheading } from 'components/typography'
import { ArgyleLink } from 'components/ArgyleLink'
import Fullscreen from 'layouts/fullscreen'
import { getCookie, hasCookie, setCookie } from 'cookies-next'

const encryptPDConfig = async (config: any) => {
  const { data } = await axios.post<any>(`/api/encrypt-config`, config)
  return data
}

export default function ConnectPage() {
  const [linkLoading, setLinkLoading] = useState(false)
  const [linkInstance, setLinkInstance] = useState<any>()

  const selectedLinkItem = getCookie('is-pll-selected')
    ? getCookie('link-item-pd-supported')
      ? getCookie('link-item')?.toString()
      : null
    : getCookie('link-item')?.toString() || null

  const [linkItem, setLinkItem] = useState<any>(selectedLinkItem)

  const pdConfig = getCookie('pd-config')

  const router = useRouter()

  const handleLinkOpen = () => {
    if (!linkInstance) {
      return setLinkLoading(true)
    }

    linkInstance.open()
  }

  useEffect(() => {
    const fetchConfig = async () => {
      const { encrypted_config } = await encryptPDConfig({
        bank_account: {
          bank_name: 'GoodLoans',
          routing_number: '084101234',
          account_number: 9483746361234,
          account_type: 'checking',
        },
        amount_allocation: {
          value: '100',
        },
      })

      setCookie('pd-config', encrypted_config)
    }

    if (!hasCookie('pd-config')) {
      fetchConfig()
    }
  }, [])

  useEffect(() => {
    if (linkInstance && linkLoading === true) {
      setLinkLoading(false)
      linkInstance.open()
    }

    if (getCookie('is-pd-open') && !linkLoading && linkInstance) {
      linkInstance.open()
    }
  }, [linkLoading, linkInstance])

  const handleLinkClose = () => {
    if (getCookie('is-pd-open')) {
      router.push('/loan/pll/sign')
    } else {
      router.push('/loan/landing')
    }
  }

  const demoAccounts = [
    {
      label: 'Full time, 3 jobs',
      userId: '01824037-20b8-3f5e-48d8-fc923911d2cd',
      userToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiIwMTdmMDdmMi0xODU5LWFjN2UtMTA1NC1jN2JlOTAyOGVhMmUiLCJleHAiOjE2NjE1MjY3MzAsImlhdCI6MTY1ODkzNDczMCwiaXNzIjoiYXJneWxlLWNvcmUtYXV0aC1wcm9kIiwianRpIjoiZTRlMzI3ZDUtNTYxMS00MTllLWFjZjMtOGFlMzM5Zjc4N2RiIiwic3ViIjoiMDE4MjQwMzctMjBiOC0zZjVlLTQ4ZDgtZmM5MjM5MTFkMmNkIiwidXNlcl9pZCI6IjAxODI0MDM3LTIwYjgtM2Y1ZS00OGQ4LWZjOTIzOTExZDJjZCJ9.4j4ggH0CM9nlMTZXuW9DVWPGCCLOw5SSb4fGCk9PkCc',
    },
    {
      label: 'Gig worker',
      userId: '01824494-b528-9ec8-a698-ecfcbd2f7e8b',
      userToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiIwMTdmMDdmMi0xODU5LWFjN2UtMTA1NC1jN2JlOTAyOGVhMmUiLCJleHAiOjE2NjE1OTk5NzIsImlhdCI6MTY1OTAwNzk3MiwiaXNzIjoiYXJneWxlLWNvcmUtYXV0aC1wcm9kIiwianRpIjoiNWNmYmI0MjQtMTY3Ny00NTc1LWIyMzAtYTQ1ODk5ZDEwNTVkIiwic3ViIjoiMDE4MjQ0OTQtYjUyOC05ZWM4LWE2OTgtZWNmY2JkMmY3ZThiIiwidXNlcl9pZCI6IjAxODI0NDk0LWI1MjgtOWVjOC1hNjk4LWVjZmNiZDJmN2U4YiJ9.QBRE98IaI9SO_yJd6l59jVtj6lvJOUxQ8X99N44C9mM',
    },
  ]

  const goToDemoAccount = (account: any) => {
    setCookie('argyle-x-user-id', account.userId)
    setCookie('argyle-x-user-token', account.userToken)

    router.push('/')
  }

  return (
    <>
      <ArgyleLink
        onClose={() => handleLinkClose()}
        onLinkInit={(link) => {
          setLinkInstance(link)
        }}
        linkItemId={linkItem}
        payDistributionUpdateFlow={!!getCookie('is-pll-selected')}
        pdConfig={pdConfig}
        setLinkItem={setLinkItem}
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
            <div className={clsx('flex', linkLoading && 'animate-pulse')}>
              <Button onClick={handleLinkOpen}>Connect your work</Button>
            </div>
          </div>
        </div>
        {process.env.APP_ENVIRONMENT === 'development' && (
          <div className="mt-8 bg-red-50 p-2 pb-8">
            <div className="w-full px-4">
              <Subheading className="mb-2 ml-8 -translate-y-8 -rotate-12 font-mono font-medium !text-red-600">
                Development only
              </Subheading>
              <div className="grid grid-cols-2 gap-4">
                {demoAccounts.map((account) => (
                  <button
                    key={account.userId}
                    className="w-full rounded-md bg-red-400 p-4 font-semibold text-white"
                    onClick={() => goToDemoAccount(account)}
                  >
                    {account.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

ConnectPage.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>
}
