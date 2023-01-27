import clsx from 'clsx'
import Link from 'next/link'
import { ReactElement, useEffect, useState } from 'react'
import { Button } from 'components/button'
import { useCombobox } from 'downshift'
import { useSearch } from 'hooks/use-search'
import { Heading, Paragraph } from 'components/typography'
import WithBackButton from 'layouts/with-back-button'
import { useForm } from 'react-hook-form'
import { useAtomValue, useSetAtom } from 'jotai'
import { LinkItem } from 'models/link-item'
import { formatDateString, formatCurrency } from 'utils/format'
import { ControlledInput } from 'components/controlled-input'
import { capitalizeFirstLetter, toMonthlyPay } from 'utils'
import {
  selectedItemAtom,
  selectedItemPdSupportedAtom,
  userIdAtom,
} from 'stores/global'
import { useEmployment } from 'hooks/use-employment'
import { usePayAllocation } from 'hooks/use-pay-allocation'
import { lightFormat, parseISO } from 'date-fns'
import { Employment } from 'models/employment'
import { getCookie } from 'cookies-next'

const getStartDate = (employment: Employment) => {
  const hireDate = employment?.hire_datetime
  return hireDate ? lightFormat(parseISO(hireDate), 'dd/MM/yyyy') : ''
}

const getNetIncome = (employment: Employment) => {
  const basePay = employment?.base_pay
  return basePay ? formatCurrency(toMonthlyPay(basePay)) : ''
}

export default function ThirdPage() {
  const userId = useAtomValue(userIdAtom) || getCookie('argyle-x-user-id')
  const [query, setQuery] = useState('')
  const { data: results, isLoading } = useSearch(query)
  const setSelectedItem = useSetAtom(selectedItemAtom)
  const setSelectedItemPdSupported = useSetAtom(selectedItemPdSupportedAtom)

  const { data: employment } = useEmployment(!!userId)
  const { data: allocation } = usePayAllocation(!!userId)

  const values =
    employment && allocation
      ? {
          startDate: getStartDate(employment),
          netIncome: getNetIncome(employment),
          accountNumber: allocation.bank_account.account_number,
          routingNumber: allocation.bank_account.routing_number,
        }
      : {}

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useCombobox({
    items: results || [],
    onInputValueChange: ({ inputValue }) => {
      setQuery(inputValue?.toLowerCase() || '')
    },
    itemToString: (item: LinkItem | null) => {
      return item ? String(item.name) : ''
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem || !selectedItem.is_supported) {
        return
      }

      setSelectedItem(selectedItem.id)

      if (selectedItem?.features?.pay_distribution_update?.supported) {
        setSelectedItemPdSupported(true)
      }
    },
  })

  useEffect(() => {
    if (employment) {
      selectItem(employment.linkItem)
    }
  }, [employment, selectItem])

  const { register, control } = useForm<any>({
    values,
  })

  return (
    <div className="flex h-full flex-col ">
      <div className="flex flex-col px-20">
        <Heading className="mb-8">Employment</Heading>
        <Paragraph className="text-gray-T50">
          Your current employment, income, and work history.
        </Paragraph>
        <form>
          <div {...getComboboxProps()}>
            {isOpen ? (
              <label
                {...getLabelProps()}
                className="text-now-blue m-0 text-xs leading-none"
              >
                Employer name
              </label>
            ) : (
              <span className="block h-6"></span>
            )}

            <input
              className="form-input"
              placeholder="Employer name"
              {...getInputProps()}
            />
          </div>
          <ul {...getMenuProps()}>
            {isOpen &&
              (!isLoading ? (
                <div
                  className={clsx(
                    results?.length > 0 && 'shadow-[0_4px_20px_rgba(0,0,0,0.1)]'
                  )}
                >
                  {results?.map((item: any, index: any) => (
                    <li
                      className={clsx('p-2 text-xl leading-[25px]', {
                        'bg-gray-100': highlightedIndex === index,
                        'text-gray-600': item.is_input,
                      })}
                      key={`${item}${index}`}
                      {...getItemProps({ item, index })}
                    >
                      {item.name}
                    </li>
                  ))}
                </div>
              ) : (
                <div className={'shadow-[0_4px_20px_rgba(0,0,0,0.1)]'}>
                  <li className={'p-2 text-xl leading-[25px] text-gray-600'}>
                    {capitalizeFirstLetter(query)}
                  </li>
                </div>
              ))}
          </ul>

          <ControlledInput
            transform={{
              input: (value) => (value === '' ? '' : value.toString()),
              output: (e) => {
                const output = formatDateString(e.target.value)
                return output
              },
            }}
            control={control}
            placeholder="Start date (MM/DD/YYYY)"
            name="startDate"
            aria-label="Start date"
            {...register('startDate')}
            ref={null}
          />
          <ControlledInput
            transform={{
              input: (value) => (value === '$0' || '' ? '' : value.toString()),
              output: (e) => {
                const output = formatCurrency(e.target.value)
                return output
              },
            }}
            control={control}
            placeholder="Monthly net income ($USD)"
            name="netIncome"
            aria-label="Monthly net income"
            {...register('netIncome')}
            ref={null}
          />
        </form>
        <Heading className="mb-8 mt-16">Banking</Heading>
        <Paragraph className="mb-16 text-gray-T50">
          Which bank account the loan will be paid out to.
        </Paragraph>
        <form>
          <input
            className="form-input"
            placeholder="Account number"
            aria-label="Account number"
            type="number"
            {...register('accountNumber')}
          />
          <input
            className="form-input"
            placeholder="Routing number"
            aria-label="Routing number"
            type="number"
            {...register('routingNumber')}
          />
        </form>
      </div>
      <div className="mx-20 mt-auto">
        <Link href="/credit/landing" passHref>
          <Button as="a" green>
            Next
          </Button>
        </Link>
      </div>
    </div>
  )
}

ThirdPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>
}
