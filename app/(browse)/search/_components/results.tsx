"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { getSearchResults } from "@/lib/search-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
interface ResultsProps {
  term: string;
}

export const Results = async ({ term }: ResultsProps) => {
  const streams = await getSearchResults(term);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Results for term &quot;{term}&quot;
      </h2>
      {streams.length == 0 && (
        <div className="text-muted-foreground text-sm">No streams found</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        {streams.map((stream) => (
          <ResultCard key={stream.id} streamUser={stream} />
        ))}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <Skeleton className="h-6 w-24 mb-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <ResultCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
