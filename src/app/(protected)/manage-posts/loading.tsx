import LoadingPostCard from "@/components/LoadingPostCard";
import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";

function loading() {
  return (
    <>
      <div className="text-center">
        <Skeleton
          id="user-profile-img"
          className="mx-auto mb-3 h-24 w-24 rounded-full"
        />

        <Skeleton id="user-name" className="mx-auto mb-4 h-4 w-40" />

        <Skeleton id="user-email" className="mx-auto mb-4 h-4 w-72" />
      </div>

      <Separator className="my-4" />

      <Skeleton id="my-posts" className="mb-5 h-4 w-36" />

      <LoadingPostCard showActionBtns />
    </>
  );
}

export default loading;
