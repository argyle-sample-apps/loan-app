import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { getAuthOpts } from 'utils'

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

    // for simplicity, get only the first profile
    const params = {
      user: userId,
      limit: 1,
    }

    const { data } = await axios.get('/profiles', {
      baseURL: process.env.NEXT_PUBLIC_ARGYLE_BASE_URL,
      headers,
      params,
    })

    res.status(200).json(data.results[0])
  } catch (error) {
    res.status(400).json(error)
  }
}
