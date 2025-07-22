'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { PhotoIcon,
  ChartBarIcon,
  FaceSmileIcon,
  CalendarIcon,
  MapPinIcon
 } from '@heroicons/react/24/outline'
 import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import {  useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { closeCommentModal, openLogInModal } from '@/redux/slices/modalSlice'

interface PostInputProps{
  insideModal?: boolean
}

export default function PostInput({insideModal}: PostInputProps) {
  const [text, setText] = useState('');
  const user = useSelector((state: RootState)=> state.user)
  const commentDetails = useSelector((state: RootState) =>
  state.modals.commentPostDetails)
  const dispatch = useDispatch();

  async function sendPost() {
    
    if(!user.username){
      dispatch(openLogInModal());
      return;
    }
    await addDoc(collection(db, 'posts'),{
      text: text,
      name: user.name,
      username: user.username,
      timestamp: serverTimestamp(),
      likes: [],
      comments: [],
    });
    setText('');
  }
 
  async function sendComment() {
    const postRef = doc(db, 'posts', commentDetails.id)
    await updateDoc(postRef,{
      comments: arrayUnion({
        name: user.name,
        username: user.username,
        text: text,
      })
    })
    setText('');
    dispatch(closeCommentModal());
  }
  return (
    <div className='flex space-x-5 p-3
    border-b border-gray-100
    '>
      <Image 
        alt={insideModal ? 'Profile pic' : 'Logo'}
        src={insideModal ? '/assets/user.png' : '/assets/bee.png'}
        width={48}
        height={48}
        className='w-11 h-11 z-10 bg-white' 
      />
      <div className='w-full'>
        <textarea className='resize-none outline-none
          w-full min-h-[50px] text-lg'
          placeholder={insideModal ? "Send your reply" : "What's happening!?"}
          value={text}
          onChange={(e)=>setText(e.target.value)}
        />
        <div className='flex justify-between pt-5 border-t border-gray-100'>
          <div className='flex space-x-1.5'>
            <PhotoIcon className='w-[22px] h-[22px] text-bee'/>
            <ChartBarIcon 
            
            className='w-[22px] h-[22px] text-bee'
            />
            <FaceSmileIcon className='w-[22px] h-[22px] text-bee'/>
            <CalendarIcon className='w-[22px] h-[22px] text-bee'/>
            <MapPinIcon className='w-[22px] h-[22px] text-bee'/>
          </div>
          <button
            className='w-[80px] h-[36px] rounded-full text-sm
             text-white cursor-pointer bg-bee disabled:bg-opacity-60'
            onClick={()=> insideModal ? sendComment() : sendPost()}
            disabled={!text}
          >Bumble</button>
        </div>
      </div>
    </div>
  )
}
