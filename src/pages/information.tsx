import { ReactElement, useCallback, useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import { Button } from 'components/button'
import { useForm } from 'react-hook-form'
import { Heading, Paragraph } from 'components/typography'
import WithBackButton from 'layouts/with-back-button'
import {
  formatSocialSecurityNumber,
  formatDateString,
  reformatDate,
} from 'utils/format'
import { ControlledInput } from 'components/controlled-input'
import Link from 'next/link'
import { RightArrowIcon } from 'components/icons'
import { useLink } from 'hooks/use-link'
import { ArgyleLink } from 'components/argyle-link'
import clsx from 'clsx'
import { useQueryClient } from '@tanstack/react-query'
import { useProfile } from 'hooks/use-profile'
import { useAtomValue } from 'jotai'
import { userIdAtom, isAutofillSelectedAtom } from 'stores/global'
import { getCookie } from 'cookies-next'

export default function SecondPage() {
  const userId = useAtomValue(userIdAtom) || getCookie('argyle-x-user-id')
  const [phoneNumber, setPhoneNumber] = useState(undefined)

  const queryClient = useQueryClient()
  const { openLink, isLinkLoading, setLinkInstance } = useLink()
  const { data } = useProfile(!!userId)

  const isAutofillSelected = useAtomValue(isAutofillSelectedAtom)

  const onClose = useCallback(() => {
    queryClient.invalidateQueries()
  }, [queryClient])

  const values = data
    ? {
        fullName: data?.full_name,
        dateOfBirth: reformatDate(data?.birth_date),
        email: data?.email,
        streetAddress: data?.address.line1,
        city: data?.address.city,
        state: data?.address.state,
        zipCode: data?.address.postal_code,
        ssn: data?.ssn,
      }
    : {}

  const { register, control } = useForm<any>({
    values: values,
  })

  useEffect(() => {
    if (data) {
      setPhoneNumber(data?.phone_number)
    }
  }, [data])

  return (
    <>
      <ArgyleLink
        customConfig={{
          onClose: onClose,
        }}
        onLinkInit={(link) => {
          setLinkInstance(link)
        }}
      />
      <div className="flex h-full flex-col ">
        <div className="flex h-full flex-col px-20">
          <Heading className="mb-8">Tell us about yourself</Heading>
          <Paragraph className="mb-16 text-gray-T50">
            Share your information so GoodLoans can evaluate your request.
          </Paragraph>
          {isAutofillSelected && (
            <>
              <div className={clsx('flex', isLinkLoading && 'animate-pulse')}>
                <button
                  onClick={openLink}
                  className="flex w-full items-center justify-between bg-[#4C7CDA]  py-4 px-16"
                >
                  <div className="flex flex-col text-left">
                    <span className="text-xl text-white">Autopopulate</span>
                    <span className="text-xs text-white opacity-60">
                      by connecting to payroll
                    </span>
                  </div>
                  <div className="text-white">
                    <RightArrowIcon />
                  </div>
                </button>
              </div>
              <div className="my-20 flex h-px bg-gray-T12" />
            </>
          )}
        </div>
        <div className="mx-20 mt-auto">
          <form>
            <input
              className="form-input"
              placeholder="Full name"
              aria-label="Full name"
              {...register('fullName')}
            />

            <ControlledInput
              transform={{
                input: (value) => (value === '' ? '' : value.toString()),
                output: (e) => {
                  const output = formatDateString(e.target.value)
                  return output
                },
              }}
              control={control}
              placeholder="Date of birth (MM/DD/YYYY)"
              name="dateOfBirth"
              aria-label="Date of birth"
              {...register('dateOfBirth')}
              ref={null}
            />

            <input
              className="form-input"
              placeholder="Email"
              aria-label="Email"
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
                aria-label="Phone number"
              />
            </div>

            <input
              className="form-input"
              placeholder="Street address"
              aria-label="Street address"
              {...register('streetAddress')}
            />

            <input
              className="form-input"
              placeholder="City"
              aria-label="City"
              {...register('city')}
            />

            <div className="flex gap-[20px]">
              <input
                className="form-input"
                placeholder="State"
                aria-label="State"
                {...register('state')}
              />
              <input
                className="form-input"
                placeholder="Zip code"
                aria-label="Zip code"
                {...register('zipCode')}
              />
            </div>

            <ControlledInput
              transform={{
                input: (value) => (value === '' ? '' : value.toString()),
                output: (e) => {
                  const output = formatSocialSecurityNumber(e.target.value)
                  return output
                },
              }}
              control={control}
              placeholder="Social security number (SSN)"
              name="ssn"
              aria-label="Social security number"
              {...register('ssn')}
              ref={null}
            />
          </form>
        </div>
        <div className="mx-20 mt-auto pb-22">
          <Link href="/employment" passHref>
            <Button as="a" green>
              Next
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

SecondPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>
}
