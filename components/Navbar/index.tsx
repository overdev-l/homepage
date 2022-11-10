import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
const Navbar = () => {
    const { theme, setTheme } = useTheme()
    const [thmeIcon, setThemeIcon] = useState('/dark.svg')
    const changeTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    useEffect(() => {
      if (theme === 'light' ) {
        setThemeIcon('/dark.svg')
      } else {
        setThemeIcon('/light.svg')
      }
    },[theme])
  return (
    <header className="w-full pb-[25px] flex justify-between" >
        <h1 className="logo text-black dark:text-white">
            <Link href="/">Yongzhi</Link>
        </h1>
        <Image className="cursor-pointer" src={thmeIcon} alt="theme" width="30" height="30" onClick={changeTheme} />
    </header>
  )
}

export default Navbar