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
        const width = getRandom(500, 1000)
        const height = getRandom(500, 1000)
        result.push({
            source: Random.image(`${width}x${height}`),
            description: Random.ctitle(10, 15),
            height,
            width
        })
        
    }
    const data = mock({
        'list': result
    })
    res.send(data)
}