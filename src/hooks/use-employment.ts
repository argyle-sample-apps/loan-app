import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Employment } from 'models/employment'

export const fetchEmploymentByUserId = async () => {
  const { data } = await axios.get<Employment>(`/api/employment`)

  return data
}

export function useEmployment(enabled) {
  return useQuery(['employment'], fetchEmploymentByUserId, { enabled })
}
