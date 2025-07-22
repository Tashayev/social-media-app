'use client'


import CommentModal from '../components/modals/CommentModal'
import LoadingScreen from '../components/LoadingScreen'
import UserInfo from '../components/UserInfo'
import PostFeed from '../components/post/PostFeed'
import DiscoverPage from './explore/page'

export default function Home() {
  return (
    <>
      <PostFeed />
      <CommentModal />
      <DiscoverPage/>      
      <UserInfo />
    </>
  )
}
