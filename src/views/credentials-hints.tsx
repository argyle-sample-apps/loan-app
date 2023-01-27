import { useState, useEffect } from 'react'
import { Footnote, Paragraph } from 'components/typography'
import { Modal } from 'components/modal'
import clsx from 'clsx'
import { CloseIcon, UnlockIcon } from 'components/icons'

export const SamplePasswordButton = ({
  showHintsButton,
  showHints,
  onClick,
}: any) => {
  if (!showHintsButton) {
    return null
  }

  return (
    <div
      className={clsx(
        'pointer-events-none absolute top-[25px] z-[9999999999]',
        showHints ? 'left-0' : 'left-[70px]'
      )}
    >
      {showHints ? (
        <button
          className="pointer-events-auto flex items-center rounded-sm bg-orange-pastel p-1 text-left leading-none"
          onClick={onClick}
        >
          <div className="ml-20 h-12 w-12 text-black">
            <CloseIcon />
          </div>
        </button>
      ) : (
        <button
          className="pointer-events-auto flex items-center rounded-sm bg-orange-pastel p-1 text-left leading-none"
          onClick={onClick}
        >
          <div className="flex items-center">
            <div className="mr-8 h-12 w-12">
              <UnlockIcon />
            </div>
            <span className="text-[10px] uppercase">test credentials</span>
          </div>
          {showHints && (
            <div className="ml-8 h-12 w-12 text-orange-pastel">
              <CloseIcon />
            </div>
          )}
        </button>
      )}
    </div>
  )
}

const credentials = [
  {
    label: 'Email',
    value: 'test1@argyle.com',
  },
  {
    label: 'Phone number',
    value: '(800) 900-0010',
  },
  {
    label: 'Username',
    value: 'test_1',
    note: 'Employee ID, User ID, etc.',
  },
  {
    label: 'Password',
    value: 'passgood',
  },
  {
    label: 'Verification Code',
    value: '8081',
  },
  {
    label: 'Driver’s license',
    value: 'D1230010',
  },
]

type CardPinModalProps = {
  showHints: boolean
  setShowHints: (arg0: boolean) => void
}

export const CredentialsHints = ({
  showHints,
  setShowHints,
}: CardPinModalProps) => {
  const [copySuccessMessage, setCopySuccessMessage] = useState('')

  useEffect(() => {
    if (copySuccessMessage !== '') {
      const timer = setTimeout(() => {
        setCopySuccessMessage('')
        setShowHints(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [copySuccessMessage, setCopySuccessMessage, setShowHints])

  return (
    <Modal isOpen={showHints} className="z-[9999999998] bg-orange-pastel">
      <div className="mt-24 px-16">
        <div className="flex pb-12">
          <div className="flex-1"></div>
          <div className="flex-1">
            <Paragraph className="min-h-[25px] !text-black">
              {copySuccessMessage}
            </Paragraph>
          </div>
        </div>
        <div className="flex pb-12">
          <div className="flex-1"></div>
          <div className="flex-1">
            <Footnote className="!text-black opacity-40">
              Tap below to copy
            </Footnote>
          </div>
        </div>
        <div className="mb-2 h-1 w-full bg-orange-pastel">
          <div
            className={clsx(
              'h-1 bg-orange-light transition-all delay-100 duration-700 ease-out',
              copySuccessMessage !== '' ? 'w-full' : 'w-0'
            )}
          ></div>
        </div>
        <div className="divide-y divide-black divide-opacity-[.08] border-y border-black border-opacity-[.08]">
          {credentials.map((credential) => (
            <div className="flex items-center py-12" key={credential.label}>
              <div className="flex-1">
                <Paragraph className="!text-black opacity-60">
                  {credential.label}
                </Paragraph>
                {credential.note && (
                  <Footnote className="!text-black opacity-40">
                    {credential.note}
                  </Footnote>
                )}
              </div>
              <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(credential.value)
                  setCopySuccessMessage(`${credential.label} copied!`)
                }}
              >
                <Paragraph className="!text-black">
                  {credential.value}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
