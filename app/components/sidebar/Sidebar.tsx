import React from 'react'
import SidebarLinks from './SidebarLinks';
import Image from 'next/image';
import SidebarUserInfo from '../UserInfo';

const Sidebar = () => {
  return (
    <nav className='xl:ml-20 h-screen hidden sm:flex flex-col sticky top-0 p-3 xl:mr-10 '>
      <div className="relative h-full flex flex-col">
        <div className='py-3 '>
          <Image alt='Bee icon' src={'/assets/bee.png'} width={48} height={48} className="hover:animate-buzz"/>
        </div>
        <ul>
          <SidebarLinks />
        </ul>
        <button className='xl:block bg-bee 
          rounded-full w-[200px] h-[52px] text-white font-medium 
          cursor-pointer shadow-md mt-2 hidden'>
          Bumble
        </button>

        
      </div>
    </nav>
  )
}

export default Sidebar;



