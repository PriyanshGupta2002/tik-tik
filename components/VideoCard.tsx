import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import { Video } from "../types";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlayFill, BsPauseFill, BsPlay } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

interface IProps {
  post: Video;
}
const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setisHover] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);
  const [isVideoMuted, setisVideoMuted] = useState(false);
  const videoRef= useRef<HTMLVideoElement>(null)
  // console.log(post)
  const onVideoPress=()=>{
    if (isPlaying) {
        videoRef?.current?.pause()
        setisPlaying(false)
    }
    else{
      videoRef?.current?.play()
      setisPlaying(true)
    }
  }
 
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 items-center p-2 cursor-pointer font-semibold rounded">
          <div className="w-10 h-10 md:w-16 md:h-16">
            <Link href={`/profile/${post.postedBy._id}`}>
            
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  layout="responsive"
                  alt="profilePhoto"
                />
              
            </Link>
          </div>
          <div>
          <Link href={`/profile/${post.postedBy._id}`}>

              <div className="flex gap-5 items-center">
                <span className="flex gap-2 items-center font-semibold md:text-md">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-blue-500" />
                </span>
                <span className="text-xs font-medium hidden md:block text-gray-500">
                  {post.postedBy.userName}
                </span>
              </div>
            </Link>
                <span className="my-3">
                  {post.caption}
                </span>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 flex gap-4 relative">
        <div onMouseEnter={() => {
                setisHover(true);
              }}
              onMouseLeave={() => {
                setisHover(false);
              }} className="rounded-3xl ">
          <Link href={`/detail/${post._id}`}>
            <video 
              muted={isVideoMuted?true:false}
              loop
              ref={videoRef}
              src={post.video.asset.url}
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[500px] w-[200px] cursor-pointer bg-gray-200"
            ></video>
          </Link>
          {isHover && (
            <div className="absolute bottom-6 left-8 cursor-pointer md:left-14 lg:left-0 flex w-[37rem] p-4 gap-10 items-center lg:gap-80">
              {isPlaying ? (
                <button onClick={onVideoPress}>
                  <BsPauseFill className="text-3xl text-black lg:text-4xl"/>
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsPlayFill className="text-3xl text-black lg:text-4xl"/>
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={()=>{setisVideoMuted(false)}}>
                  <HiVolumeOff className="text-3xl text-black lg:text-4xl"/>
                </button>
              ) : (
                <button onClick={()=>{setisVideoMuted(true)}}>
                  <HiVolumeUp className="text-3xl text-black lg:text-4xl"/>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
