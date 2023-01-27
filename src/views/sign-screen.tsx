import React from 'react'
import { addMonths, format } from 'date-fns'
import {
  Heading,
  Subheading,
  Paragraph,
  Subparagraph,
  Footnote,
} from 'components/typography'
import { Divider } from 'components/divider'
import { formatCurrency, formatPercent } from 'utils/format'

export const SignScreen = ({ loanAmount }) => {
  const percentageRate = 3
  const financeCharge = (loanAmount * 3) / 100
  const total = financeCharge + loanAmount

  const monthlyRepaymentValue = total / 12

  const paymentData = [
    {
      title: 'Annual percentage rate',
      description: 'The cost of your credit as a yearly rate',
      value: formatPercent(percentageRate),
    },
    {
      title: 'Finance charge',
      description: 'The dollar amount the credit will cost you',
      value: formatCurrency(financeCharge),
    },
    {
      title: 'Finance charge',
      description: 'The amount of credit provided to you or on your behalf',
      value: formatCurrency(loanAmount),
    },
    {
      title: 'Total of payments',
      description:
        'The amount you will have paid after you have made all payments as scheduled',
      value: formatCurrency(total),
    },
  ]
  const currentDate = new Date()
  const repaymentStartDate = addMonths(currentDate, 1)
  const repaymentEndDate = addMonths(currentDate, 12)

  const paymentSchedule = [
    {
      payments: 11,
      amount: formatCurrency(monthlyRepaymentValue * 11),
      due: 'Monthly beginning ' + format(repaymentStartDate, 'P'),
    },
    {
      payments: 1,
      amount: formatCurrency(monthlyRepaymentValue),
      due: 'Final payment on ' + format(repaymentEndDate, 'P'),
    },
  ]

  return (
    <div className="flex flex-col px-20">
      <Heading className="mb-40">Promissory note</Heading>
      <Subheading className="mb-16 text-black">
        Federal truth-in lending disclosure statement
      </Subheading>

      {paymentData.map(({ title, description, value }, i) => (
        <React.Fragment key={i}>
          <Divider />
          <div className="grid grid-cols-rates gap-20">
            <div>
              <Subparagraph className="pt-12">{title}</Subparagraph>
              <Footnote className="mt-4 pb-12 text-gray-T50">
                {description}
              </Footnote>
            </div>
            <Footnote className="pt-14 text-right text-black">{value}</Footnote>
          </div>
        </React.Fragment>
      ))}
      <Divider className="mb-60" />

      <Subheading className="mb-16 text-black">Payment schedule</Subheading>
      <div className="my-12 grid grid-cols-schedule gap-16">
        <Footnote className="text-gray-T50">No. of payments</Footnote>
        <Footnote className="text-gray-T50">Amount of payments</Footnote>
        <Footnote className="max-w-[100px] text-gray-T50">
          When payments are due
        </Footnote>
      </div>
      <Divider />
      {paymentSchedule.map(({ payments, amount, due }, i) => (
        <React.Fragment key={i}>
          <div className="my-12 grid grid-cols-schedule gap-16">
            <Footnote className="text-black">{payments}</Footnote>
            <Footnote className="text-black">{amount}</Footnote>
            <Footnote className=" text-black">{due}</Footnote>
          </div>
          <Divider />
        </React.Fragment>
      ))}

      <Subheading className="mb-16 mt-60 text-black">Terms</Subheading>
      <Paragraph className="mb-16 text-gray-T50">
        Caution. It’s important that you thoroughly read the contract before you
        sign it.{' '}
        <span className="cursor-pointer text-black">Read contract terms</span>
      </Paragraph>
      <Subheading className="mt-60 mb-20 text-black">Agree and sign</Subheading>
    </div>
  )
}
