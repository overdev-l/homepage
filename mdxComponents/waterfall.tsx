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

export default function Waterfall() {
    const [leftData, setleftData] = useState<Array<CardData>>([])
    const [rightData, setRightData] = useState<Array<CardData>>([])
    const fetchData = async () => {
        const { data } = await axios.get('/api/waterfall')
        calculatePosition(data.list)
    }
    const calculatePosition = async (cards: Array<CardData>) => {
        let leftHeight = leftData.reduce((pre, nex) =>pre + nex.height, 0)
        let rightHeight = rightData.reduce((pre, nex) =>pre + nex.height, 0)
        for (let i = 0; i < cards.length; i++) {
            const element = cards[i];
            const { width, height } = await calculateImage(element.source)
            element.height = 100 / width * height
            if (leftHeight <= rightHeight) {
                leftHeight += element.height
                setleftData((list) => ([...list, element]))
            } else {
                rightHeight += element.height
                setRightData((list) => [...list, element])
            }
        }
        
    }
    useEffect(() => {
        fetchData()
    },[])
    return (
        <section className="w-full h-[600px] overflow-y-auto">
            <div className="w-full flex px-2.5 gap-y-1 h-fit gap-2.5">
                <div className="flex flex-col grow">
                    {
                        leftData.map((card, i) => <Card {...card} key={i} />)
                    }
                </div>
                <div className="flex flex-col grow">
                    {
                        rightData.map((card, i) => <Card {...card} key={i} />)
                    }
                </div>
            </div>
        </section>
    )
}