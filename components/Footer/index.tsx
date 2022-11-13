import Link from 'next/link'
const Footer = () => {

    return (
        <footer className="w-full mt-[45px] pt-[2px] absolute bottom-0 pb-[25px] ">
            <Link href="/" className='font-serif text-xs'>京ICP备2020047110号-2</Link>
        </footer>
    )
}

export default Footer