import { EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Image from 'next/image'

export default function Widgets() {
  return (
    <div className='p-3 hidden lg:flex flex-col 
    space-y-4 mb-[75px] ps-10
    '>
      <div className='bg-[#eff3f4]
      text-[#89959d] flex items-center space-x-3
      rounded-full pl-5 h-[44px]
      '>
        <MagnifyingGlassIcon
          className='w-[20px] h-[20px]'
        />
        <input type="text"
          placeholder='Search Happy Bee'
          className='bg-transparent outline-none '
        />
      </div>
      <div className='bg-[#eff3f4]
      rounded-xl p-3'>
        <h1 className='text-lg font-bold mb-2'>
          Whats's happening?
        </h1>
        <div className='flex flex-col text-sm py-3 space-y-0.5'>
          <div className='flex justify-between text-[#536471] text-[13px]'>
            <span>Trending in world</span>
            <EllipsisHorizontalIcon
              className='w-[20px]'
            />
          </div>
          <span className='font-bold text-sm'>#GlobalWarming</span>
          <span className='text-[#536471] text-xs'>3b Bumbles</span>
        </div>
        <div className='flex flex-col text-sm py-3 space-y-0.5'>
          <div className='flex justify-between text-[#536471] text-[13px]'>
            <span>Trending in Kazakhstan</span>
            <EllipsisHorizontalIcon
              className='w-[20px]'
            />
          </div>
          <span className='font-bold text-sm'>#KayratNurtas</span>
          <span className='text-[#536471] text-xs'>250k Bumbles</span>
        </div>
        <div className='flex flex-col text-sm py-3 space-y-0.5'>
          <div className='flex justify-between text-[#536471] text-[13px]'>
            <span>Trending in Russia</span>
            <EllipsisHorizontalIcon
              className='w-[20px]'
            />
          </div>
          <span className='font-bold text-sm'>#HabibNurmuhammedow</span>
          <span className='text-[#536471] text-xs'>930k Bumbles</span>
        </div>
        <div className='flex flex-col text-sm py-3 space-y-0.5'>
          <div className='flex justify-between text-[#536471] text-[13px]'>
            <span>Trending in USA</span>
            <EllipsisHorizontalIcon
              className='w-[20px]'
            />
          </div>
          <span className='font-bold text-sm'>#SpaceX</span>
          <span className='text-[#536471] text-xs'>2m Bumbles</span>
        </div>
      </div>
      <div className='bg-[#eff3f4] rounded-xl p-3'>
        <h1 className='text-xl font-bold mb-2'>
          Who to Follow
        </h1>
        <div className='flex justify-between items-center py-3'>
          <div className="flex space-x-3 items-center">
            <Image alt='Pof pic of Henry'
              src={'/assets/Cavill.jpg'} width={56} height={56}
              className="w-14 h-14 rounded-full"
            />
          </div>
          <div className="flex flex-col text-sm">
            <span className='font-bold'>Henry Cavill</span>
            <span>@henrycavill</span>
          </div>
          <button className='bg-[#0f1419] text-white w-[72px] h-[40px] rounded-full text-sm'>Follow</button>
        </div>
        <div className='flex justify-between items-center py-3'>
          <div className="flex space-x-3 items-center">
            <Image alt='Pof pic of Ana'
              src={'/assets/Ana.jpg'} width={56} height={56}
              className="w-14 h-14 rounded-full"
            />
          </div>
          <div className="flex flex-col text-sm">
            <span className='font-bold'>Ana de Armas</span>
            <span>@ana_d_armas</span>
          </div>
          <button className='bg-[#0f1419] text-white w-[72px] h-[40px] rounded-full text-sm'>Follow</button>
        </div>
        <div className='flex justify-between items-center py-3'>
          <div className="flex space-x-3 items-center">
            <Image alt='Pof pic of Sydn44'
              src={'/assets/Sydney.jpg'} width={56} height={56}
              className="w-14 h-14 rounded-full"
            />
          </div>
          <div className="flex flex-col text-sm">
            <span className='font-bold'>Sydney Sweeney</span>
            <span>@sydney_sweeney</span>
          </div>
          <button className='bg-[#0f1419] text-white w-[72px] h-[40px] rounded-full text-sm'>Follow</button>
        </div>
      </div>
    </div>
  )
}
