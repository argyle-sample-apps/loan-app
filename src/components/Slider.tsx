import { useState } from 'react'

type SliderProps = {
  min?: number
  max: number
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value: number | string
}

export const Slider = ({ min = 1, max, onChange, value }: SliderProps) => {
  return (
    <div className="relative mb-12 pt-16 pb-12">
      <input
        type="range"
        min={min}
        max={max}
        step="1"
        onChange={onChange}
        value={value}
        className="
      form-range
      h-[2px]
      w-full
      appearance-none
      bg-gray-T12
      p-0
      focus:shadow-none focus:outline-none focus:ring-0
    "
      />
    </div>
  )
}
