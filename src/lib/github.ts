// Type representing the fields we use from the GitHub REST API repo response
export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
}

// Fetches all public repos for the given GitHub user.
// Results are cached and revalidated once per hour via Next.js fetch caching.
export async function getRepos(): Promise<GitHubRepo[]> {
  // Simulated network delay — remove in production
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetch("https://api.github.com/users/Andy1871/repos", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch repos: ${res.status}`);
  }

  return res.json();
}
