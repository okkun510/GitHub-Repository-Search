// GitHub言語カラー（主要30言語）
// 参照: https://github.com/ozh/github-colors
// Tailwindの近似色で表現

export const languageColors: Record<string, string> = {
  JavaScript: "bg-yellow-300",
  TypeScript: "bg-blue-600",
  Python: "bg-blue-700",
  Java: "bg-orange-700",
  C: "bg-gray-500",
  "C++": "bg-pink-500",
  "C#": "bg-green-700",
  Go: "bg-cyan-500",
  Rust: "bg-orange-400",
  Ruby: "bg-red-800",
  PHP: "bg-indigo-500",
  Swift: "bg-orange-500",
  Kotlin: "bg-purple-400",
  Scala: "bg-red-600",
  Dart: "bg-teal-500",
  Shell: "bg-green-400",
  HTML: "bg-orange-600",
  CSS: "bg-purple-700",
  SCSS: "bg-pink-400",
  Vue: "bg-emerald-500",
  "Objective-C": "bg-blue-500",
  R: "bg-blue-500",
  Lua: "bg-blue-900",
  Perl: "bg-cyan-600",
  Haskell: "bg-purple-600",
  Elixir: "bg-purple-700",
  Clojure: "bg-red-400",
  Erlang: "bg-pink-600",
  Julia: "bg-purple-500",
  PowerShell: "bg-blue-950",
};

export const getLanguageColor = (language: string | null): string => {
  if (!language) return "bg-gray-400";
  return languageColors[language] ?? "bg-gray-400";
};
