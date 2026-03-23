// Server component — kicks off the GitHub fetch and renders the hero section immediately.
// The fetch Promise is passed down (not awaited) so the hero renders without waiting for data.
import Link from "next/link";
import { House } from "lucide-react";
import { getRepos } from "@/lib/github";
import ReposClient from "./ReposClient";

export default function ReposPage() {
  // Start the fetch — do NOT await here so the page shell renders straight away
  const reposPromise = getRepos();

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      {/* Hero — visible immediately, before repos have loaded */}
      <div className="px-8 pt-12 pb-6 max-w-6xl mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Andy1871</h1>
            <p className="text-[#9da5b4] mt-2 text-base">
              Junior Frontend Developer · Portfolio
            </p>
          </div>
          {/* Home button — aligned to the right edge of the content area */}
          <Link
            href="/"
            className="p-2 rounded-md bg-[#2d2d2d] border border-[#3d4451] text-white hover:border-[#4fc3f7] transition-colors duration-200"
            aria-label="Home"
          >
            <House className="w-4 h-4" />
          </Link>
        </div>
        <hr className="mt-4 w-24 border-[#3d4451]" />
      </div>

      {/* Client component handles search state and Suspense boundary for the cards */}
      <ReposClient reposPromise={reposPromise} />
    </div>
  );
}
