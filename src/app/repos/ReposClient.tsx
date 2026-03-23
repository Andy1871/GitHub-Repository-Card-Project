"use client";

// Client component — owns the search input state and the Suspense boundary.
import { use, useState, Suspense } from "react";
import Link from "next/link";
import GitHubRepoCard from "@/components/GitHubRepoCard";
import { GitHubRepo } from "@/lib/github";

// Component that suspends while the repos Promise is pending.
// Once resolved, it filters the results against the current search query.
function RepoCards({
  reposPromise,
  query,
}: {
  reposPromise: Promise<GitHubRepo[]>;
  query: string;
}) {
  // use(reposPromise) unwraps the Promise — this suspends until the fetch resolves
  const repos = use(reposPromise);

  if (repos.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-[#6b7280] text-sm italic">No projects found for this user.</p>
        <Link
          href="/"
          className="w-fit px-4 py-2 rounded-md bg-[#2d2d2d] border border-[#3d4451] text-sm text-white hover:border-[#4fc3f7] transition-colors duration-200"
        >
          Back to home
        </Link>
      </div>
    );
  }

  // Filter against repo name, description, and primary language simultaneously
  const filtered = repos.filter((repo) => {
    const term = query.toLowerCase();
    return (
      repo.name.toLowerCase().includes(term) ||
      (repo.description ?? "").toLowerCase().includes(term) ||
      (repo.language ?? "").toLowerCase().includes(term)
    );
  });

  if (filtered.length === 0) {
    return <p className="text-[#6b7280] text-sm italic">No projects match your search.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((repo) => (
        <GitHubRepoCard
          key={repo.id}
          name={repo.name}
          description={repo.description ?? undefined}
          language={repo.language ?? undefined}
          stars={repo.stargazers_count}
        />
      ))}
    </div>
  );
}

// Shown inside the cards area while the repos fetch is in-flight
function CardsSpinner() {
  return (
    <div className="flex justify-center py-12">
      <div className="w-8 h-8 border-4 border-[#3d4451] border-t-[#4fc3f7] rounded-full animate-spin" />
    </div>
  );
}

export default function ReposClient({
  reposPromise,
}: {
  reposPromise: Promise<GitHubRepo[]>;
}) {
  const [query, setQuery] = useState("");

  return (
    <div className="px-8 pb-12 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-left">Projects</h2>

      {/* Search input — filters cards client-side once repos have loaded */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, description or language…"
        className="w-full md:w-1/2 mb-6 px-4 py-2 rounded-md bg-[#2d2d2d] border border-[#3d4451] text-white placeholder-[#6b7280] focus:outline-none focus:border-[#4fc3f7] text-sm"
      />

      {/* Suspense boundary: shows spinner until RepoCards resolves the Promise */}
      <Suspense fallback={<CardsSpinner />}>
        <RepoCards reposPromise={reposPromise} query={query} />
      </Suspense>
    </div>
  );
}
