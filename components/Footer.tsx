import React from 'react'
import { footerList1,footerList2,footerList3 } from '../utils/constants'
const List =({items,mt}:{items:string[],mt:boolean})=>{
  let footHeadClasses;
  if (mt) {
   footHeadClasses='flex flex-wrap gap-3 mt-5 items-center'
  }
  else{

    footHeadClasses='flex flex-wrap gap-3 items-center'
  }
  return (
    <div className={footHeadClasses}>
    {items.map((item)=>{return <p key={item} className='text-gray-400 text-sm hover:underline cursor-pointer'> {item} </p>})}
</div>
  )
}
const Footer = () => {
  return (
    <div className='mt-6 hidden xl:block'>
      <List items={footerList1} mt={false}/>
      <List items={footerList2} mt={true}/>
      <List items={footerList3} mt={true}/>
      <p className='text-gray-400 text-sm mt-5'>2022 &copy; TikTik All Rights Reserved</p>
    </div>
  )
}

export default Footer