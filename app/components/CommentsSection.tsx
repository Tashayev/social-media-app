
import React from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { ArrowLeftIcon, ArrowUpTrayIcon, ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon, HeartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { PostHeader } from './post/Post'

interface Comment {
  name: string;
  username: string;
  text: string;
}

interface CommentProps {
  name: string;
  username: string;
  text: string;
}

const fetchPost = async (id: string) => {
  const postRef = doc(db, "posts", id)
  const postSnap = await getDoc(postRef)
  return postSnap.data()
}

function Comment({ name, username, text }: CommentProps) {
  return (
    <div className="border-b border-gray-100">
      <PostHeader name={name} username={username} text={text} />
      <div className="flex space-x-14 p-3 ms-16">
        <ChatBubbleOvalLeftEllipsisIcon className='w-[22px] cursor-not-allowed' />
        <HeartIcon className='w-[22px] cursor-not-allowed' />
        <ChartBarIcon className='w-[22px] cursor-not-allowed' />
        <ArrowUpTrayIcon className='w-[22px] cursor-not-allowed' />
      </div>
    </div>
  )
}

interface CommentSectionProps {
  params: {
    id: string
  }
}

export default async function CommentSection({ params }: CommentSectionProps) {
  const { id } = params
  const post = await fetchPost(id)

  return (
    <div className='flex-grow max-w-2xl border-x border-gray-100'>
      <div className='py-4 px-3 text-lg sm:text-xl sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-100 flex items-center'>
        <Link href="/"><ArrowLeftIcon className='w-5 h-5 mr-10' /></Link>
        Bumble
      </div>

      <div className='flex flex-col p-3 space-y-5 border-b border-gray-100'>
        <div className='flex justify-between items-center m-1.5'>
          <div className='flex space-x-3'>
            <Image width={44} height={44} src="/assets/user.png" alt="User pic" className='w-11 h-11' />
            <div className='flex flex-col text-[15px]'>
              <span className='font-bold overflow-hidden text-ellipsis'>
                {post?.name}
              </span>
              <span className='text-[#707e89] overflow-hidden text-ellipsis'>
                {post?.username}
              </span>
            </div>
          </div>
          <EllipsisHorizontalIcon className='w-5 h-5' />
        </div>
        <span className='text-[15px]'>{post?.text}</span>
      </div>

      <div className='border-b border-gray-100 p-3 text-[15px]'>
        <span className="font-bold">{post?.likes?.length ?? 0}</span> Likes
      </div>

      <div className='border-b border-gray-100 p-3 text-[15px] flex justify-evenly'>
        <ChatBubbleOvalLeftEllipsisIcon className='w-[22px] text-[#707e89] cursor-not-allowed' />
        <HeartIcon className='w-[22px] text-[#707e89] cursor-not-allowed' />
        <ChartBarIcon className='w-[22px] text-[#707e89] cursor-not-allowed' />
        <ArrowUpTrayIcon className='w-[22px] text-[#707e89] cursor-not-allowed' />
      </div>

      {post?.comments?.map((comment: CommentProps, index: number) => (
        <Comment
          key={index}
          name={comment.name}
          username={comment.username}
          text={comment.text}
        />
      ))}
    </div>
  )
}
