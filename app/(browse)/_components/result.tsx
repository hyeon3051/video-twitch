import { getStreams } from "@/lib/feed-service";
import { ResultCard, ResultCardSkeleton } from "./resultCard";
import { Skeleton } from "@/components/ui/skeleton";

export const Result = async () => {
  const streams = await getStreams();

  return (
    <div>
      <h2 className="tex-lg font-semibold mb-4">
        Streams we think you'll like
      </h2>
      {streams?.length == 0 && (
        <div className="text-muted-foreground text-sm">No streams found</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {streams.map((stream) => (
          <ResultCard key={stream.user.id} stream={stream} />
        ))}
      </div>
    </div>
  );
};

export const ResultSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-4 w-24" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <ResultCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
