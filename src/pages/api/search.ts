import type { NextApiRequest, NextApiResponse } from 'next'
import { capitalizeFirstLetter, getFallbackItems, getAuthOpts } from 'utils'
import { LinkItem } from 'models/link-item'
import Fuse from 'fuse.js'

const fallbackItems = getFallbackItems()
const options = {
  keys: ['name'],
  threshold: 0.15,
}

const fuse = new Fuse(fallbackItems, options)

function hasMatchIn(array: any, item: any) {
  const hasMatchingId = array.some((s: any) => s.id === item.id)
  const hasMatchingName = array.some(
    (s: any) => s.name.toLowerCase() === item.name.toLowerCase()
  )

  if (hasMatchingId || hasMatchingName) {
    return true
  }

  return false
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const q = req.query.q as string
  const url = `${process.env.NEXT_PUBLIC_ARGYLE_BASE_URL}/search/link-items?q=${q}`

  const fallback = fuse.search(q).map((result) => ({
    ...result.item,
    is_supported: false,
  }))

  return fetch(url, getAuthOpts())
    .then((response) => response.json())
    .then((data) => {
      const supported = data.results.map((result: LinkItem) => ({
        ...result,
        is_supported: true,
      }))

      const fromQuery = {
        id: q,
        name: capitalizeFirstLetter(q) as string,
        is_supported: false,
        is_input: true,
      }

      const notSupported = fallback.filter((f) => !hasMatchIn(supported, f))
      const merged = [...notSupported, ...supported]
      const existsInLinkItems = hasMatchIn(merged, fromQuery)

      if (!existsInLinkItems && fromQuery.name !== null) {
        merged.unshift(fromQuery)
      }

      res.json(merged)
    })
    .catch((error) => {
      console.error(error)
    })
}
