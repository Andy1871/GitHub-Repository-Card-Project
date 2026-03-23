// Homepage — entry point of the portfolio. Links through to the repos page.
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1e1e1e] text-white px-8 pt-12">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Developer Portfolio</h1>
      <Link
        href="/repos"
        className="inline-block px-4 py-2 rounded-md bg-[#2d2d2d] border border-[#3d4451] text-sm text-white hover:border-[#4fc3f7] transition-colors duration-200"
      >
        Go to Repos
      </Link>
    </main>
  );
}
