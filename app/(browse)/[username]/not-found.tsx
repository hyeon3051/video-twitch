import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="h-full flex flex-col spac-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p>we couldn't find the page you were looking for</p>
      <Button variant="primary" asChild>
        <Link href="/">Go to home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
