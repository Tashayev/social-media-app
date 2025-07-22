'use client'


import Widgets from '../components/Widgets'
import SignUpPromt from '../components/SignUpPromt'
import { Suspense } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import Sidebar from '../components/sidebar/Sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="text-[#0f1419] max-w-[1400px] min-h-screen mx-auto flex justify-center">
        <Sidebar />
        <Suspense fallback={<LoadingScreen/>}>
          <div className='flex-grow max-w-2xl border-x border-gray-100'>
          {children}
        </div>
        </Suspense>
        <Widgets />
      </div>
      <SignUpPromt />
    </>
  )
}
