import { Controller, Control, FieldPath } from 'react-hook-form'

type FormValues = {
  dateOfBirth?: string
  ssn?: string
  startDate?: string
  netIncome?: string
}

export const ControlledInput = <TInput extends string, TOutput>({
  control,
  transform,
  name,
  defaultValue = '',
  placeholder,
  ref,
}: {
  transform: {
    input: (value: TOutput) => TInput
    output: (value: React.ChangeEvent<HTMLInputElement>) => TOutput
  }
  name: FieldPath<FormValues>
  control: Control<FormValues>
  defaultValue?: any
  placeholder?: string
  ref?: any
}) => {
  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field }) => (
        <input
          {...field}
          ref={ref}
          className="form-input"
          onChange={(e) => field.onChange(transform.output(e))}
          value={transform.input(field.value as TOutput)}
          placeholder={placeholder}
          aria-label={name || placeholder}
        />
      )}
    />
  )
}
