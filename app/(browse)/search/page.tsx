import { redirect } from "next/navigation";
import { Results, ResultsSkeleton } from "./_components/results";
import { Suspense } from "react";

interface PageProps {
  params: {
    term: string;
  };
}

const SearchPage = ({ params }: PageProps) => {
  if (!params.term) {
    redirect("/");
  }
  const term = params.term;
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={term} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
