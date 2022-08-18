import axios from 'axios'
import NoResults from '../components/NoResults'
import VideoCard from '../components/VideoCard'
import {Video} from '../types'
import { BASE_URL } from '../utils'
interface IProps{
  videos: Video[]
}
const Home = ({videos}:IProps) => {
  return (
    <>
    <div className="flex flex-col gap-10 h-full videos ">
      {videos.length?(videos.map((video:Video)=>{return <VideoCard key={video._id} post={video}/>})):(<NoResults text='No Videos Yet'/>)}
    </div>
    </>
  )
}
export const getServerSideProps=async({query:{topic}}:{query:{topic:string}})=>{
  let response=null
  if (topic) {
    response=await axios.get(`${BASE_URL}/api/discover/${topic}`)
  }
  else{
     response = await axios.get(`${BASE_URL}/api/post`)
  }
  const {data} = response
  return{
    props:{
        videos:data
    }
  }
}
export default Home
