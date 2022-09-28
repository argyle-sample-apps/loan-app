import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components/buttons'
import clsx from 'clsx'
import { useCombobox } from 'downshift'
import { useSearch } from 'hooks/use-search'
import { Heading, Paragraph } from 'components/typography'
import WithBackButton from 'layouts/with-back-button'
import { useForm } from 'react-hook-form'
import { useAtom } from 'jotai'
import { LinkItem } from 'models/link-item'
import { selectedItemAtom } from 'atoms'
import { deleteCookie, setCookie } from 'cookies-next'

function capitalizeFirstLetter(word: string) {
  if (!word || !word.length) {
    return null
  }

  return word.charAt(0).toUpperCase() + word.slice(1)
}

export default function ThirdPage() {
  const router = useRouter()

  const [query, setQuery] = useState('')
  const { results, isLoading } = useSearch(query)
  const [_, setSelectedItem] = useAtom(selectedItemAtom)

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: results || [],
    onInputValueChange: ({ inputValue }) => {
      setQuery(inputValue?.toLowerCase() || '')
    },
    itemToString: (item: LinkItem | null) => {
      return item ? String(item.name) : ''
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) {
        return
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setSelectedItem(selectedItem)

      if (selectedItem.is_supported) {
        setCookie('link-item', selectedItem.id)
        if (selectedItem?.features?.pay_distribution_update?.supported) {
          setCookie('link-item-pd-supported', true)
        }
      } else {
        deleteCookie('link-item')
      }
    },
  })

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
      <div className="flex flex-col px-20">
        <Heading className="mb-8">Employment</Heading>
        <Paragraph className="text-gray-T50">
          Your current employment, income, and work history.
        </Paragraph>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <input
            className="form-input"
            placeholder="Start date (MM/DD/YYYY)"
            {...register('startDate')}
          />
          <input
            className="form-input"
            placeholder="Monthly net income (USD)"
            {...register('netIncome')}
          />
        </form>
        <Heading className="mb-8 mt-16">Banking</Heading>
        <Paragraph className="mb-16 text-gray-T50">
          Which bank account the loan will be paid out to.
        </Paragraph>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="form-input"
            placeholder="Account number"
            {...register('accountNumber')}
          />
          <input
            className="form-input"
            placeholder="Routing number"
            {...register('routingNumber')}
          />
        </form>
      </div>
      <div className="mx-20 mt-auto">
        <Button green onClick={() => router.push('/credit/landing')}>
          Next
        </Button>
      </div>
    </div>
  )
}

ThirdPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>
}
