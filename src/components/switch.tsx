import { Switch as HeadlessSwitch } from '@headlessui/react'

export type SwitchProps = {
  checked: boolean
  onChange: () => void
}

export const Switch = ({ checked, onChange }: SwitchProps) => {
  return (
    <div className="h-[30px]">
      <HeadlessSwitch
        checked={checked}
        onChange={onChange}
        className={`${checked ? 'bg-green' : 'bg-gray-light'}
          relative inline-flex h-[31px] w-[51px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${checked ? 'translate-x-20' : 'translate-x-0'}
            pointer-events-none inline-block h-[27px] w-[27px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </HeadlessSwitch>
    </div>
  )
}
