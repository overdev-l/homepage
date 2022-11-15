import { NextApiRequest, NextApiResponse } from 'next'
import { mock, Random } from 'mockjs'
const getRandom = (max: number,min:number) =>{
    if(isNaN(min)) min=0;
    const num = Math.random()*(max-min);
    return parseInt(String(num + min));
}
export default function handle(req: NextApiRequest, res: NextApiResponse) {
    const result = mock({
        'list|10': [{
            'source|+1': Random.image(`${getRandom(500, 1000)}x${getRandom(500, 1000)}`),
            'description|+1': Random.cparagraph()
        }]
    })
    res.send(result)
}