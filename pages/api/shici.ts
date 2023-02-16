
import { NextApiRequest, NextApiResponse } from 'next'
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
      const response = await fetch('https://v1.jinrishici.com/all.json')
      const data = await response.json()
      res.send(data)
  } catch (error) {
      res.send({
        content: '择善从之，不善改之',
        origin: '论语‧述而',
        author: '孔子'
      })
  }
}