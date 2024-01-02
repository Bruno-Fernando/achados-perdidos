import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";

function loading() {
  return (
    <div>
      <Skeleton className="mb-4 h-5 w-2/3 text-xl" />

      <Skeleton className="mb-4 h-72 w-full" />

      <Separator className="mb-2" />

      <Skeleton className="mb-1 h-4" />
      <Skeleton className="mb-1 h-4 w-1/3" />
      <Skeleton className="h-4 w-3/4" />

      <Separator className="my-8" />

      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

export default loading;
