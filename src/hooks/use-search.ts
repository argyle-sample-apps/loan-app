import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const searchByQuery = async (q: string) => {
  const encoded = encodeURIComponent(q)
  const { data } = await axios.get(`/api/search?q=${encoded}`)

  // return no more than 10 results
  return data.slice(0, 10)
}

export function useSearch(q) {
  return useQuery(['profile', q], () => searchByQuery(q))
}
