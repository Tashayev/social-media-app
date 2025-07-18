'use client'
import React from 'react'
import Image from 'next/image'
import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { arrayRemove, arrayUnion, doc, DocumentData, Timestamp, updateDoc } from 'firebase/firestore';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { openCommentModal, openLogInModal, setCommentDitails } from '@/redux/slices/modalSlice';
import Link from 'next/link';
import { RootState } from '@/redux/store';
import { db } from '@/firebase';

interface PostProps {
  data: DocumentData; 
  id: string
}
export default function Post({ data, id }: PostProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  async function likePost() {

    if(!user.username){
      dispatch(openLogInModal());
      return; 
    }

    const postRef = doc(db, "posts", id);
    if (data.likes.includes(user.uid)) {
      await updateDoc(postRef, {
      likes: arrayRemove(user.uid)
    })
    }
    else{
      await updateDoc(postRef, {
      likes: arrayUnion(user.uid)
    })
    }
  }
  return (
    <div className='ml-6 p-3 border-gray-100'>
      <Link href={'/' + id}>
        <PostHeader
          username={data.username}
          name={data.name}
          timestamp={data.timestamp}
          text={data.text}
        />
      </Link>
      <div className='ml-16 p-3 flex space-x-14'>
        <div className='relative'>
          <ChatBubbleOvalLeftEllipsisIcon
            className='w-[22px] h-[22px] cursor-pointer
            hover:text-bee transition'
            onClick={() => {
              if(!user.username){
                dispatch(openLogInModal());
                return;
              }
              dispatch(setCommentDitails({
                name: data.name,
                username: data.username,
                id: id,
                text: data.text
              }))
              dispatch(openCommentModal())
            }}
          />
          {data.comments.length > 0 &&
            <span className='absolute text-xs top-1 -right-3'>
              {data.comments.length}
            </span>
          }
        </div>
        <div className='relative'>
          {data.likes.includes(user.uid)?
            <HeartSolid className='w-[22px] h-[22px] cursor-pointer
            text-pink-500'
            onClick={() => likePost()}
            />
            :<HeartIcon
              className='w-[22px] h-[22px] cursor-pointer
              hover:text-pink-500 transition'
              onClick={() => likePost()}
            />
          }
          {data.likes.length > 0 &&
            <span className='absolute text-xs top-1 -right-3'>
              {data.likes.length}
            </span>
          }
        </div>
        <div className='relative'>
          <ChartBarIcon
            className='w-[22px] h-[22px] cursor-not-allowed'
          />
        </div>
        <div className='relative'>
          <ArrowUpTrayIcon
            className='w-[22px] h-[22px] cursor-not-allowed'
          />
        </div>
      </div>
    </div>
  )
}

interface PostHeaderProps {
  username: string;
  name: string;
  timestamp?: Timestamp;
  text: string,
  replyTo?: string
};

export function PostHeader({ 
  username, name, timestamp, text, replyTo }: PostHeaderProps) {

  return (
    <div className='flex p-3 space-x-5'>
      <Image alt='Profile pic'
        width={44}
        height={44}
        src={"/assets/user.png"}
        className='w-11 h-11 z-10 bg-white'
      />
      <div className='text-[15px] flex flex-col space-y-1.5'>
        <div className='flex space-x-1.5  text-[#707e89]'>
          <span className='
          font-bold text-[#0f1419] whitespace-nowrap 
          overflow-hidden text-ellipsis 
          inline-block max-[60px] min-[400px]:max-w-[100px]
           min-[500px]:max-w-[140px] sm:max-w-[160px]'
          >
            {name}
          </span>
          <span className='whitespace-nowrap overflow-hidden text-ellipsis inline-block
          max-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]'
          >
            @{username}
          </span>
          
          {timestamp && (
            <>
              <span>•</span>
              <Moment fromNow>{timestamp.toDate()}</Moment>
            </>
          )}
        </div>
        <span>{text}</span>
        {replyTo && (
          <span className='text-[15px] text-[#707e89] '>
            Replying to <span className="text-bee">@{replyTo}</span>
          </span>
        )}
      </div>
    </div>
  )
}
