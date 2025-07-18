"use client"
import { Modal } from '@mui/material';
import { AppDispatch, RootState } from '@/redux/store';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeLogInModal, openLogInModal } from '@/redux/slices/modalSlice';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';


export default function LogInModal() {
  const isOpen = useSelector(
    (state: RootState) => state.modals.logInModalOpen
  );
  const dispatch: AppDispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

  async function handleLogIn() {
    await signInWithEmailAndPassword(auth, email, password)
  }
  
  async function handleGuestLogIn() {
    await signInWithEmailAndPassword(auth, "guest123@gamil.com", "111111");
  }
  
  return (
    <>
      <button onClick={() => dispatch(openLogInModal())}
      className='md:w-[88px] md:h-[40px] 
        md:text-sm text-md font-bold border-2 border-gray-100
         rounded-full text-white
        w-full h-[48px] hover:bg-white hover:bg-opacity-25 transition
        '>Log In</button>
      <Modal 
        open={isOpen}
        onClose={()=>dispatch(closeLogInModal())}       
        className='flex justify-center items-center outline-none'
      >
        <div className='h-full w-full sm:h-fit sm:w-[600px]
         bg-white sm:rounded-xl
        '>
          <XMarkIcon className='w-7 my-5 ms-5 cursor-pointer'
            onClick={() => dispatch(closeLogInModal())}
          />
          <div  className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="mb-10 text-3xl font-bold">Log in to Happy Bee</h1>
            <div className="w-full space-y-5 mb-10">              
              <input 
              className='w-full h-[54px] border border-gray-200
              outline-none ps-3 rounded-[4px] focus:border-bee
              transition'
              placeholder='Email'
              type="email" 
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              />
              <div className='w-full h-[54px] border border-gray-200
                outline-none rounded-[4px] focus-within:border-bee
                transition flex items-center overflow-hidden pr-3'>
                <input 
                className='w-full h-full outline-none ps-3  '
                placeholder='Password'
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                />
                <div
                onClick={()=>setShowPassword(!showPassword)} 
                className="w-7 h-7 text-gray-200 cursor-pointer">
                  {showPassword ? <EyeSlashIcon/> : <EyeIcon/> }
                </div>
              </div>
            </div>
            <button className='h-[48px] rounded-full 
            text-white bg-bee shadow-md mb-5 w-full'
            onClick={()=>handleLogIn()}
            >Log In</button>
            <span className='text-sm mb-5 text-center block'>Or</span>
            <button className='h-[48px] rounded-full 
            text-white bg-bee shadow-md w-full'
            onClick={() => handleGuestLogIn()}
            >Log in as Guest</button>
          </div>
        </div>  
      </Modal>
    </>
  )
}
