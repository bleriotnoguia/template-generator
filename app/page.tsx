import LeftSidebar from "@/components/LeftSidebar";
import Main from "./main";
import RightSidebar from "@/components/RightSidebar";

export default function Page() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <LeftSidebar />
      <Main />
      <RightSidebar />
    </div>
  );
}
