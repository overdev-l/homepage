import dynamic from "next/dynamic"
import React from "react"
const Navbar = dynamic(() => import('../Navbar'))
const Layout = ({ children }:React.PropsWithChildren) => {
  return (
    <main className="max-w-[600px] mx-auto px-[10px] py-[25px] min-h-screen relative pb-[200px]">
        <Navbar />
        <main>{ children }</main>
    </main>
  )
}

export default Layout