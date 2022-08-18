import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { Video } from "../../types";
import useAuthStore from "../../store/authStore";
import { postDetailQuery } from "../../utils/queries";
import { BASE_URL } from "../../utils";
import Comments from "../../components/Comments";
import LikeButton from "../../components/LikeButton";
interface IProps {
  postDetails: Video;
}
const Details = ({ postDetails }: IProps) => {
  const [post, setpost] = useState(postDetails);
  const {userProfile}:any=useAuthStore()
  const router = useRouter();
  const [isPlaying, setisPlaying] = useState(false);
  const [isMuted, setisMuted] = useState(false);
  const [comment, setcomment] = useState('')
  const [isPostingComment, setisPostingComment] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null);
  if (!post) {
    return null;
  }
  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setisPlaying(false);
    } else {
      videoRef?.current?.play();
      setisPlaying(true);
    }
  };
  const handleLike=async(like:boolean)=>{
    if (userProfile) {
      const {data}=await axios.put(`${BASE_URL}/api/like`,{
        userId:userProfile._id,
        postId:post._id,
        like
      })
      setpost({...post,likes:data.likes})
    }

  }
  const addComment=async(e:any)=>{
    e.preventDefault()
    if (userProfile && comment) {
      setisPostingComment(true)

      const {data} = await axios.put(`${BASE_URL}/api/post/${post._id}`,{
        userId:userProfile._id,
        comment
      })
      setpost({...post,comments:data.comments})
      setcomment('')
      setisPostingComment(false)
    }
  }
  return (
    <div className="flex w-full absolute left-0 top-0   bg-white  lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px]  lg:w-9/12 flex items-center justify-center bg-black bg-no-repeat bg-cover bg-center">
        <div
          className="absolute top-6 left-2 lg:left-6 cursor-pointer flex gap-6 z-50"
          onClick={() => {
            router.push("/");
          }}
        >
          <p>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[100vh]">
            <video
              ref={videoRef}
              muted={isMuted ? true : false}
              loop
              src={post.video.asset.url}
              onClick={onVideoClick}
              className="h-full cursor-pointer "
            ></video>
          </div>
          <div className="absolute top-[45%] left-[45%]">
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
        <div
          className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer "
          onClick={() => {
            setisMuted((prevState) => !prevState);
          }}
        >
          {!isMuted && (
            <div className="text-white text-3xl">
              <HiVolumeUp />
            </div>
          )}
          {isMuted && (
            <div className="text-white text-3xl">
              <HiVolumeOff />
            </div>
          )}
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <div className="flex gap-3 items-center p-2 cursor-pointer font-semibold rounded">
            <div className="w-16 h-16 ml-4 md:w-20 md:h-20">
              <Link href="/">
                <>
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={post.postedBy.image}
                    layout="responsive"
                    alt="profilePhoto"
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href="/">
                <div className="flex gap-3 flex-col">
                  <span className="flex gap-2 items-center font-semibold md:text-md">
                    {post.postedBy.userName}
                    <GoVerified className="text-blue-500" />
                  </span>
                  <span className="text-xs font-medium hidden md:block text-gray-500">
                    {post.postedBy.userName}
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <p className="px-10 text-gray-600 text-lg">
            {post.caption}
          </p>
          <div className="mt-10 px-10">
            {userProfile && (
              <LikeButton likes={post.likes} handleLike={()=>handleLike(true)} handleDislike={()=>handleLike(false)}/>
            )}
          </div>
          <Comments
          comment={comment}
          setComment={setcomment}
          addComment={addComment}
          isPostingComment={isPostingComment}
          comments={post.comments}
          />
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: {
      postDetails: data,
    },
  };
};
export default Details;
