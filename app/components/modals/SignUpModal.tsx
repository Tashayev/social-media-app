"use client"
import { Modal } from '@mui/material';
import { AppDispatch, RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeSignUpModal, openSignUpModal } from '@/redux/slices/modalSlice';
import { signInUser, signOutUser } from '@/redux/slices/userSlice';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase';


export default function SignUpModal() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isOpen = useSelector(
    (state: RootState) => state.modals.signUpModalOpen
  );

  const dispatch: AppDispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  async function handleSignUp() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await updateProfile(userCredentials.user,{
      displayName: name,      
    });
    dispatch(
      signInUser({
        name: userCredentials.user.displayName,
        username: userCredentials.user.email!.split('@')[0],
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
      })
    )
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      if(!currentUser) return
      //handle Redux Action
      console.log(currentUser);
      dispatch(signInUser({
          name: currentUser.displayName,
          username: currentUser.email!.split('@')[0],
          email: currentUser.email,
          uid: currentUser.uid,
        }
      ));
    })
    return unsubscribe;
  },[])

  async function handleGuestLogIn() {
    await signInWithEmailAndPassword(auth, "guest123@gamil.com", "111111");
  }

  return (
    <>
      <button 
      onClick={
        ()=> dispatch(openSignUpModal())
      }
      className='md:w-[88px] md:h-[40px] 
        md:text-sm text-md font-bold bg-white 
        rounded-full w-full h-[48px]
        '>
          Sign Up
      </button>
      <Modal 
        open={isOpen}
        onClose={()=>dispatch(closeSignUpModal())}      
        className='outline-none flex justify-center items-center'
      >
        <div className='h-full w-full sm:h-fit sm:w-[600px]
         bg-white sm:rounded-xl
        '>
          <XMarkIcon className='w-7 my-5 ms-5 cursor-pointer'
            onClick={() => dispatch(closeSignUpModal())}
          />
          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="mb-10 text-3xl font-bold">Create your account</h1>
            <div className="w-full space-y-5 mb-10">
              <input 
              className='w-full h-[54px] border border-gray-200
              outline-none ps-3 rounded-[4px] focus:border-bee
              transition'
              placeholder='Name'
              type="text" 
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              />
              <input 
              className='w-full h-[54px] border border-gray-200
              outline-none ps-3 rounded-[4px] focus:border-bee
              transition'
              placeholder='Email'
              type="email" 
              value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <div className='w-full h-[54px] border border-gray-200
                outline-none rounded-[4px] focus-within:border-bee
                transition flex items-center overflow-hidden pr-3'>
                <input 
                className='w-full h-full outline-none ps-3  '
                placeholder='Password'
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
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
            onClick={() => handleSignUp()}
            >Sign Up</button>
            <span className='text-sm mb-5 text-center block'>Or</span>
            <button className='h-[48px] rounded-full 
            text-white bg-bee shadow-md w-full'
            onClick={()=>handleGuestLogIn()}
            >Log in as Guest</button>
          </div>
        </div>  
      </Modal>
    </>
  )
}
