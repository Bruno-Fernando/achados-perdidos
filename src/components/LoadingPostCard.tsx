import { Separator } from "./ui/Separator";
import { Skeleton } from "./ui/Skeleton";

interface Props {
  qtyCards?: number;
  showActionBtns?: boolean;
}

function LoadingPostCard({ qtyCards, showActionBtns }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {Array.apply(null, Array(qtyCards || 2)).map((_, index) => (
        <div
          className="rounded-lg border border-l-8 border-l-slate-600"
          key={index}
        >
          <Skeleton id="post-img" className="h-[300px] w-full rounded-lg" />

          <Skeleton
            id="post-created-at"
            className="ml-auto mr-3 mt-1 h-4 w-24"
          />

          <div className="space-y-2 px-3 pb-3">
            <Skeleton id="post-title" className="h-5 w-56" />

            <Skeleton id="post-description" className="h-4 w-72" />
          </div>

          {showActionBtns && (
            <>
              <Separator />

              <div className="my-4 flex justify-center gap-4">
                <Skeleton id="edit-btn" className="h-10 w-24" />
                <Skeleton id="delete-btn" className="h-10 w-24" />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default LoadingPostCard;
