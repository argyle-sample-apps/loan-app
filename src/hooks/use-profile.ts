import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Profile } from 'models/profile'

export const fetchProfileById = async () => {
  const { data } = await axios.get<Profile>(`/api/profile`)

  return data
}

export function useProfile(enabled) {
  return useQuery(['profile'], fetchProfileById, { enabled })
}
