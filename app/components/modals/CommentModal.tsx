'use client'
import { Modal } from '@mui/material'
import { RootState } from '@/redux/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeCommentModal } from '@/redux/slices/modalSlice'
import { PostHeader } from '../Post'
import PostInput from '../PostInput'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function CommentModal() {
  const open = useSelector((state: RootState) => state.modals.commentModalOpen)
  const dispatch = useDispatch();
  const commentDitails = useSelector((state: RootState) => state.modals.commentPostDetails)
  return (
    <>
      <Modal
        className='flex justify-center items-center'
        open={open}
        onClose={() => dispatch(closeCommentModal())}
      >
        <div className='w-full h-full sm:w-[600px] sm:h-fit 
        bg-white sm:rounded-xl outline-none relative'>
          <XMarkIcon className='w-7 mt-5 ms-5 cursor-pointer'
            onClick={() => dispatch(closeCommentModal())}
          />
          <div className='pt-5 pb-10 px-0 sm:px-5 flex flex-col'>
            <PostHeader 
              name={commentDitails.name}
              username={commentDitails.username}
              text={commentDitails.text}
              replyTo={commentDitails.username}
            />
            <div className="mt-4">
              <PostInput insideModal={true}/>
            </div>
            <div className="h-32 w-0.5 absolute
             bg-gray-300 left-[33px] sm:left-[53px] top-20 z-0"></div>
          </div>
        </div>
      </Modal>
    </>
  )
}
