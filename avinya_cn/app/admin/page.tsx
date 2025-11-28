'use client';

import { useEffect, useState } from 'react';
import { Team } from '@/lib/types';
import RippleGrid from '@/components/RippleGrid';

export default function AdminPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'complete' | 'pending'>('all');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch('/api/teams/all');
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error('Failed to fetch teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredTeams = () => {
    if (filter === 'complete') {
      return teams.filter(team => 
        team.members.every(m => m.hasAcceptedInvitation)
      );
    }
    if (filter === 'pending') {
      return teams.filter(team => 
        team.members.some(m => !m.hasAcceptedInvitation)
      );
    }
    return teams;
  };

  const filteredTeams = getFilteredTeams();
  const totalMembers = teams.reduce((sum, team) => sum + team.members.length, 0);
  const acceptedMembers = teams.reduce((sum, team) => 
    sum + team.members.filter(m => m.hasAcceptedInvitation).length, 0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" 
               style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* RippleGrid Background */}
      <div className="fixed inset-0 pointer-events-none">
        <RippleGrid
          enableRainbow={false}
          gridColor="#ff7f00"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.8}
        />
      </div>

      {/* Floating Orbs */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-16 bg-gradient-to-b from-orange-500 to-orange-700 rounded-full animate-pulse"></div>
            <div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300 bg-clip-text text-transparent">
                ADMIN CONTROL PANEL
              </h1>
              <p className="text-gray-400 mt-2 text-lg">Real-time Team Management Dashboard</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-500/60 transition-all">
                <div className="text-cyan-400 text-sm font-semibold mb-2">TOTAL TEAMS</div>
                <div className="text-4xl font-bold text-white">{teams.length}</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all">
                <div className="text-purple-400 text-sm font-semibold mb-2">TOTAL MEMBERS</div>
                <div className="text-4xl font-bold text-white">{totalMembers}</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 hover:border-green-500/60 transition-all">
                <div className="text-green-400 text-sm font-semibold mb-2">ACCEPTED</div>
                <div className="text-4xl font-bold text-white">{acceptedMembers}</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 hover:border-red-500/60 transition-all">
                <div className="text-red-400 text-sm font-semibold mb-2">PENDING</div>
                <div className="text-4xl font-bold text-white">{totalMembers - acceptedMembers}</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              ALL TEAMS
            </button>
            <button
              onClick={() => setFilter('complete')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                filter === 'complete'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              COMPLETE
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                filter === 'pending'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/50'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              PENDING
            </button>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTeams.map((team, idx) => {
            const acceptedCount = team.members.filter(m => m.hasAcceptedInvitation).length;
            const isComplete = acceptedCount === team.members.length;
            
            return (
              <div
                key={team.teamId}
                className="relative group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  isComplete 
                    ? 'from-green-500/20 to-emerald-500/20' 
                    : 'from-cyan-500/20 to-purple-500/20'
                } rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Card */}
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
                  {/* Team Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${
                          isComplete ? 'bg-green-500' : 'bg-yellow-500'
                        } animate-pulse`}></div>
                        <h2 className="text-2xl font-bold text-white">{team.teamName}</h2>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-400">ID: <span className="text-cyan-400 font-mono">{team.teamId}</span></span>
                        <span className="text-gray-400">
                          Status: <span className={`font-semibold ${isComplete ? 'text-green-400' : 'text-yellow-400'}`}>
                            {acceptedCount}/{team.members.length}
                          </span>
                        </span>
                      </div>
                    </div>
                    
                    {/* Completion Ring */}
                    <div className="relative w-16 h-16">
                      <svg className="transform -rotate-90 w-16 h-16">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="4"
                          fill="none"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke={isComplete ? '#10b981' : '#06b6d4'}
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${(acceptedCount / team.members.length) * 176} 176`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {Math.round((acceptedCount / team.members.length) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Members List */}
                  <div className="space-y-3">
                    {team.members.map((member, memberIdx) => (
                      <div
                        key={member.id}
                        className="group/member relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 rounded-xl p-4 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          {/* Member Number */}
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
                            <span className="text-cyan-400 font-bold text-sm">{memberIdx + 1}</span>
                          </div>

                          {/* Member Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-white font-semibold truncate">{member.name}</h3>
                            </div>
                            <div className="flex flex-wrap gap-3 text-xs">
                              <span className="text-gray-400">
                                <span className="text-gray-500">Roll:</span> <span className="text-purple-400 font-mono">{member.rollNumber}</span>
                              </span>
                              <span className="text-gray-400 truncate">
                                <span className="text-gray-500">Email:</span> <span className="text-cyan-400">{member.email}</span>
                              </span>
                            </div>
                          </div>

                          {/* Status Indicator */}
                          <div className="flex-shrink-0">
                            <div className={`relative w-12 h-12 rounded-lg border-2 ${
                              member.hasAcceptedInvitation
                                ? 'bg-green-500/20 border-green-500 shadow-lg shadow-green-500/50'
                                : 'bg-red-500/20 border-red-500 shadow-lg shadow-red-500/50'
                            } transition-all duration-300 flex items-center justify-center`}>
                              {member.hasAcceptedInvitation ? (
                                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Hover Effect Line */}
                        <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover/member:w-full transition-all duration-500 ${
                          member.hasAcceptedInvitation ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                    ))}
                  </div>

                  {/* Team Footer */}
                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
                    <span>Created: {new Date(team.createdAt).toLocaleDateString()}</span>
                    {isComplete && (
                      <div className="flex items-center gap-2 text-green-400 font-semibold">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        VERIFIED
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTeams.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white/5 rounded-full mb-6">
              <svg className="w-20 h-20 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No Teams Found</h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
