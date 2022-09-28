import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import PhoneInput from 'react-phone-number-input'
import { Button } from 'components/buttons'
import { useForm } from 'react-hook-form'
import { Heading, Paragraph } from 'components/typography'
import WithBackButton from 'layouts/with-back-button'

export default function SecondPage() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState(undefined)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSubmit = (data) => {}

  return (
    <div className="flex h-full flex-col ">
      <div className="flex h-full flex-col px-20">
        <Heading className="mb-8">Tell us about yourself</Heading>
        <Paragraph className="mb-16 text-gray-T50">
          Share your information so GoodLoans can evaluate your request.
        </Paragraph>
      </div>
      <div className="mx-20 mt-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="form-input"
            placeholder="Full name"
            {...register('fullName')}
          />
          <input
            className="form-input"
            placeholder="Date of birth (MM/DD/YYYY)"
            {...register('dateOfBirth')}
          />
          <input
            className="form-input"
            placeholder="Email"
            {...register('email')}
          />
          <div className="mb-20 h-[56px] bg-gray-T04">
            <div className="ml-12 pt-5 text-label text-gray-T40">
              Phone number
            </div>
            <PhoneInput
              international
              defaultCountry="US"
              withCountryCallingCode
              countryCallingCodeEditable={false}
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          </div>
          <input
            className="form-input"
            placeholder="Street address"
            {...register('streetAddress')}
          />
          <input
            className="form-input"
            placeholder="City"
            {...register('city')}
          />
          <div className="flex gap-[20px]">
            <input
              className="form-input"
              placeholder="State"
              {...register('state')}
            />
            <input
              className="form-input"
              placeholder="Zip code"
              {...register('zipCode')}
            />
          </div>
          <input
            className="form-input"
            placeholder="Social security number (SSN)"
            {...register('ssn')}
          />
        </form>
      </div>
      <div className="mx-20 mt-auto pb-22">
        <Button green onClick={() => router.push('/employment')}>
          Next
        </Button>
      </div>
    </div>
  )
}

SecondPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>
}
