import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { PayAllocation } from 'models/pay-allocation'

export const fetchPayAllocationsByUserId = async () => {
  const { data } = await axios.get<PayAllocation>(`/api/pay-allocation`)

  return data
}

export function usePayAllocation(enabled) {
  return useQuery(['pay-allocation'], fetchPayAllocationsByUserId, { enabled })
}
