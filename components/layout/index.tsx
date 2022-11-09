import React from "react"
import Navbar from '../Navbar'
const Layout = ({ children }:React.PropsWithChildren) => {
  return (
    <div className="max-w-[600px] mx-auto px-[10px] py-[25px] min-h-screen">
        <Navbar />
        <main>{ children }</main>
    </div>
  )
}

export default Layout