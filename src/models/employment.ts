export interface Employment {
  id: string
  account: string
  status: string
  type: string
  job_title: string
  platform_user_id: string
  hire_datetime: string
  termination_datetime: string
  termination_reason: string
  employer: string
  metadata: any
  base_pay: BasePay
  pay_cycle: string
  created_at: Date
  updated_at: Date
  platform_ids: PlatformIDS
  linkItem: any
}

export interface BasePay {
  amount: string
  period: string
  currency: string
}

export interface PlatformIDS {
  employee_id: string
  position_id: string
  platform_user_id: string
}
