import Link from 'next/link'
import { ReactElement } from 'react'
import { Button } from 'components/button'
import { useForm } from 'react-hook-form'
import { SignScreen } from 'views/sign-screen'
import WithBackButton from 'layouts/with-back-button'
import { loanAmountAtom } from 'stores/global'
import { useAtomValue } from 'jotai'

export default function SignPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSubmit = (data) => {}

  const loanAmount = useAtomValue(loanAmountAtom)

  return (
    <div className="flex h-full flex-col">
      <SignScreen loanAmount={loanAmount} />

      <div className="mx-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="form-input"
            placeholder="Full name"
            aria-label="Full name"
            {...register('fullName')}
          />
          <input
            className="form-input"
            placeholder="Last 4 digits of SSN"
            aria-label="Last 4 digits of Social Security Number"
            {...register('endOfSsn')}
          />
        </form>
      </div>
      <div className="mx-20">
        <Link href="/loan/pll/success" passHref>
          <Button as="a" green>
            Sign
          </Button>
        </Link>
      </div>
    </div>
  )
}

SignPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>
}
