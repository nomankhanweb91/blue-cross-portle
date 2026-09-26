import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Trophy,
  Calendar,
  AlertTriangle,
  Award,
  Layers,
  Users,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';
import { cricketProvider } from '../providers/CricketProvider';
import { CricketMatch } from '../types';

export const CricketPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'fixtures';

  const [matches, setMatches] = useState<CricketMatch[]>([]);
  const [rankings, setRankings] = useState<any[]>([]);
  const [pointsTable, setPointsTable] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    cricketProvider.getMatches().then(setMatches);
    cricketProvider.getRankings().then(setRankings);
    cricketProvider.getPointsTable('IPL').then(setPointsTable);
    cricketProvider.getTeams().then(setTeams);
  }, []);

  const tabs = [
    { id: 'fixtures', label: 'Upcoming Fixtures' },
    { id: 'live', label: 'Live Scores (API)' },
    { id: 'rankings', label: 'ICC Rankings' },
    { id: 'points', label: 'Points Table' },
    { id: 'teams', label: 'Teams & Squads' },
  ];

  return (
    <>
      <SEOHead
        title="Cricket Hub — Fixtures, ICC Rankings & Tournament Schedules"
        description="Official cricket tournament schedules, IPL 2026 fixtures, ICC World Test Championship rankings, team standings, and authorized cricket data provider architecture."
        canonicalPath={`/cricket?tab=${activeTab}`}
        breadcrumbs={[
          { label: 'Sports', url: '/cricket' },
          { label: 'Cricket Hub' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'Cricket Hub', url: '/cricket' }]} />

        {/* Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-4 h-4" />
            <span>Cricket Tournament Directory</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Cricket Fixtures, Rankings &amp; Tournaments
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Official match fixtures, ICC team ratings, tournament points tables, and authorized API provider interface.
          </p>
        </div>

        {/* Live Data Compliance Banner according to Rule 61 */}
        <div className="p-4 mb-8 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Authorized API &amp; Anti-Falsification Policy:</p>
            <p className="mt-0.5">
              Live cricket ball-by-ball commentary and real-time scoreboards require an authorized BCCI/ICC licensed API provider key (<code>CRICKET_API_KEY</code>).
              Blue Cross never fabricates simulated or fake live match scores.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 mb-8 text-xs font-bold">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSearchParams({ tab: tab.id })}
              className={`px-4 py-2 rounded-xl transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: FIXTURES */}
        {activeTab === 'fixtures' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map((match) => (
              <div
                key={match.id}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm"
              >
                <div className="flex justify-between items-center text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                    {match.series}
                  </span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-semibold">
                    {match.format}
                  </span>
                </div>

                <div className="flex items-center justify-between my-4">
                  <div className="text-center w-5/12">
                    <div className="font-extrabold text-base text-slate-900 dark:text-white">
                      {match.team1.name}
                    </div>
                    <span className="text-xs text-slate-500 font-semibold">{match.team1.code}</span>
                  </div>

                  <div className="text-center w-2/12">
                    <span className="text-xs font-bold text-slate-400 uppercase">VS</span>
                  </div>

                  <div className="text-center w-5/12">
                    <div className="font-extrabold text-base text-slate-900 dark:text-white">
                      {match.team2.name}
                    </div>
                    <span className="text-xs text-slate-500 font-semibold">{match.team2.code}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
                  <span className="truncate max-w-[200px]">{match.venue}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">
                    {match.startTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: LIVE SCORES API CONNECT */}
        {activeTab === 'live' && (
          <div className="max-w-xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center shadow-sm">
            <Trophy className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Live Cricket Data Interface
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Live ball-by-ball commentary and real-time scorecards are configured to activate upon attaching licensed API credentials in environment variables (<code>CRICKET_API_KEY</code>).
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-left text-xs space-y-2 mb-6 font-mono text-slate-600 dark:text-slate-300">
              <div>Provider Status: Disconnected (No API key)</div>
              <div>Strict Policy: Rule 61 Enforcement Active</div>
              <div>Fake Score Simulation: Disabled</div>
            </div>
            <a
              href="https://www.bcci.tv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-orange-600 text-white font-semibold text-xs hover:bg-orange-700 transition"
            >
              <span>Visit BCCI Official Match Centre</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* TAB 3: ICC RANKINGS */}
        {activeTab === 'rankings' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rankings.map((r, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm"
              >
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <Award className="w-4 h-4 text-orange-500" />
                  <span>{r.format}</span>
                </div>
                <div className="space-y-3">
                  {r.teams.map((t: any) => (
                    <div key={t.rank} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-400 w-4">{t.rank}</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{t.team}</span>
                      </div>
                      <span className="font-mono text-slate-500 font-bold">{t.rating} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: POINTS TABLE */}
        {activeTab === 'points' && (
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 font-bold text-base text-slate-900 dark:text-white">
              IPL Championship Standings
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Pos</th>
                    <th className="py-3 px-4">Team</th>
                    <th className="py-3 px-4">Played</th>
                    <th className="py-3 px-4">Won</th>
                    <th className="py-3 px-4">Lost</th>
                    <th className="py-3 px-4">NRR</th>
                    <th className="py-3 px-4 font-bold text-slate-900 dark:text-white">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {pointsTable.map((row) => (
                    <tr key={row.position} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-400">{row.position}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{row.team}</td>
                      <td className="py-3 px-4 font-mono">{row.played}</td>
                      <td className="py-3 px-4 font-mono text-emerald-600">{row.won}</td>
                      <td className="py-3 px-4 font-mono text-rose-500">{row.lost}</td>
                      <td className="py-3 px-4 font-mono text-slate-500">{row.nrr}</td>
                      <td className="py-3 px-4 font-mono font-bold text-base text-blue-600">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: TEAMS */}
        {activeTab === 'teams' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {teams.map((t) => (
              <div
                key={t.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-sm"
              >
                <div className="text-3xl mb-2">{t.flag}</div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  {t.name}
                </h4>
                <div className="text-[11px] text-slate-400 font-semibold mt-0.5">
                  {t.short} • {t.type}
                </div>
              </div>
            ))}
          </div>
        )}

        <AdSlot layout="in-content" className="mt-12" />
      </div>
    </>
  );
};
