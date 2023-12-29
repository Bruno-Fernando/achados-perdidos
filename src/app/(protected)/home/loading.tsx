import { Skeleton } from "@/components/ui/Skeleton";

function loading() {
  return (
    <div className="flex flex-col gap-4">
      {Array.apply(null, Array(3)).map((_, index) => (
        <div
          className="rounded-lg border border-l-8 border-l-slate-600"
          key={index}
        >
          <Skeleton className="h-[300px] w-full rounded-lg" />

          <Skeleton className="ml-auto mr-3 mt-1 h-4 w-24" />

          <div className="space-y-2 px-3 pb-3">
            <Skeleton className="h-5 w-56" />

            <Skeleton className="h-4 w-72" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default loading;
