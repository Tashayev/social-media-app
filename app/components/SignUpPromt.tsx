'use client'
import React from 'react'
import SignUpModal from './modals/SignUpModal'
import LogInModal from './modals/LogInModal'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function SignUpPromt() {
  const name = useSelector((state: RootState) => state.user.name);
  console.log(name)
  
  return (
    !name &&
    <div className='fixed w-full h-[80px]
     bottom-0 bg-bee flex justify-center 
     items-center md:space-x-5 lg:justify-between
     lg:px-20 xl:px-40 2xl:px-80 z-50
     '>
      <div className='hidden md:flex flex-col text-white'>
        <span>Don't miss out on buzz</span>
        <span>People on Happy Bee are always the first to know</span>
      </div>
      <div className='flex space-x-4 w-full p-3 md:w-fit'>
        <LogInModal />
        <SignUpModal />
      </div>
    </div>
  )
}
