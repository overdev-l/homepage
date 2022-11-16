import {useEffect, useState, useRef, useLayoutEffect} from 'react'
import axios from 'axios'
interface CardData {
    source: string
    description: string
    width: number
    height: number
}

const Card = ({ source, description, width, height }: CardData) => {
    const imgRef = useRef<HTMLImageElement>(null)
    const container = useRef<HTMLImageElement>(null)
    useEffect(() => {
        const ob = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                imgRef.current!.src = imgRef.current?.getAttribute('data-src')!
                ob.unobserve(imgRef.current!)
            }
        }, { rootMargin: '100px' })
        ob.observe(imgRef.current!)
        return () => {
            ob.disconnect()
        }
    }, [])
    useLayoutEffect(() => {
        const imgHeight = container.current!.clientWidth / width * height
        imgRef.current!.height = imgHeight
    }, [])
    return (
        <div className="w-full my-1 h-fit" ref={container}>
            <img data-src={source} ref={imgRef} alt="waterfall" className='w-full h-auto my-0' />
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
            element.height = 100 / element.width * element.height
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
        <section className="w-full h-[600px] overflow-y-auto" id="waterfall">
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