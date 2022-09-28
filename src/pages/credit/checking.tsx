import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import { LoadingIcon } from 'components/icons'
import { Heading } from 'components/typography'
import Fullscreen from 'layouts/fullscreen'

export default function FifthPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/credit/success')
    }, 3000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="mt-auto px-20 pt-24">
        <div className="mb-22">
          <div className="h-[64px] w-[64px] animate-spin">
            <LoadingIcon />
          </div>
        </div>
        <Heading className="mb-[130px]">Checking your credit...</Heading>
      </div>
    </div>
  )
}

FifthPage.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>
}
