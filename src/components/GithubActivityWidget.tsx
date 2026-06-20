"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitCommit, Star, Users, GitBranch } from "lucide-react";

type GithubUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
};

type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
};

export default function GithubActivityWidget() {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [username] = useState("Lakshay-Rewani"); // Update this to your GitHub username!

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();
        
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const reposData = await reposRes.json();
        
        setUser(userData);
        setRepos(reposData);
      } catch (err) {
        console.error("Failed to fetch GitHub data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  return (
    <section id="github" className="bg-[#0a0a0a] text-white py-32 px-4 md:px-12 relative z-20 border-b border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">Open Source</span>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">GitHub Activity</h2>
          <p className="text-gray-400 text-lg md:text-2xl max-w-2xl font-light">
            Real-time profile and repository information from GitHub.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass-card rounded-3xl border border-white/5 p-8 flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                {user?.avatar_url && (
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-20 h-20 rounded-full border-2 border-indigo-500/30"
                  />
                )}
                <div>
                  <h3 className="text-2xl font-bold">{user?.name || username}</h3>
                  <a href={user?.html_url} target="_blank" rel="noreferrer" className="text-sm text-indigo-400 hover:text-indigo-300">
                    @{user?.login}
                  </a>
                </div>
              </div>
              {user?.bio && <p className="text-gray-400 text-sm">{user.bio}</p>}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{user?.public_repos}</div>
                  <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <GitBranch className="w-3 h-3" /> Repos
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{user?.followers}</div>
                  <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Users className="w-3 h-3" /> Followers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{user?.following}</div>
                  <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Users className="w-3 h-3" /> Following
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Repositories Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {repos.map((repo, idx) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card rounded-2xl border border-white/5 p-6 hover:border-indigo-500/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white">{repo.name}</h4>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-mono">{repo.stargazers_count}</span>
                    </div>
                  </div>
                  {repo.description && <p className="text-sm text-gray-400 mb-4 line-clamp-2">{repo.description}</p>}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {repo.language && <span className="px-2 py-1 rounded-full bg-white/5 border border-white/5">{repo.language}</span>}
                    <span className="flex items-center gap-1">
                      <GitCommit className="w-3 h-3" /> Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
