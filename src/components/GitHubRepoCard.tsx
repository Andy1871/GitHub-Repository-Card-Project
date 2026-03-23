import { Star } from "lucide-react";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Ruby: "#701516",
  "C++": "#f34b7d",
  C: "#555555",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
};

interface GitHubRepoCardProps {
  name: string;
  description?: string;
  language?: string;
  stars: number;
}

// Displays a single repository as a card.
// Layout: name + description at the top, language dot and star count pinned to the bottom.
export default function GitHubRepoCard({
  name,
  description,
  language,
  stars,
}: GitHubRepoCardProps) {
  // Fall back to a neutral grey if the language isn't in the map
  const langColor = language ? (languageColors[language] ?? "#8b949e") : "#8b949e";

  return (
    <div className="flex flex-col justify-between rounded-lg border border-[#3d4451] bg-[#252526] p-5 shadow-md hover:border-[#6e7681] hover:shadow-lg transition-all duration-200 min-h-[160px]">
      {/* Top: repo name and description */}
      <div>
        <h3 className="text-[#4fc3f7] font-semibold text-base mb-2 truncate">{name}</h3>
        {description ? (
          <p className="text-[#9da5b4] text-sm leading-relaxed">{description}</p>
        ) : (
          // Shown when the GitHub API returns null for description
          <p className="text-[#6b7280] text-sm italic">This project currently has no description</p>
        )}
      </div>

      {/* Bottom: primary language (left) and star count (right) */}
      <div className="flex items-center justify-between mt-4">
        {language ? (
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: langColor }}
            />
            <span className="text-[#9da5b4] text-xs">{language}</span>
          </div>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-[#9da5b4] text-xs">{stars.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
