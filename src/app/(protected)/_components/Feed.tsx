import PostCard from "./PostCard";

function Feed() {
  return (
    <div className="flex flex-col gap-4">
      <PostCard lost />

      <PostCard />
    </div>
  );
}

export default Feed;
