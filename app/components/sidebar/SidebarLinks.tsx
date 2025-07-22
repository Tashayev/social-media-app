'use client'
import React from 'react';
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon
} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';



export default function SidebarLinks() {
  
  return (
    <>      
        <Link href='/'>
          <SidebarLink  Icon={HomeIcon} text='Home' />
        </Link>
        <Link href='/explore'>
          <SidebarLink  Icon={HashtagIcon} text='Explore' />
        </Link>
        <SidebarLink  Icon={ BellIcon} text='Notification' />
        <SidebarLink  Icon={InboxIcon} text='Messages' />
        <SidebarLink  Icon={BookmarkIcon} text='Bookmarks' />
        <SidebarLink  Icon={UserIcon} text='Profile' />
        <SidebarLink  Icon={EllipsisHorizontalCircleIcon} text='More' />     
    </>
  );
};

interface SidebarProps {
  text: string;
  Icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>>;
};

function SidebarLink({ text, Icon }: SidebarProps) {
  const isTextOpen = useSelector((state: RootState) => state.links.isTextVisible)
  return (
    <li className='flex mb-2 items-center text-xl space-x-3 p-2.5 cursor-pointer hover:text-bee'>
      <Icon className="h-7" />
    <span className={isTextOpen ? '' : 'hidden xl:block'}>{text}</span>
    </li>
  );
};

