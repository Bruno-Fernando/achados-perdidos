import PostCard from "./PostCard";

function Feed() {
  return (
    <div className="col-span-2 flex flex-col gap-4 p-4 pt-16">
      <PostCard lost />

      <PostCard />
    </div>
  );
}

export default Feed;
