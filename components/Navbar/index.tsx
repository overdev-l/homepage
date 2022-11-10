import React from "react"
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
const Navbar = () => {
    const { theme, setTheme } = useTheme()
    const changeTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
  return (
    <header className="w-full pb-[25px] flex justify-between" >
        <h1 className="logo text-black dark:text-white">
            <Link href="/">Yongzhi</Link>
        </h1>
        <Image className="cursor-pointer" src={theme === 'light' ? '/dark.svg' : '/light.svg'} alt="theme" width="30" height="30" onClick={changeTheme} />
    </header>
  )
}

export default Navbar