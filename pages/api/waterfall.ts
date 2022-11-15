import { NextApiRequest, NextApiResponse } from 'next'
import { mock, Random } from 'mockjs'
const getRandom = (max: number,min:number) =>{
    if(isNaN(min)) min=0;
    const num = Math.random()*(max-min);
    return parseInt(String(num + min));
}
export default function handle(req: NextApiRequest, res: NextApiResponse) {
    const result = []
    for (let i = 0; i < 10; i++) {
        result.push({
            'source': Random.image(`${getRandom(500, 1000)}x${getRandom(500, 1000)}`),
            'description': Random.ctitle(10, 15)
        })
        
    }
    const data = mock({
        'list': result
    })
    res.send(data)
}