import LoadingPostCard from "@/components/LoadingPostCard";
import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";

function loading() {
  return (
    <>
      <div className="flex items-center gap-2">
        <Skeleton id="total-items" className="mb-4 h-4 w-32" />

        <Skeleton id="filters-btn" className="mb-4 ml-auto mr-2 h-10 w-28" />
        <Skeleton id="sort-items" className="mb-4 h-10 w-32" />
      </div>
      <Separator className="mb-4" />
      <LoadingPostCard qtyCards={4} />;
    </>
  );
}

export default loading;
