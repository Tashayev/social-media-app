import CommentSection from '@/app/components/CommentsSection';
import Sidebar from '@/app/components/sidebar/Sidebar';
import SignUpPromt from '@/app/components/SignUpPromt';

import Widgets from '@/app/components/Widgets';
import React from 'react'



interface PageProps {
  params: {
    id: string;
  }
}

export default function Page({ params }: PageProps) {
  return (
    <>
      <div className="text-[#0f1419] max-w-[1400px] min-h-screen mx-auto flex justify-center">
        <Sidebar />
        
        <CommentSection params={params} /> 
        <Widgets />
      </div>
      <SignUpPromt />
    </>
  )
}
