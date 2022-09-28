import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components/buttons'
import { BrandIcon, MonetizationIcon } from 'components/icons'
import { Title, Subheading } from 'components/typography'
import Fullscreen from 'layouts/fullscreen'

export default function FirstPage() {
  const router = useRouter()
  return (
    <div className="flex h-full flex-col bg-green-light pb-20">
      <div className="mb-auto ml-20 mt-60">
        <BrandIcon />
      </div>
      <div className="mt-auto px-20 pt-24">
        <div className="mb-22">
          <MonetizationIcon />
        </div>
        <Title className="mb-16">Personal loans made simple</Title>
        <Subheading className="mb-60 text-gray-T50">
          Funds from online loans can be used to pay down credit card debt, make
          a big purchase, and more.
        </Subheading>

        <Button onClick={() => router.push('/information')}>Next</Button>
      </div>
    </div>
  )
}

FirstPage.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>
}
