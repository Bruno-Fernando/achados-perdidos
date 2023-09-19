import Sidebar from "../_components/Sidebar";

function page() {
  return (
    <div className="grid h-screen grid-cols-[1fr_2fr_1fr]">
      <Sidebar />
      <div className="col-span-2">feed</div>
    </div>
  );
}

export default page;
