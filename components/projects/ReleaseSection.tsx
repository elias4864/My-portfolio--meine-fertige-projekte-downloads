"use client";

import React, { useEffect, useState } from "react";
import { Download, Tag, ExternalLink, Loader2 } from "lucide-react";

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

interface ReleasesProps {
    repoName: string; // z.B. "MangaDB" oder dein Portfolio-Repo
}

export default function ReleasesSection({ repoName }: ReleasesProps) {
    const USERNAME = "elias4864";
    const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    const [releases, setReleases] = useState<GitHubRelease[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const headers: HeadersInit = TOKEN
            ? { Authorization: `token ${TOKEN}` }
            : {};

        async function loadReleases() {
            try {
                setLoading(true);
                const res = await fetch(
                    `https://api.github.com/repos/${USERNAME}/${repoName}/releases`,
                    { headers }
                );
                if (!res.ok) throw new Error("Releases konnten nicht geladen werden");
                const data: GitHubRelease[] = await res.json();
                setReleases(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        if (repoName) loadReleases();
    }, [repoName, TOKEN]);

    if (loading) {
        return (
            <div className="flex items-center gap-2 text-sm text-base-content/70 p-4">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Lade Releases...</span>
            </div>
        );
    }

    if (releases.length === 0) {
        return (
            <p className="text-sm text-base-content/60 p-4">
                Keine Releases für dieses Repository vorhanden.
            </p>
        );
    }

    return (
        <div className="space-y-4 my-6">
            <h3 className="text-xl font-semibold">Releases & Downloads</h3>

            {releases.map((release, index) => (
                <div
                    key={release.id}
                    className="bg-base-100 p-4 rounded-lg border border-base-300 shadow-sm"
                >
                    {/* Kopfzeile mit Version & Datum */}
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

                    {/* Release-Beschreibung (falls vorhanden) */}
                    {release.body && (
                        <p className="text-sm text-base-content/80 whitespace-pre-line mb-4">
                            {release.body}
                        </p>
                    )}

                    {/* Download-Buttons (Assets + Source Code ZIP) */}
                    <div className="flex flex-wrap gap-2 mt-3">
                        {/* Falls eigene Dateien im Release hochgeladen wurden */}
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

                        {/* Standard-ZIP Download des Quellcodes */}
                        <a
                            href={release.zipball_url}
                            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md bg-base-200 hover:bg-base-300 transition"
                        >
                            <Download className="w-3.5 h-3.5" />
                            Source Code (.zip)
                        </a>

                        {/* Link direkt zu GitHub */}
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
    );
}