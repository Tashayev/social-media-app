'use client'
import React, { useEffect, useState } from 'react'
import PostInput from './PostInput'
import Post from './Post'
import { collection, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDispatch } from 'react-redux';
import { closeLoadingScreen } from '@/redux/slices/loadingSlice';
import SidebarUserInfo from './UserInfo';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Box, Drawer, List } from '@mui/material';

import SidebarLinks from './SidebarLinks';
import { hideText, showText } from '@/redux/slices/linksSlice';

export default function PostFeed() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([]);
   const [open, setOpen] = useState(false);
  useEffect(()=>{
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(snapshot )
      const snapshotDocs = snapshot.docs
      
      setPosts(snapshotDocs)
      dispatch(closeLoadingScreen())
    })  
    return unsubscribe    
  },[]);
   const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <ul className='p-3'>
       <SidebarLinks inPostFeedComponent={true}/>       
      </ul>
      
    </Box>
  );
  
  return (
    <div className='flex-grow bg-white
    max-w-2xl border-x border-gray-100'>
      <div className='flex items-center p-5'>
        <Bars3Icon className='h-10 w-10 sm:hidden hover:text-bee cursor-pointer'
          onClick={() => {
            toggleDrawer(!open)(); 
            dispatch(showText());
          }}

        />
        <div className=' text-lg sm:text-xl relative top-0
       z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold
       border-b border-gray-100 left-10 sm:left-1
       '>
        Home
      </div> 
      </div>
      
      <PostInput/>
      {posts.map(post => <Post
        key={post.id}
        data={post.data()}
        id={post.id} 
      />)}
      
      <div className='block sm:hidden px-10'>
        <Drawer open={open} onClose={() => {
          setOpen(false);
          dispatch(hideText());
        }}>
          {DrawerList}
        </Drawer>
        
      </div>
      
    </div>
  )
}

