import LoadingPostCard from "@/components/LoadingPostCard";
import { Skeleton } from "@/components/ui/Skeleton";

function loading() {
  return (
    <>
      <Skeleton id="total-items" className="mb-4 h-4 w-32" />
      <LoadingPostCard qtyCards={4} />;
    </>
  );
}

export default loading;
