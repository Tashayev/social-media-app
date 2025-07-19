import Sidebar from "./components/Sidebar";
import PostFeed from "./components/PostFeed";
import Widgets from "./components/Widgets";
import SignUpPromt from "./components/SignUpPromt";
import CommentModal from "./components/modals/CommentModal";
import LoadingScreen from "./components/LoadingScreen";
import UserInfo from "./components/UserInfo";
export default function Home() {
  return (
    <>
      <div className="text-[#0f1419] max-w-[1400px] min-h-screen  mx-auto
        flex justify-center ">
        <Sidebar />
        <PostFeed />
        <Widgets />
      </div>
      <CommentModal />
      <SignUpPromt />
      <LoadingScreen />
      <UserInfo/>
    </>
  );
}
