export interface PayAllocation {
  id: string
  account: string
  destination_type: string
  bank_account: BankAccount
  status: string
  allocation_type: string
  allocation_value: string
  employer: string
  metadata: any
  created_at: Date
  updated_at: Date
  method: string
}

export interface BankAccount {
  routing_number: string
  account_number: string
  account_type: string
}
