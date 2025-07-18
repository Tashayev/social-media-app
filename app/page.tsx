import Sidebar from "./components/Sidebar";
import PostFeed from "./components/PostFeed";
import Widgets from "./components/Widgets";
import SignUpPromt from "./components/SignUpPromt";
import CommentModal from "./components/modals/CommentModal";
import LoadingScreen from "./components/LoadingScreen";
export default function Home() {
  return (
    <div className="bg-gradient-to-br from-[#fff8e1] 
    via-[#fff3c0] to-[#f4af01]/10 h-screen w-screen">
      <div className="text-[#0f1419] max-w-[1400px] min-h-screen  mx-auto
        flex justify-center ">
        <Sidebar />
        <PostFeed />
        <Widgets />
      </div>
      <CommentModal />
      <SignUpPromt />
      <LoadingScreen />
    </div>
  );
}
