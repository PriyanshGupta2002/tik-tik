import React,{useState} from 'react'
import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser,Video } from '../../types'
import { BASE_URL } from '../../utils'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useAuthStore from '../../store/authStore'
interface Iprops{
    videos:Video[]
}
const Search = ({videos}:Iprops) => {
    const router = useRouter()
    const {searchValue}:any=router.query
    const {allUsers}=useAuthStore()
    const [isAccounts, setisAccounts] = useState(false)
    const accounts=isAccounts?'border-b-2 border-black':'text-gray-400'
    const isVideos=!isAccounts?'border-b-2 border-black':'text-gray-400'
    const searchedAccounts = allUsers.filter((user:IUser)=>{return user.userName.toLowerCase().includes(searchValue.toLowerCase())})
  return (
    <div className='w-full'>
         <div className='flex gap-10 mb-10 mt-10 border-b-2 bg-white w-full border-gray-300'>
          <p className={`text-xl font-semibold mt-2 cursor-pointer ${isVideos}`} onClick={()=>{setisAccounts(false)}}>Accounts</p>
          <p className={`text-xl font-semibold mt-2 cursor-pointer ${accounts}`} onClick={()=>{setisAccounts(true)}}>Videos</p>
        </div>
        {isAccounts?(<div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
            {videos.length?(
                    videos.map((video:Video,idx)=>(
                        <VideoCard post={video} key={idx}/>
                    ))
                ):<NoResults text={`No video results for ${searchValue}`}/>}
        </div>):(<div className='md:mt-16 flex flex-col gap-4'>
                        {searchedAccounts.length?(searchedAccounts.map((user:IUser,idx)=>(
                             <Link href={`/profile/${user._id}`} key={idx}>
                             <div className="flex p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200 gap-3">
                             <div>
                               <Image
                                 src={user.image}
                                 width={50}
                                 height={50}
                                 
                                 className="rounded-full cursor-pointer"
                                 alt="user profile"
                               />
                             </div>
                             <div className="hidden md:block">
                               <p className="flex gap-1 items-center text-base font-bold text-primary lowercase">
                                 {user.userName.replaceAll(" ", "")}{" "}
                                 <GoVerified className="text-blue-400" />
                               </p>
                               <p className="capitalize text-gray-400 text-xs">
                                 {user.userName}
                               </p>
                             </div>
                               </div>
                           </Link>
                        ))):(<NoResults text={`No accounts for ${searchValue}`}/>)}
        </div>)}
    </div>
  )
}
export const getServerSideProps=async({params:{searchValue}}:{
    params:{searchValue:string}
  })=>{
  const res = await axios.get(`${BASE_URL}/api/search/${searchValue}`)
  return{
    props:{
      videos:res.data
    }
  }
  }
export default Search