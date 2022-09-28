import useSWR from 'swr'
import { fetcher } from 'api'

export function useSearch(q: string) {
  const encoded = encodeURIComponent(q)
  const { data, error } = useSWR(`/api/search?q=${encoded}`, fetcher)

  return {
    results: data?.slice(0, 10),
    isLoading: !error && !data,
    error: error,
  }
}
