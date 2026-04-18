import { Suspense } from "react";
import SearchContent from "@/components/search-content";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Suspense
          fallback={<div className="text-center py-12">Loading search...</div>}
        >
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
