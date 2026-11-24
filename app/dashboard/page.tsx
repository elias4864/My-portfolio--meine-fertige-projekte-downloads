'use client';

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Loader2,
  Download,
  Tag,
  ExternalLink,
  Trophy,
  Award,
  Flame,
  GitCommit,
  Star,
  Code2,
  Package,
  Users,
  CheckCircle2,
  Lock,
  FileText,
  Layers,
  Calendar,
  Zap,
  GitPullRequest,
  Sparkles,
  GitFork,
  FolderGit2,
  Search,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const GITHUB_USERNAME = "elias4864";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

function getGitHubHeaders(): HeadersInit {
  return GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};
}

interface Repo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork?: boolean;
  topics?: string[];
}

interface Commit {
  message: string;
  url: string;
  date: string;
  repo: string;
}

interface LanguageData {
  name: string;
  value: number;
  percentage: number;
  [key: string]: string | number;
}

interface ReleaseAsset {
  id: number;
  name: string;
  browser_download_url: string;
  size: number;
}

interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  html_url: string;
  published_at: string;
  body: string;
  zipball_url: string;
  assets: ReleaseAsset[];
}

interface AchievementItem {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  progressText: string;
  tier: "Gold" | "Silver" | "Bronze";
  category: "GitHub Profile" | "Repo Activity";
  icon: React.ReactNode;
  badgeStyle?: string;
}

// ================================================
// ALL REPOSITORIES SECTION SUB-COMPONENT
// ================================================
function AllRepositoriesSection({ repos }: { repos: Repo[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("ALL");
  const [hideForks, setHideForks] = useState(false);

  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return ["ALL", ...Array.from(set).sort()];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return [...repos]
        .filter((repo) => {
          if (hideForks && repo.fork) return false;
          if (selectedLanguage !== "ALL" && repo.language !== selectedLanguage) return false;
          if (!q) return true;
          const haystack = `${repo.name} ${repo.description ?? ""} ${repo.language ?? ""} ${(repo.topics ?? []).join(" ")}`.toLowerCase();
          return haystack.includes(q);
        })
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  }, [repos, searchQuery, selectedLanguage, hideForks]);

  return (
      <div className="my-6 bg-base-100 p-5 rounded-lg border border-base-300 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-primary" />
            Alle Repositories ({filteredRepos.length} / {repos.length})
          </h3>

          <label className="inline-flex items-center gap-2 text-xs text-base-content/80 cursor-pointer select-none">
            <input
                type="checkbox"
                checked={hideForks}
                onChange={(e) => setHideForks(e.target.checked)}
                className="checkbox checkbox-xs checkbox-primary"
            />
            Forks ausblenden
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-base-content/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Repo, Beschreibung oder Topic suchen..."
                className="w-full pl-9 pr-3 py-1.5 text-sm rounded-md bg-base-200 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-md bg-base-200 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang === "ALL" ? "Alle Sprachen" : lang}
                </option>
            ))}
          </select>
        </div>

        {filteredRepos.length === 0 ? (
            <p className="text-sm text-base-content/60 py-6 text-center">
              Keine passenden Repositories gefunden.
            </p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-1">
              {filteredRepos.map((repo) => (
                  <a
                      key={repo.name}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-lg bg-base-200/60 hover:bg-base-200 border border-base-300 transition flex flex-col justify-between gap-2 group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-sm text-primary group-hover:underline break-all">
                    {repo.name}
                  </span>
                        <ArrowUpRight className="w-4 h-4 shrink-0 text-base-content/60 group-hover:text-primary" />
                      </div>

                      {repo.description && (
                          <p className="text-xs text-base-content/75 mt-1 line-clamp-2">
                            {repo.description}
                          </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-base-content/65 pt-2 border-t border-base-300/60">
                      <div className="flex items-center gap-2">
                        {repo.language && (
                            <span className="px-2 py-0.5 rounded-full bg-base-100 border border-base-300 text-[11px]">
                      {repo.language}
                    </span>
                        )}
                        {repo.fork && (
                            <span className="px-2 py-0.5 rounded-full bg-base-100 border border-base-300 text-[11px]">
                      Fork
                    </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400" />
                    {repo.stargazers_count}
                  </span>
                        <span className="inline-flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5 text-base-content/60" />
                          {repo.forks_count}
                  </span>
                        <span>{new Date(repo.updated_at).toLocaleDateString("de-CH")}</span>
                      </div>
                    </div>
                  </a>
              ))}
            </div>
        )}
      </div>
  );
}

// ================================================
// RELEASES SECTION SUB-COMPONENT (mit allen Repos)
// ================================================
function ReleasesSection({ repos }: { repos: Repo[] }) {
  const [selectedRepo, setSelectedRepo] = useState<string>("elias-portfolio");
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (repos.length > 0 && !repos.some((r) => r.name === selectedRepo)) {
      const preferred = repos.find((r) => r.name === "elias-portfolio") ?? repos[0];
      setSelectedRepo(preferred.name);
    }
  }, [repos, selectedRepo]);

  useEffect(() => {
    if (!selectedRepo) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadReleases() {
      try {
        setLoading(true);
        const res = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${selectedRepo}/releases`,
            { headers: getGitHubHeaders(), signal: controller.signal }
        );
        if (!res.ok) {
          setReleases([]);
          return;
        }
        const data: GitHubRelease[] = await res.json();
        setReleases(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error(err);
          setReleases([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadReleases();
    return () => controller.abort();
  }, [selectedRepo]);

  return (
      <div className="space-y-4 my-6 bg-base-100 p-5 rounded-lg border border-base-300 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="text-xl font-semibold">Releases &amp; Downloads</h3>

          <select
              value={selectedRepo}
              onChange={(e) => setSelectedRepo(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-md bg-base-200 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {repos.map((r) => (
                <option key={r.name} value={r.name}>
                  {r.name}
                </option>
            ))}
          </select>
        </div>

        {loading ? (
            <div className="flex items-center gap-2 text-sm text-base-content/70 py-6 justify-center">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span>Lade Releases für {selectedRepo}...</span>
            </div>
        ) : releases.length === 0 ? (
            <p className="text-sm text-base-content/60 py-4 text-center">
              Keine Releases für &quot;{selectedRepo}&quot; vorhanden.
            </p>
        ) : (
            <div className="space-y-4 mt-4">
              {releases.map((release, index) => (
                  <div
                      key={release.id}
                      className="bg-base-200/50 p-4 rounded-lg border border-base-300"
                  >
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-primary" />
                        <span className="font-bold text-lg">
                    {release.name || release.tag_name}
                  </span>
                        {index === 0 && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      Latest
                    </span>
                        )}
                      </div>

                      <span className="text-xs text-base-content/60">
                  {new Date(release.published_at).toLocaleDateString("de-CH")}
                </span>
                    </div>

                    {release.body && (
                        <p className="text-sm text-base-content/80 whitespace-pre-line mb-4">
                          {release.body}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-3">
                      {release.assets.map((asset) => (
                          <a
                              key={asset.id}
                              href={asset.browser_download_url}
                              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-content hover:opacity-90 transition"
                          >
                            <Download className="w-3.5 h-3.5" />
                            {asset.name} ({(asset.size / (1024 * 1024)).toFixed(1)} MB)
                          </a>
                      ))}

                      <a
                          href={release.zipball_url}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md bg-base-200 hover:bg-base-300 transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Source Code (.zip)
                      </a>

                      <a
                          href={release.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-base-300 hover:bg-base-200 transition"
                      >
                        GitHub <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
}

// ================================================
// ACHIEVEMENTS & BADGES SUB-COMPONENT
// ================================================
function AchievementsBadgesSection({
                                     username,
                                     allRepos,
                                     languagesData,
                                     recentCommitsCount,
                                     releasesCount,
                                     accountCreatedAt,
                                     stats,
                                   }: {
  username: string;
  allRepos: Repo[];
  languagesData: LanguageData[];
  recentCommitsCount: number;
  releasesCount: number;
  accountCreatedAt: string | null;
  stats: { repos: number; stars: number; forks: number; followers: number };
}) {
  const [trophyError, setTrophyError] = useState(false);
  const [streakError, setStreakError] = useState(false);
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");

  const originalRepos = allRepos.filter((r) => !r.fork);
  const originalReposCount = originalRepos.length;

  const documentedReposCount = originalRepos.filter(
      (r) => r.description && r.description.trim().length > 0
  ).length;

  const devopsOrFullstackCount = originalRepos.filter((r) => {
    const text = `${r.name} ${r.description ?? ""} ${r.language ?? ""} ${(r.topics ?? []).join(" ")}`.toLowerCase();
    return ["docker", "kubernetes", "helm", "ci", "cd", "pipeline", "api", "react", "next", "spring", "fastapi"].some(
        (kw) => text.includes(kw)
    );
  }).length;

  const accountAgeYears = accountCreatedAt
      ? Math.max(
          0,
          Math.floor(
              (Date.now() - new Date(accountCreatedAt).getTime()) /
              (1000 * 60 * 60 * 24 * 365.25)
          )
      )
      : 0;

  const achievements: AchievementItem[] = [
    {
      id: "quickdraw",
      title: "Quickdraw",
      description: "Offizielles GitHub-Achievement für das schnelle Schliessen eines Issues oder einer Pull Request nach dem Erstellen.",
      unlocked: true,
      progressText: "Profil-Achievement",
      tier: "Gold",
      category: "GitHub Profile",
      icon: <Zap className="w-4 h-4 text-amber-300" />,
      badgeStyle: "bg-gradient-to-br from-amber-300/30 to-yellow-500/20 border-amber-400/50",
    },
    {
      id: "pull-shark",
      title: "Pull Shark",
      description: "Offizielles GitHub-Achievement für gemergte Pull Requests in Repositories.",
      unlocked: false,
      progressText: "Auf GitHub-Profil prüfen",
      tier: "Silver",
      category: "GitHub Profile",
      icon: <GitPullRequest className="w-4 h-4 text-sky-300" />,
    },
    {
      id: "galaxy-brain",
      title: "Galaxy Brain",
      description: "Offizielles GitHub-Achievement für akzeptierte Antworten in GitHub Discussions.",
      unlocked: false,
      progressText: "Auf GitHub-Profil prüfen",
      tier: "Silver",
      category: "GitHub Profile",
      icon: <Sparkles className="w-4 h-4 text-purple-300" />,
    },
    {
      id: "polyglot",
      title: "Polyglot Developer",
      description: "Verwendet mindestens 4 verschiedene Programmiersprachen über öffentliche Repositories.",
      unlocked: languagesData.length >= 4,
      progressText: `${languagesData.length} / 4 Sprachen`,
      tier: "Gold",
      category: "Repo Activity",
      icon: <Code2 className="w-4 h-4 text-purple-400" />,
    },
    {
      id: "builder",
      title: "Project Builder",
      description: "Veröffentlicht mindestens 10 eigene Repositories (ohne Forks).",
      unlocked: originalReposCount >= 10,
      progressText: `${originalReposCount} / 10 Eigene Repos`,
      tier: "Gold",
      category: "Repo Activity",
      icon: <Package className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: "shipper",
      title: "Release Shipper",
      description: "Veröffentlicht mindestens einen Release / Tag auf GitHub.",
      unlocked: releasesCount >= 1,
      progressText: releasesCount >= 1 ? `${releasesCount} Release(s)` : "0 / 1 Release",
      tier: "Silver",
      category: "Repo Activity",
      icon: <Award className="w-4 h-4 text-amber-400" />,
    },
    {
      id: "committer",
      title: "Active Committer",
      description: "Aktuelle Commit-Aktivität über alle Repositories.",
      unlocked: recentCommitsCount >= 3,
      progressText: `${recentCommitsCount} / 3 Repos mit Commits`,
      tier: "Silver",
      category: "Repo Activity",
      icon: <GitCommit className="w-4 h-4 text-sky-400" />,
    },
    {
      id: "documenter",
      title: "Clean Documenter",
      description: "Versieht mindestens 5 eigene Repositories mit einer Beschreibung.",
      unlocked: documentedReposCount >= 5,
      progressText: `${documentedReposCount} / 5 Beschrieben`,
      tier: "Silver",
      category: "Repo Activity",
      icon: <FileText className="w-4 h-4 text-cyan-400" />,
    },
    {
      id: "stackcrafter",
      title: "Full-Stack & DevOps Crafter",
      description: "Arbeitet an Web-, API-, Container- oder CI/CD-Projekten auf GitHub.",
      unlocked: devopsOrFullstackCount >= 3,
      progressText: `${devopsOrFullstackCount} / 3 Stack-Projekte`,
      tier: "Silver",
      category: "Repo Activity",
      icon: <Layers className="w-4 h-4 text-indigo-400" />,
    },
    {
      id: "starmaker",
      title: "Star Collector",
      description: "Sammelt Sterne für öffentliche Projekte auf GitHub.",
      unlocked: stats.stars >= 1,
      progressText: `${stats.stars} Star${stats.stars === 1 ? "" : "s"}`,
      tier: "Bronze",
      category: "Repo Activity",
      icon: <Star className="w-4 h-4 text-yellow-400" />,
    },
    {
      id: "community",
      title: "Open-Source Networker",
      description: "Baut Netzwerk mit Followern oder Forks rund um eigene Projekte auf.",
      unlocked: stats.followers >= 1 || stats.forks >= 1,
      progressText: `${stats.followers} Follower · ${stats.forks} Forks`,
      tier: "Bronze",
      category: "Repo Activity",
      icon: <Users className="w-4 h-4 text-pink-400" />,
    },
    {
      id: "veteran",
      title: "GitHub Builder (1+ Jahr)",
      description: "Ist seit mindestens einem Jahr mit einem GitHub-Profil aktiv.",
      unlocked: accountAgeYears >= 1,
      progressText: `${accountAgeYears} Jahr${accountAgeYears === 1 ? "" : "e"} aktiv`,
      tier: "Bronze",
      category: "Repo Activity",
      icon: <Calendar className="w-4 h-4 text-teal-400" />,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const filteredAchievements = achievements.filter((a) => {
    if (filter === "unlocked") return a.unlocked;
    if (filter === "locked") return !a.unlocked;
    return true;
  });

  const tierStyles: Record<AchievementItem["tier"], string> = {
    Gold: "border-amber-400/40 bg-amber-400/10 text-amber-300",
    Silver: "border-slate-300/40 bg-slate-300/10 text-slate-200",
    Bronze: "border-orange-400/40 bg-orange-400/10 text-orange-300",
  };

  return (
      <div className="my-6">
        <div className="flex flex-wrap items-center justify-between gap-2 my-3">
          <h3 className="text-xl flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            GitHub Achievements &amp; Badges
          </h3>
          <span className="text-xs px-2.5 py-1 rounded-full bg-base-100 border border-base-300 text-base-content/80">
          {unlockedCount} / {achievements.length} aktiv
        </span>
        </div>

        <div className="bg-base-100 p-5 rounded-lg shadow-sm space-y-5 border border-base-300/60">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {(
                  [
                    { key: "all", label: `Alle (${achievements.length})` },
                    { key: "unlocked", label: `Freigeschaltet (${unlockedCount})` },
                    { key: "locked", label: `Offen (${achievements.length - unlockedCount})` },
                  ] as const
              ).map((tab) => (
                  <button
                      key={tab.key}
                      type="button"
                      onClick={() => setFilter(tab.key)}
                      className={`px-3 py-1 rounded-md text-xs font-medium border transition ${
                          filter === tab.key
                              ? "bg-primary text-primary-content border-primary"
                              : "bg-base-200/60 text-base-content/75 border-base-300 hover:bg-base-200"
                      }`}
                  >
                    {tab.label}
                  </button>
              ))}
            </div>

            <a
                href={`https://github.com/${username}?tab=achievements`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Alle GitHub Achievements ansehen <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredAchievements.map((badge) => (
                <div
                    key={badge.id}
                    className={`p-3.5 rounded-lg border transition-all flex flex-col justify-between gap-2 ${
                        badge.unlocked
                            ? badge.badgeStyle ?? "bg-base-200/70 border-base-300"
                            : "bg-base-200/30 border-base-300/50 opacity-75"
                    }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-md bg-base-100 border border-base-300">
                        {badge.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-sm leading-tight">
                          {badge.title}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                      <span
                          className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full border ${tierStyles[badge.tier]}`}
                      >
                        {badge.tier}
                      </span>
                          <span className="text-[10px] text-base-content/50">
                        {badge.category}
                      </span>
                        </div>
                      </div>
                    </div>

                    {badge.unlocked ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                  </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-base-content/50 shrink-0">
                    <Lock className="w-3.5 h-3.5" /> Locked
                  </span>
                    )}
                  </div>

                  <p className="text-xs text-base-content/75 leading-relaxed">
                    {badge.description}
                  </p>

                  <div className="text-[11px] font-medium text-base-content/60 pt-1 border-t border-base-300/50 flex justify-between items-center">
                    <span>Status</span>
                    <span>{badge.progressText}</span>
                  </div>
                </div>
            ))}
          </div>

          {(!trophyError || !streakError) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-base-300/60">
                {!trophyError && (
                    <div className="bg-base-200/50 p-4 rounded-lg border border-base-300 flex flex-col items-center justify-center overflow-hidden">
                <span className="text-xs font-semibold text-base-content/70 mb-2 flex items-center gap-1">
                  <Award className="w-4 h-4 text-secondary" /> GitHub Trophies
                </span>
                      <a
                          href={`https://github.com/${username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex justify-center overflow-x-auto py-1"
                      >
                        <img
                            src={`https://github-profile-trophy.vercel.app/?username=${username}&theme=tokyonight&no-bg=true&margin-w=4&margin-h=4`}
                            alt={`${username}'s GitHub Trophies`}
                            className="max-w-full h-auto object-contain rounded-md"
                            loading="lazy"
                            onError={() => setTrophyError(true)}
                        />
                      </a>
                    </div>
                )}

                {!streakError && (
                    <div className="bg-base-200/50 p-4 rounded-lg border border-base-300 flex flex-col items-center justify-center overflow-hidden">
                <span className="text-xs font-semibold text-base-content/70 mb-2 flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-400" /> Contribution Streak
                </span>
                      <a
                          href={`https://github.com/${username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex justify-center overflow-x-auto py-1"
                      >
                        <img
                            src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=tokyonight&hide_border=true&background=1a1b26`}
                            alt="GitHub Streak Stats"
                            className="max-w-full h-auto object-contain rounded-md"
                            loading="lazy"
                            onError={() => setStreakError(true)}
                        />
                      </a>
                    </div>
                )}
              </div>
          )}
        </div>
      </div>
  );
}

// ================================================
// MAIN DASHBOARD PAGE
// ================================================
export default function DashboardPage() {
  const [allRepos, setAllRepos] = useState<Repo[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [releasesCount, setReleasesCount] = useState<number>(0);
  const [accountCreatedAt, setAccountCreatedAt] = useState<string | null>(null);
  const [stats, setStats] = useState({
    repos: 0,
    stars: 0,
    forks: 0,
    followers: 0,
  });
  const [languagesData, setLanguagesData] = useState<LanguageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGitHubData() {
      try {
        setLoading(true);
        const headers = getGitHubHeaders();

        const [profileRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            headers,
            signal: controller.signal,
          }),
          fetch(
              `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
              { headers, signal: controller.signal }
          ),
        ]);

        if (!profileRes.ok) throw new Error("Failed to fetch profile");
        if (!repoRes.ok) throw new Error("Failed to fetch repos");

        const profile = await profileRes.json();
        const repoData: Repo[] = await repoRes.json();

        const totalStars = repoData.reduce((acc, r) => acc + r.stargazers_count, 0);
        const totalForks = repoData.reduce((acc, r) => acc + r.forks_count, 0);

        const sortedRepos = [...repoData].sort(
            (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );

        const commitPromises = sortedRepos.map(async (repo) => {
          try {
            const res = await fetch(
                `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=1`,
                { headers, signal: controller.signal }
            );
            if (!res.ok) return null;
            const data = await res.json();
            if (!Array.isArray(data) || data.length === 0) return null;

            const c = data[0];
            return {
              message: c.commit.message,
              url: c.html_url,
              date: c.commit.author.date,
              repo: repo.name,
            } as Commit;
          } catch {
            return null;
          }
        });

        const commitResults = (await Promise.all(commitPromises)).filter(
            (c): c is Commit => c !== null
        );

        const releaseChecks = await Promise.all(
            sortedRepos.map(async (repo) => {
              try {
                const rRes = await fetch(
                    `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/releases?per_page=20`,
                    { headers, signal: controller.signal }
                );
                if (!rRes.ok) return 0;
                const rData = await rRes.json();
                return Array.isArray(rData) ? rData.length : 0;
              } catch {
                return 0;
              }
            })
        );
        const totalDetectedReleases = releaseChecks.reduce((sum, n) => sum + n, 0);

        const langMap: Record<string, number> = {};
        let totalLangRepos = 0;

        repoData.forEach((r) => {
          if (r.language) {
            langMap[r.language] = (langMap[r.language] || 0) + 1;
            totalLangRepos++;
          }
        });

        const langArr: LanguageData[] = Object.entries(langMap)
            .map(([name, value]) => ({
              name,
              value,
              percentage: totalLangRepos > 0 ? Math.round((value / totalLangRepos) * 1000) / 10 : 0,
            }))
            .sort((a, b) => b.value - a.value);

        setAccountCreatedAt(profile.created_at ?? null);
        setStats({
          repos: profile.public_repos ?? repoData.length,
          stars: totalStars,
          forks: totalForks,
          followers: profile.followers ?? 0,
        });
        setAllRepos(sortedRepos);
        setCommits(commitResults);
        setReleasesCount(totalDetectedReleases);
        setLanguagesData(langArr);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchGitHubData();
    return () => controller.abort();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF4560", "#FF9F40"];

  if (loading) {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-base-content font-geist max-w-3xl mx-auto pt-1"
        >
          <div className="w-full max-w-3xl mx-auto min-h-[60vh] rounded-lg p-8 bg-base-200 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-base-content/70 text-sm">Loading GitHub Dashboard...</p>
          </div>
        </motion.section>
    );
  }

  return (
      <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-base-content font-geist max-w-3xl mx-auto pt-1"
      >
        <div className="w-full max-w-3xl mx-auto min-h-screen rounded-lg p-4 bg-base-200 backdrop-blur-sm hover:shadow-primary/10 transition-shadow duration-300">
          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="my-4 text-start"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Github-Dashboard
            </h2>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Github Repos", value: stats.repos },
              { label: "Github Stars", value: stats.stars },
              { label: "Github Forks", value: stats.forks },
              { label: "Github Followers", value: stats.followers },
            ].map((item) => (
                <div
                    key={item.label}
                    className="bg-base-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <p className="text-sm text-base-content/70 mb-2 text-center">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold text-center">{item.value}</p>
                </div>
            ))}
          </div>

          {/* All Repositories */}
          <AllRepositoriesSection repos={allRepos} />

          {/* Achievements & Badges Section */}
          <AchievementsBadgesSection
              username={GITHUB_USERNAME}
              allRepos={allRepos}
              languagesData={languagesData}
              recentCommitsCount={commits.length}
              releasesCount={releasesCount}
              accountCreatedAt={accountCreatedAt}
              stats={stats}
          />

          {/* Contribution Graph */}
          <div>
            <h3 className="text-xl my-3">Consistency &amp; Open-Source Activity</h3>
            <div className="bg-base-100 p-4 rounded-lg shadow-sm overflow-x-auto">
              <img
                  src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
                  alt="GitHub Contribution Graph"
                  className="w-full min-w-[500px] h-auto rounded-lg"
                  loading="lazy"
              />
            </div>
          </div>

          {/* Language PieChart */}
          {languagesData.length > 0 && (
              <div className="pb-6 w-full rounded-lg my-6">
                <h3 className="text-xl my-3 text-start">Language Usage</h3>

                <div className="w-full h-80 bg-base-100 rounded-lg p-4 shadow-sm mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                          data={languagesData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          label
                      >
                        {languagesData.map((entry, index) => (
                            <Cell
                                key={`cell-${entry.name}-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {languagesData.map((lang, idx) => (
                      <div
                          key={lang.name}
                          className="flex items-center justify-between px-3 py-2 rounded-md bg-base-100 border border-base-300 text-xs"
                      >
                  <span className="inline-flex items-center gap-2 font-medium">
                    <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    {lang.name}
                  </span>
                        <span className="text-base-content/70">
                    {lang.value} ({lang.percentage}%)
                  </span>
                      </div>
                  ))}
                </div>
              </div>
          )}

          {/* Recent Commits */}
          {commits.length > 0 && (
              <div className="my-6 bg-base-100 p-5 rounded-lg border border-base-300 shadow-sm space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <GitCommit className="w-5 h-5 text-primary" />
                  Letzte Commits ({commits.slice(0, 10).length})
                </h3>
                <div className="space-y-2">
                  {commits.slice(0, 10).map((c, idx) => (
                      <a
                          key={`${c.repo}-${c.date}-${idx}`}
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-3 p-3 rounded-lg bg-base-200/60 hover:bg-base-200 border border-base-300 text-sm transition"
                      >
                        <div className="min-w-0">
                          <p className="font-medium truncate">{c.message}</p>
                          <p className="text-xs text-base-content/60">{c.repo}</p>
                        </div>
                        <span className="text-xs text-base-content/60 shrink-0">
                    {new Date(c.date).toLocaleDateString("de-CH")}
                  </span>
                      </a>
                  ))}
                </div>
              </div>
          )}

          {/* Releases Section */}
          <ReleasesSection repos={allRepos} />
        </div>
      </motion.section>
  );
}