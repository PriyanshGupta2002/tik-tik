import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {AiFillHome,AiOutlineMenu}from 'react-icons/ai'
import {ImCancelCircle} from 'react-icons/im'
import Discover from './Discover'
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'


const Sidebar = () => {
  const [showSideBar, setShowSidebar] = useState(true)
  const normalLink= 'flex items-center gap-3 hover:bg-primary p-3 cursor-pointer justify-center font-semibold text-[#f51997] rounded'
  return (
    <div>
      <div className='block m-2 ml-4 mt-3 text-xl cursor-pointer xl:hidden ' onClick={()=>{setShowSidebar((prevState)=>!prevState )}} >
          {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSideBar&& ( 
      <>
      <div className='xl:w-400 w-20 flex flex-col justify-start  border-r-2 border-gray-100 xl:border-0 p-3 '>
         <div className='xl:border-b-2 border-gray-200 xl:pb-4 '>
            <Link href="/" >
              <div className={normalLink}>
                <p className='text-2xl'>
                  <AiFillHome/>
                </p>
                <span className='text-xl hidden xl:block '>
                    For you
                </span>
              </div>
            </Link>
         </div>
          
          <Discover/>
          <SuggestedAccounts/>
          <Footer/>
      </div>
      </>
      )}
    </div>
  )
}

export default Sidebar