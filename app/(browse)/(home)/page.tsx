import { Suspense } from "react";
import { Result, ResultSkeleton } from "../_components/result";

export default async function Page() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultSkeleton />}>
        <Result />
      </Suspense>
    </div>
  );
}
