import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import axios from 'axios'
import useAuthStore from '../store/authStore'
import { client } from '../utils/client'
import { SanityAssetDocument } from '@sanity/client'
import { topics } from '../utils/constants'
import { BASE_URL } from '../utils'
const Upload = () => {
    const router = useRouter()
    const [isLoading, setisLoading] = useState(false)
    const [videoAsset, setvideoAsset] = useState<SanityAssetDocument|undefined>()
    const [wrongFileType, setwrongFileType] = useState(false)
    const [caption, setCaption] = useState("")
    const [category, setCategory] = useState(topics[0].name)
    const [savingPost,setSavingPost]=useState(false)
    const {userProfile}:{userProfile:any}=useAuthStore()
    const uploadVideo=async(e:any)=>{
        const selectedFile = e.target.files[0]
        setisLoading(true)
        const fileTypes=['video/mp4','video/webm','video/ogg']
        if (fileTypes.includes(selectedFile.type)) {
            let data
            try {
              data= await  client.assets.upload('file',selectedFile,{
                    contentType:selectedFile.type,
                    filename:selectedFile.name
                })
            } catch (error) {
                console.log("Some Error Occuered")
                return
            }
            setvideoAsset(data)
            setisLoading(false)
        }else{
            setisLoading(false)
            setwrongFileType(true)
            setTimeout(() => {
                setwrongFileType(false)
            }, 2000);
        }
    }
    const handlePost=async()=>{
        if (caption && videoAsset?._id && category) {
            setSavingPost(true)
            const document={
                _type:'post',
                caption,
                video:{
                    _type:'file',
                    asset:{
                        _type:"reference",
                        _ref:videoAsset?._id
                    }
                },
                userId:userProfile?._id,
                postedBy:{
                    _type:'postedBy',
                    _ref:userProfile?._id
                },
                topic:category
            }
            await axios.post(`${BASE_URL}/api/post`,document)
            router.push('/')
        }
    }
  return (
    <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center'>
        <div className='bg-white rounded-lg xl:h-[90vh] flex gap-6 flex-wrap justify-evenly items-center p-12 w-[80%]'>

            <div>
                <div>
                    <p className='text-2xl font-bold'>Upload Video</p>
                    <p className='text-md text-gray-400 mt-1'>Post Video to account</p>
                </div>
                <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
                    {isLoading ? (
                        <p>
                            Uploading...
                        </p>
                    ):(
                        <div>
                            {videoAsset?(
                                <div>
                                    <video src={videoAsset.url} loop controls className='rounded-xl h-[450px] bg-black'>

                                    </video>
                                </div>
                            ):(
                                <label className='cursor-pointer'>
                                    <div className='flex flex-col items-center justify-center h-full'>
                                    <div className='flex flex-col items-center justify-center '>
                                            <p className='font-bold text-xl'>
                                                <FaCloudUploadAlt
                                                className='text-gray-300 text-6xl'
                                                />
                                            </p>
                                            <p className='text-xl font-semibold '>
                                               Upload Video
                                            </p>
                                        </div>
                                        <p className='text-gray-400 text-center text-sm mt-10 leading-10'>
                                            MP4 or WebM or ogg <br/>
                                            720x1280 or higher <br/>
                                            Up to 10 minuter <br/>
                                            Less than 2GB
                                        </p>
                                        <p className='bg-[#f51997] text-center mt-10 rounded text-white text-base font-medium p-2 w-52 outlone-none'>
                                            Select File
                                        </p>
                                    </div>
                                    <input type="file" className='w-0 h-0' onChange={uploadVideo} name='upload-video' />
                                </label>
                            )}
                        </div>
                    )}
                    {wrongFileType && <p className='text-center text-xl text-red-400 font-semibold w-[250px] mt-4'>Please select a video file.</p>}
                </div>
              
            </div>
            <div className='flex flex-col gap-3 pb-10'>
                    <label htmlFor="" className='text-base font-medium'>Caption</label>
                    <input type="text" name="" id="" value={caption} onChange={(e)=>{setCaption(e.target.value)}}  className="rounded outline-none border-gray-200 border-2 p-2" />
                    <label htmlFor="" className='text-base font-medium'>
                        Choose a category
                    </label>
                    <select name="" id="" onChange={(e)=>{setCategory(e.target.value)}} value={category} className="rounded outline-none border-gray-200 border-2 p-2 lg:p-4 capitalize  cursor-pointer ">
                       {topics.map((topic)=>{return <option key={topic.name} className="outline-none capitalize bg-white text-gray-700 text-base p-2 hover:bg-slate-300" value={topic.name}>{topic.name}</option>})}
                    </select>
                    <div className='flex gap-6 mt-10'>
                        <button onClick={()=>{}} type="button" className='border-gray-300 border-2  text-base font-medium p-2 rounded w-28 lg:w-44 outline-none'>
                                Discard
                        </button>
                        <button onClick={handlePost} type="button" className='bg-[#f51997] text-white  text-base font-medium p-2 rounded w-28 lg:w-44 outline-none'>
                                Post
                        </button>

                    </div>
                </div>
        </div>
    </div>
  )
}

export default Upload