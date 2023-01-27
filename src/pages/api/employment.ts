import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { getAuthOpts } from 'utils'

async function getLinkItem(linkItemId: string) {
  const { headers } = getAuthOpts()
  const { data } = await axios.get('/link-items/' + linkItemId, {
    baseURL: process.env.NEXT_PUBLIC_ARGYLE_BASE_URL,
    headers,
  })
  return data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = getCookie('argyle-x-user-id', { req, res })

  if (!userId) {
    return res.status(401).send('Unauthorized')
  }

  try {
    const { headers } = getAuthOpts()

    const params = {
      user: userId,
      limit: 1,
    }

    const { data } = await axios.get('/employments', {
      baseURL: process.env.NEXT_PUBLIC_ARGYLE_BASE_URL,
      headers,
      params,
    })

    const employment = data.results[0]

    const linkItem = await getLinkItem(employment.employer)
    const merged = {
      ...employment,
      linkItem: linkItem,
    }

    res.status(200).json(merged)
  } catch (error) {
    res.status(400).json(error)
  }
}
