"use client";

import Link from "next/link";

//Error component shown when the repos fetch fails - automatically picked up by next.js
export default function Error() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex flex-col items-center justify-center gap-6 px-8 text-center">
      <p className="text-[#9da5b4] text-base">
        The GitHub repos you are looking for can not currently be found. Please try again later
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-md bg-[#2d2d2d] border border-[#3d4451] text-sm text-white hover:border-[#4fc3f7] transition-colors duration-200"
      >
        Back to home
      </Link>
    </div>
  );
}
