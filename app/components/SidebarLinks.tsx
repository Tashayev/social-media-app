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

export default function SidebarLinks() {
  return (
    <>
      {sidebarObj.map((link) => (
        <SidebarLink key={link.text} Icon={link.iconName} text={link.text} />
      ))}
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
  return (
    <li className='flex mb-2 items-center text-xl space-x-3 p-2.5 cursor-pointer hover:text-bee'>
      <Icon className="h-7" />
      <span className='hidden xl:block'>{text}</span>
    </li>
  );
};

const sidebarObj = [
  { iconName: HomeIcon, text: 'Home' },
  { iconName: HashtagIcon, text: 'Explore' },
  { iconName: BellIcon, text: 'Notification' },
  { iconName: InboxIcon, text: 'Messages' },
  { iconName: BookmarkIcon, text: 'Bookmarks' },
  { iconName: UserIcon, text: 'Profile' },
  { iconName: EllipsisHorizontalCircleIcon, text: 'More' },
];