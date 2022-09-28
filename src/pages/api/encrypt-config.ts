import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(404).json({ error: 'Not Found' })
  }

  const config = req.body

  const url = `${process.env.ARGYLE_API_URL}/pay-distribution-configs/encrypt`

  const authToken = Buffer.from(
    process.env.ARGYLE_API_KEY + ':' + process.env.ARGYLE_API_SECRET
  ).toString('base64')

  const request = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + authToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  }

  const response = await fetch(url, request)
  const json = await response.json()

  res.json(json)
}

export default handler
