'use client'
import { LinearProgress } from '@mui/material'
import Image from 'next/image'
import React from 'react'
// import { useSelector } from 'react-redux'
// import { RootState } from '@/redux/store'


export default function LoadingScreen() {
  
  return (
    <div className={`fixed top-0 left-0 button-0
    right-0 bg-white h-screen w-screen
    flex flex-col items-center justify-center transition
     'opacity-100  z-50' `}>
      <div className="flex flex-col items-center">
        <Image
          width={120}
          height={120}
          alt='Bee logo'
          src={'/assets/bee.png'}
          className='mb-5'
        />
        <h1 className="mb-10 text-6xl font-bold">
          Happy <span className='text-bee'>bee</span>
        </h1>
        <LinearProgress sx={{
          width: 265,
          height: 10,
          backgroundColor: '#f4af01',
          '& .MuiLinearProgress-bar': {
            backgroundColor: "black",
          }
        }}/>
      </div>
    </div>
  )
}
