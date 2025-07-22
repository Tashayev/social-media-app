'use client'
import * as React from 'react';
import Image from 'next/image'
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '@/redux/slices/userSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { closeLogInModal, closeSignUpModal } from '@/redux/slices/modalSlice';

export default function UserInfo() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user)
  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser());
    dispatch(closeSignUpModal());
    dispatch(closeLogInModal());
  }

  

  return (
    <>
      <div className='fixed bottom-5 left-1 sm:left-5 flex items-center justify-start 
      space-x-2 rounded-full xl:p-3 xl:pe-6 hover:bg-gray-500 p-0
      hover:bg-opacity-10 transition cursor-pointer w-fit xl:w-[240px]'
        onClick={handleClick}
      >
        <Image
          src={'/assets/user.png'}
          width={36}
          height={36}
          alt='User pic'
          className='w-9 h-9'
        />
        <div className="xl:flex flex-col text-sm hidden
        max-w-40">
          <span className='font-bold whitespace-nowrap 
          text-ellipsis overflow-hidden'>
            {user.name}
          </span>
          <span className='text-gray-500 whitespace-nowrap 
          text-ellipsis overflow-hidden'>
            @{user.username}
          </span>
        </div>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top', horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top', horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            mr: 1,
            borderRadius: 10,
            boxShadow: 3,
            minWidth: 160,           
          },
        }}
        MenuListProps={{
          disablePadding: true, // убираем padding у ul
        }}
      >
        <div
          onClick={() => {
            handleSignOut();
            handleClose();
          }}
          className="p-5 text-sm text-center hover:bg-gray-100 cursor-pointer transition "
        >
          Logout
        </div>
      </Menu>

    </>
  )
}
