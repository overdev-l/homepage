import { useEffect, useState } from 'react'
import axios from 'axios'
interface CardData {
    source: string
    description: string
    width: number
    height: number
}
const calculateImage = (image: string):Promise<{height: number, width: number}> => new Promise((resolve,reject) => {
    const img = new Image()
    img.src = image
    img.onload = () => {
        resolve({
            width: img.width,
            height: img.height
        })
    }
    img.onerror = e => {
        reject(e)
    }
})
const Card = ({ source, description }: CardData) => {
    return (
        <div className="w-full my-1 h-fit">
            <img src={source} alt="waterfall" className='w-full h-auto my-0' />
            <small className='h-6 text-sm text-center truncate'>{description}</small>
        </div>
    )
}

export function Waterfall() {
    const column = 5
    const [waterfall, setWaterfall] = useState<Array<Array<CardData>>>(new Array(column).fill(new Array()))
    const fetchData = async () => {
        const { data } = await axios.get('/api/waterfall')
        calculatePosition(data.list)
    }
    const calculatePosition = async (cards: Array<CardData>) => {
        const targets = waterfall.map((list, index) => ({
            height: list.reduce((pre, nex) => pre + nex.height, 0),
            index
        }))
        for (let i = 0; i < cards.length; i++) {
            targets.sort((a, b) => a.height - b.height)
            const index = targets[0].index
            const element = cards[i];
            const { width, height } = await calculateImage(element.source)
            element.height = 100 / width * height
            const newData = JSON.parse(JSON.stringify(waterfall))[index].push(element)
            setWaterfall(newData)
            targets[0].height += element.height
        }
        
    }
    useEffect(() => {
        fetchData()
    },[])
    return (
        <section className="w-full h-[600px] overflow-y-auto">
            <div className="w-full flex px-2.5 gap-y-1 h-fit gap-2.5">
                {
                    waterfall.map((parent, index) => {
                        return (
                            <div className="flex flex-col grow" key={`parent-${index}`}>
                                {
                                    parent.map((card, i) => <Card {...card} key={i} />)
                                }
                            </div>
                        )
                    })
                }
                
            </div>
        </section>
    )
}