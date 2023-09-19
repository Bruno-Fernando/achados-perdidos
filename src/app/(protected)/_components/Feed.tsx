import PostCard from "./PostCard";

function Feed() {
  return (
    <div className="flex flex-col gap-4 p-4 pt-16 md:col-span-2">
      <PostCard lost />

      <PostCard />
    </div>
  );
}

export default Feed;
