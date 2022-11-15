import { useState } from 'react'
import Imagetarget from 'next/image'
interface CardData {
    source: string
    description: string
}
const calculateImage = (image: string) => new Promise((resolve,reject) => {
    const img = new Image()
    img.src = image
    img.onloadeddata = () => {
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
            <Imagetarget src={source} alt="waterfall" className='w-full h-auto' />
            <small className='h-6 text-sm text-center truncate'>{description}</small>
        </div>
    )
}

export function Waterfall() {
    const [leftData, setleftData] = useState<Array<CardData>>([])
    const [rightData, setRightData] = useState<Array<CardData>>([])
    return (
        <section className="w-full h-[600px]">
            <div className="w-full flex px-2.5 gap-y-1 h-fit">
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