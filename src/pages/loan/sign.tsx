import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import { Button } from 'components/buttons'
import { useForm } from 'react-hook-form'
import { SignScreen } from 'views/SignScreen'
import WithBackButton from 'layouts/with-back-button'

export default function SignPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSubmit = (data) => {}

  const amount = getCookie('loan-amount')?.toString() || ''
  const loanAmount = amount ? parseInt(amount) : 4000

  return (
    <div className="flex h-full flex-col">
      <SignScreen loanAmount={loanAmount} />

      <div className="mx-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="form-input"
            placeholder="Full name"
            {...register('fullName')}
          />
          <input
            className="form-input"
            placeholder="Last 4 digits of SSN"
            {...register('endOfSsn')}
          />
        </form>
      </div>
      <div className="mx-20">
        <Button green onClick={() => router.push('/loan/success')}>
          Sign
        </Button>
      </div>
    </div>
  )
}

SignPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>
}
