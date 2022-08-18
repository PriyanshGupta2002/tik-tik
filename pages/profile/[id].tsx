import React from 'react'
import { useState,useEffect } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'

import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser,Video } from '../../types'
import { BASE_URL } from '../../utils'

interface IProps{
  data:{
    user:IUser,
    userLikedVideos:Video[],
    userVideos:Video[]
  }
}
const Profile = ({data}:IProps) => {
  const{userLikedVideos,user,userVideos}=data
  const [videoList, setvideoList] = useState<Video[]>([])
  const [showUserVideos, setshowUserVideos] = useState(true)
  const videos=showUserVideos?'border-b-2 border-black':'text-gray-400'
  const liked=!showUserVideos?'border-b-2 border-black':'text-gray-400'
  useEffect(() => {
    if (showUserVideos) {
      setvideoList(userVideos)
    }else{
      setvideoList(userLikedVideos)
    }
  }, [showUserVideos,userLikedVideos,userVideos])
  
  return (
    <div className='w-full '>
      <div  className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
      <div className='w-16 h-16 md:w-32 md:h-32 '>
              <Image src={user.image} width={120} height={120} layout="responsive" className='rounded-full' alt="user profile"/>
              </div> 
              <div className='flex flex-col justify-center '>
                <p className=' md:text-2xl tracking-wider flex gap-1 items-center justify-center text-base font-bold text-primary lowercase'>{user.userName.replaceAll(' ','')} <GoVerified className='text-blue-400'/></p>
                <p className='capitalize md:text-xl text-gray-400 text-xs'>
                  {user.userName}
                </p>
              </div>
      </div>
      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 bg-white w-full border-gray-300'>
          <p className={`text-xl font-semibold mt-2 cursor-pointer ${videos}`} onClick={()=>{setshowUserVideos(true)}}>Videos</p>
          <p className={`text-xl font-semibold mt-2 cursor-pointer ${liked}`} onClick={()=>{setshowUserVideos(false)}}>Liked</p>
        </div>
        <div className='flex gap-6 flex-wrap md:justify-start'>
            {videoList.length>0?(
              videoList.map((post:Video,idx:number)=>(
                <VideoCard post={post} key={idx} />
              ))
            ):<NoResults text={`No ${showUserVideos?'':'Liked'} Videos Yet `}/>}
        </div>
      </div>
    </div>
  )
}
export const getServerSideProps=async({params:{id}}:{
  params:{id:string}
})=>{
const res = await axios.get(`${BASE_URL}/api/profile/${id}`)
return{
  props:{
    data:res.data
  }
}
}
export default Profile