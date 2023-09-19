import Feed from "../_components/Feed";
import Sidebar from "../_components/Sidebar";

function page() {
  return (
    <div className="grid h-screen md:grid-cols-[1fr_1fr_1fr_1fr]">
      <Sidebar />
      <Feed />
    </div>
  );
}

export default page;
