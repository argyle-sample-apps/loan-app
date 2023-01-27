import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { getAuthOpts } from 'utils'
import { getCookie } from 'cookies-next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = getCookie('argyle-x-user-id', { req, res })

  if (!userId) {
    return res.status(401).send('Unauthorized')
  }

  const { headers } = getAuthOpts()

  try {
    const params = {
      user: userId,
      limit: 1,
    }

    const { data } = await axios.get('/pay-allocations', {
      baseURL: process.env.NEXT_PUBLIC_ARGYLE_BASE_URL,
      headers,
      params,
    })

    res.status(200).json(data.results[0])
  } catch (error) {
    res.status(400).json(error)
  }
}
