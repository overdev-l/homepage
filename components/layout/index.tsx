import React from "react"
import Navbar from '../Navbar'
import Footer from '../Footer'
const Layout = ({ children }:React.PropsWithChildren) => {
  return (
    <div className="max-w-[600px] mx-auto px-[10px] py-[25px] min-h-screen relative pb-[200px]">
        <Navbar />
        <main>{ children }</main>
        <Footer />
    </div>
  )
}

export default Layout