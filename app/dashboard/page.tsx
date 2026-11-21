'use client';

import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
  icon: React.ReactNode;
  badgeStyle?: string;
}

// ================================================
// RELEASES SECTION SUB-COMPONENT (mit Repo-Auswahl)
// ================================================
function ReleasesSection({ repos }: { repos: Repo[] }) {
  const USERNAME = "elias4864";
  const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

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
    const headers: HeadersInit = TOKEN
        ? { Authorization: `token ${TOKEN}` }
        : {};

    async function loadReleases() {
      if (!selectedRepo) return;
      try {
        setLoading(true);
        const res = await fetch(
            `https://api.github.com/repos/${USERNAME}/${selectedRepo}/releases`,
            { headers }
        );
        if (!res.ok) {
          setReleases([]);
          return;
        }
        const data: GitHubRelease[] = await res.json();
        setReleases(data);
      } catch (err) {
        console.error(err);
        setReleases([]);
      } finally {
        setLoading(false);
      }
    }

    loadReleases();
  }, [selectedRepo, TOKEN]);

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
    return ["docker", "kubernetes", "helm", "ci", "cd", "pipeline", "api", "react", "next", "spring"].some(
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
      description: "Offizielles GitHub-Profil-Achievement für das schnelle Schliessen eines Issues oder einer Pull Request kurz nach dem Öffnen[cite: 1].",
      unlocked: true,
      progressText: "Auf GitHub-Profil sichtbar",
      tier: "Gold",
      icon: <Zap className="w-4 h-4 text-amber-300" />,
      badgeStyle: "bg-gradient-to-br from-amber-300/30 to-yellow-500/20 border-amber-400/50",
    },
    {
      id: "polyglot",
      title: "Polyglot Developer",
      description: "Verwendet mindestens 4 verschiedene Programmiersprachen über Repositories hinweg.",
      unlocked: languagesData.length >= 4,
      progressText: `${languagesData.length} / 4 Sprachen`,
      tier: "Gold",
      icon: <Code2 className="w-4 h-4 text-purple-400" />,
    },
    {
      id: "builder",
      title: "Project Builder",
      description: "Baut und veröffentlicht mindestens 10 eigene Repositories.",
      unlocked: originalReposCount >= 10,
      progressText: `${originalReposCount} / 10 Eigene Repos`,
      tier: "Gold",
      icon: <Package className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: "shipper",
      title: "Release Shipper",
      description: "Veröffentlicht mindestens einen Release / Tag auf GitHub.",
      unlocked: releasesCount >= 1,
      progressText: releasesCount >= 1 ? `${releasesCount} Release(s) erkannt` : "0 / 1 Release",
      tier: "Silver",
      icon: <Award className="w-4 h-4 text-amber-400" />,
    },
    {
      id: "committer",
      title: "Active Committer",
      description: "Aktuelle Commit-Aktivität in den zuletzt aktualisierten Repositories.",
      unlocked: recentCommitsCount >= 3,
      progressText: `${recentCommitsCount} / 3 Repos mit Commits`,
      tier: "Silver",
      icon: <GitCommit className="w-4 h-4 text-sky-400" />,
    },
    {
      id: "documenter",
      title: "Clean Documenter",
      description: "Versieht mindestens 5 eigene Repositories mit einer klaren Beschreibung.",
      unlocked: documentedReposCount >= 5,
      progressText: `${documentedReposCount} / 5 Beschrieben`,
      tier: "Silver",
      icon: <FileText className="w-4 h-4 text-cyan-400" />,
    },
    {
      id: "stackcrafter",
      title: "Full-Stack & DevOps Crafter",
      description: "Arbeitet an Web-, API-, Container- oder CI/CD-Projekten auf GitHub.",
      unlocked: devopsOrFullstackCount >= 3,
      progressText: `${devopsOrFullstackCount} / 3 Stack-Projekte`,
      tier: "Silver",
      icon: <Layers className="w-4 h-4 text-indigo-400" />,
    },
    {
      id: "starmaker",
      title: "Star Collector",
      description: "Sammelt Sterne für öffentliche Projekte auf GitHub.",
      unlocked: stats.stars >= 1,
      progressText: `${stats.stars} Star${stats.stars === 1 ? "" : "s"}`,
      tier: "Bronze",
      icon: <Star className="w-4 h-4 text-yellow-400" />,
    },
    {
      id: "community",
      title: "Open-Source Networker",
      description: "Baut Netzwerk mit Followern oder Forks rund um eigene Projekte auf.",
      unlocked: stats.followers >= 1 || stats.forks >= 1,
      progressText: `${stats.followers} Follower · ${stats.forks} Forks`,
      tier: "Bronze",
      icon: <Users className="w-4 h-4 text-pink-400" />,
    },
    {
      id: "veteran",
      title: "GitHub Builder (1+ Jahr)",
      description: "Ist seit mindestens einem Jahr aktiv mit einem GitHub-Profil vertreten.",
      unlocked: accountAgeYears >= 1,
      progressText: `${accountAgeYears} Jahr${accountAgeYears === 1 ? "" : "e"} aktiv`,
      tier: "Bronze",
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
            {unlockedCount} / {achievements.length} Badges freigeschaltet
          </span>
        </div>

        <div className="bg-base-100 p-5 rounded-lg shadow-sm space-y-5 border border-base-300/60">
          {/* Filter-Buttons */}
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

          {/* Live-berechnete & Profil-Achievement Badges */}
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
                        <span
                            className={`inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${tierStyles[badge.tier]}`}
                        >
                          {badge.tier}
                        </span>
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

          {/* Optionale externe GitHub Badge-Widgets mit Fallback */}
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
  const USERNAME = "elias4864";
  const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const [allRepos, setAllRepos] = useState<Repo[]>([]);
  const [repos, setRepos] = useState<Repo[]>([]);
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
    const headers: HeadersInit = TOKEN ? { Authorization: `token ${TOKEN}` } : {};

    async function fetchGitHubData() {
      try {
        setLoading(true);

        // Profile
        const profileRes = await fetch(`https://api.github.com/users/${USERNAME}`, { headers });
        if (!profileRes.ok) throw new Error("Failed to fetch profile");
        const profile = await profileRes.json();

        // Repos
        const repoRes = await fetch(
            `https://api.github.com/users/${USERNAME}/repos?per_page=100`,
            { headers }
        );
        if (!repoRes.ok) throw new Error("Failed to fetch repos");
        const repoData: Repo[] = await repoRes.json();

        // Stats
        const totalStars = repoData.reduce((acc, r) => acc + r.stargazers_count, 0);
        const totalForks = repoData.reduce((acc, r) => acc + r.forks_count, 0);

        // Latest 5 repos
        const latestRepos = [...repoData]
            .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
            .slice(0, 5);

        // Latest commit per repo
        const commitPromises = latestRepos.map(async (repo) => {
          const res = await fetch(
              `https://api.github.com/repos/${USERNAME}/${repo.name}/commits?per_page=1`,
              { headers }
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
        });

        const commitResults = (await Promise.all(commitPromises)).filter(
            (c): c is Commit => c !== null
        );

        // Releases über die Top-Repos prüfen
        const releaseChecks = await Promise.all(
            latestRepos.map(async (repo) => {
              try {
                const rRes = await fetch(
                    `https://api.github.com/repos/${USERNAME}/${repo.name}/releases?per_page=5`,
                    { headers }
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

        // Language Calculation
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
          repos: profile.public_repos,
          stars: totalStars,
          forks: totalForks,
          followers: profile.followers,
        });
        setAllRepos(repoData);
        setRepos(latestRepos);
        setCommits(commitResults);
        setReleasesCount(totalDetectedReleases);
        setLanguagesData(langArr);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, [TOKEN]);

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

          {/* Achievements & Badges Section */}
          <AchievementsBadgesSection
              username={USERNAME}
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
                  src={`https://ghchart.rshah.org/${USERNAME}`}
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
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {languagesData.map((lang, index) => (
                      <div
                          key={index}
                          className="px-3 py-1 rounded text-sm text-white flex justify-center items-center"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      >
                        {lang.name}
                      </div>
                  ))}
                </div>
              </div>
          )}

          {/* Most Used Languages */}
          {languagesData.length > 0 && (
              <div className="my-6">
                <h3 className="text-xl my-3 text-start">Most Used Languages</h3>
                <div className="bg-base-100 p-5 rounded-lg shadow-sm space-y-4">
                  <div className="w-full h-3 rounded-full overflow-hidden flex bg-base-300">
                    {languagesData.map((lang, index) => (
                        <div
                            key={lang.name}
                            style={{
                              width: `${lang.percentage}%`,
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                            title={`${lang.name}: ${lang.percentage}%`}
                            className="h-full transition-all duration-500"
                        />
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                    {languagesData.map((lang, index) => (
                        <div key={lang.name} className="flex items-center gap-2 text-sm">
                          <span
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="font-medium truncate">{lang.name}</span>
                          <span className="text-base-content/60 text-xs ml-auto">
                            {lang.percentage}%
                          </span>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
          )}

          {/* Latest Repos */}
          <div className="mb-6">
            <h3 className="text-xl my-3">Latest Repositories</h3>
            <ul className="space-y-3">
              {repos.map((repo) => (
                  <a
                      key={repo.name}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 rounded-lg bg-base-100 hover:bg-base-100/80 shadow-sm transition-colors duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{repo.name}</span>
                      <motion.span
                          className="opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.2 }}
                      >
                        <ArrowUpRight size={16} />
                      </motion.span>
                    </div>
                    <p className="text-sm text-base-content/80 mt-1 line-clamp-2 break-words">
                      {repo.description || "No description"}
                    </p>
                    <div className="text-xs mt-2 flex gap-4 flex-wrap">
                      <span>⭐ {repo.stargazers_count}</span>
                      <span>🍴 {repo.forks_count}</span>
                      {repo.language && <span>🧠 {repo.language}</span>}
                    </div>
                  </a>
              ))}
            </ul>
          </div>

          {/* ReleasesSection mit dynamischer Repo-Auswahl */}
          <ReleasesSection repos={allRepos} />

          {/* Recent Commits */}
          <div>
            <h3 className="text-xl my-3">Recent Commits</h3>
            <ul className="space-y-3">
              {commits.map((commit, idx) => (
                  <a
                      key={idx}
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 rounded-lg bg-base-100 hover:bg-base-100/80 shadow-sm transition-colors duration-200"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p
                            title={commit.message}
                            className="text-sm font-medium line-clamp-2 break-words"
                        >
                          <span className="text-base-content/70">
                            [{commit.repo}]
                          </span>{" "}
                          {commit.message.split("\n")[0]}
                        </p>
                        <p className="text-xs text-base-content/60 mt-1">
                          {new Date(commit.date).toLocaleString("de-CH", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      <motion.span
                          className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-hidden
                      >
                        <ArrowUpRight size={16} />
                      </motion.span>
                    </div>
                  </a>
              ))}
            </ul>
          </div>

        </div>
      </motion.section>
  );
}