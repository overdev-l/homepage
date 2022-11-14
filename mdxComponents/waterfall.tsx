import Image from 'next/image'
import { useState } from 'react'
interface CardData {
    source: string
    description: string
}
const Card = ({ source, description }: CardData) => {
    return (
        <div className="w-full my-1 h-fit">
            <Image src={source} alt="waterfall" className='w-full h-auto' />
            <small className='h-6 text-sm text-center truncate'>{description}</small>
        </div>
    )
}

export function Waterfall() {
    const [leftData, setleftData] = useState<Array<CardData>>([])
    const [rightData, setRightData] = useState<Array<CardData>>([])
    return (
        <section className="w-full" style={{height: '600px'}}>
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