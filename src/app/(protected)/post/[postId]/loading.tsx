import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";

function loading() {
  return (
    <div>
      <Skeleton id="title" className="mb-1 h-5 w-2/3 text-xl" />

      <Skeleton id="createdAt" className="mb-4 h-[14px] w-3/4 text-sm" />

      <Skeleton id="img" className="mb-4 h-72 w-full" />

      <Separator className="mb-2" />

      {/* description start */}
      <Skeleton className="mb-1 h-4" />
      <Skeleton className="mb-1 h-4 w-1/3" />
      <Skeleton className="h-4 w-3/4" />
      {/* description end */}

      <Separator className="my-8" />

      <Skeleton id="contact" className="mb-1 h-3 w-4/5" />

      <Skeleton id="share" className="mb-5 h-3 w-24" />

      <div id="share-btn-container" className="flex gap-2">
        <Skeleton id="facebook" className="mb-1 h-10 w-14" />
        <Skeleton id="x-twitter" className="mb-1 h-10 w-14" />
        <Skeleton id="clipboard" className="mb-1 h-10 w-14" />
      </div>
    </div>
  );
}

export default loading;
