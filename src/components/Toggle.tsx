type ToggleProps = {
  checked?: boolean
  id: string
  onChange?: any
}

export const Toggle = ({ checked, onChange, id }: ToggleProps) => {
  return (
    <div>
      <label
        htmlFor="default-toggle"
        className="relative inline-flex cursor-pointer items-center"
        id={id}
      >
        <input
          type="checkbox"
          value=""
          id={id}
          className="peer sr-only"
          defaultChecked={checked}
        />
        <div
          onClick={onChange}
          className="peer h-[31px] w-[51px] rounded-full bg-gray-light after:absolute after:top-[2px] after:left-[2px] after:h-[27px] after:w-[27px] after:rounded-full  after:bg-white after:drop-shadow-md after:transition-all after:content-[''] peer-checked:bg-green peer-checked:after:translate-x-[20px]"
        ></div>
      </label>
    </div>
  )
}
