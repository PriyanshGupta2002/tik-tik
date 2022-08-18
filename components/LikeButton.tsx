import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { MdFavorite } from 'react-icons/md'
import useAuthStore from '../store/authStore'
import { BASE_URL } from '../utils'
interface IProps{
    handleLike:()=>void,
    handleDislike:()=>void,
    likes:any[]

}
const LikeButton = ({handleLike,handleDislike,likes}:IProps)=> {
    const [alreadyLiked, setalreadyLiked] = useState(false)
    const {userProfile}:any=useAuthStore()
    const filterLikes=likes?.filter((item)=>{return item._ref===userProfile?._id})
    useEffect(() => {
            if (filterLikes?.length>0) {
                setalreadyLiked(true)
            }else{
                setalreadyLiked(false)
            }
    }, [filterLikes,likes])
    
    
  return (
    <div className=' flex gap-6 '>
        <div className='flex flex-col items-center justify-center cursor-pointer mt-4 '>
            {alreadyLiked?(
                <div className='bg-primary rounded-full p-2 md:p-4 text-[#f51997]' onClick={handleDislike}>
                    <MdFavorite className='text-lg md:text-2xl'/>
                </div>
            ):(
                <div className='bg-primary rounded-full p-2 md:p-4 ' onClick={handleLike}>
                <MdFavorite className='text-lg md:text-2xl'/>
            </div>
            )}
            <p className='text-base font-semibold '>{likes?.length || 0}</p>
        </div>
    </div>
  )
}

export default LikeButton