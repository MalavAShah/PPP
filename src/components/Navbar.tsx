import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  ShieldCheck, 
  Award, 
  BarChart3, 
  FileCheck2, 
  Settings, 
  Home, 
  Bell, 
  UserCheck, 
  RotateCcw,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { currentUser, setCurrentUserRole, notifications, dismissNotification, resetDemoData } = useApp();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const rolesList: { role: UserRole; label: string; desc: string }[] = [
    { role: 'PUBLIC', label: 'Public User', desc: 'View landing page & verify certificates' },
    { role: 'CLUB_ORGANIZER', label: 'Club Organizer', desc: 'Create events, upload evidence' },
    { role: 'AUDITOR', label: 'Green Auditor', desc: 'Review evidence & assign marks' },
    { role: 'SUSTAINABILITY_COMMITTEE', label: 'Sustainability Committee', desc: 'Institutional analytics & trends' },
    { role: 'ADMIN', label: 'System Admin', desc: 'Weights, users & audit logs' },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-900/40 bg-emerald-950/90 backdrop-blur-md">
      {/* Top Banner: DEMO MODE & Role Switcher */}
      <div className="bg-emerald-900/40 border-b border-emerald-800/30 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              DEMO MODE
            </span>
            <span className="text-emerald-200/70 hidden sm:inline">
              KJSIM Institutional Governance Portal — ISO 20121 Inspired Framework
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-emerald-800/50 hover:bg-emerald-800 text-emerald-100 font-medium transition-colors border border-emerald-700/40"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Role: <strong className="text-emerald-300">{currentUser.name}</strong> ({currentUser.role.replace('_', ' ')})</span>
                <ChevronDown className="w-3 h-3 text-emerald-400" />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-emerald-950 border border-emerald-700/60 rounded-xl shadow-2xl p-2 z-50">
                  <div className="px-3 py-2 text-[11px] font-semibold text-emerald-400 uppercase tracking-wider border-b border-emerald-800/50">
                    Switch Active User Role
                  </div>
                  <div className="py-1 space-y-1">
                    {rolesList.map(r => (
                      <button
                        key={r.role}
                        onClick={() => {
                          setCurrentUserRole(r.role);
                          setShowRoleMenu(false);
                          if (r.role === 'CLUB_ORGANIZER') setActiveTab('club');
                          else if (r.role === 'AUDITOR') setActiveTab('auditor');
                          else if (r.role === 'SUSTAINABILITY_COMMITTEE') setActiveTab('dashboard');
                          else if (r.role === 'ADMIN') setActiveTab('admin');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex flex-col ${
                          currentUser.role === r.role 
                            ? 'bg-emerald-600/30 border border-emerald-500/50 text-emerald-100' 
                            : 'hover:bg-emerald-900/60 text-emerald-200/80'
                        }`}
                      >
                        <span className="font-semibold text-sm flex items-center justify-between">
                          {r.label}
                          {currentUser.role === r.role && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        </span>
                        <span className="text-[11px] text-emerald-300/60">{r.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reset Button */}
            <button
              onClick={resetDemoData}
              title="Reset Demo Data"
              className="p-1 rounded text-emerald-400 hover:text-emerald-200 hover:bg-emerald-900/50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-800 p-0.5 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-emerald-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-200 via-emerald-100 to-white bg-clip-text text-transparent">
                  GECF
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-800/60 text-emerald-300 border border-emerald-700/50">
                  KJSIM
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/70 font-medium tracking-wide">
                Green Event Certification Framework
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                activeTab === 'home' 
                  ? 'bg-emerald-800/70 text-emerald-100 shadow-sm border border-emerald-700/50' 
                  : 'text-emerald-200/70 hover:text-emerald-100 hover:bg-emerald-900/40'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('directory')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                activeTab === 'directory' 
                  ? 'bg-emerald-800/70 text-emerald-100 shadow-sm border border-emerald-700/50' 
                  : 'text-emerald-200/70 hover:text-emerald-100 hover:bg-emerald-900/40'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Certified Events</span>
            </button>

            {(currentUser.role === 'CLUB_ORGANIZER' || currentUser.role === 'ADMIN') && (
              <button
                onClick={() => setActiveTab('club')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                  activeTab === 'club' 
                    ? 'bg-emerald-800/70 text-emerald-100 shadow-sm border border-emerald-700/50' 
                    : 'text-emerald-200/70 hover:text-emerald-100 hover:bg-emerald-900/40'
                }`}
              >
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Club Portal</span>
              </button>
            )}

            {(currentUser.role === 'AUDITOR' || currentUser.role === 'ADMIN') && (
              <button
                onClick={() => setActiveTab('auditor')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                  activeTab === 'auditor' 
                    ? 'bg-emerald-800/70 text-emerald-100 shadow-sm border border-emerald-700/50' 
                    : 'text-emerald-200/70 hover:text-emerald-100 hover:bg-emerald-900/40'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Audit Desk</span>
              </button>
            )}

            {(currentUser.role === 'SUSTAINABILITY_COMMITTEE' || currentUser.role === 'ADMIN' || currentUser.role === 'PUBLIC') && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                  activeTab === 'dashboard' 
                    ? 'bg-emerald-800/70 text-emerald-100 shadow-sm border border-emerald-700/50' 
                    : 'text-emerald-200/70 hover:text-emerald-100 hover:bg-emerald-900/40'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span>Institutional Analytics</span>
              </button>
            )}

            {currentUser.role === 'ADMIN' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                  activeTab === 'admin' 
                    ? 'bg-emerald-800/70 text-emerald-100 shadow-sm border border-emerald-700/50' 
                    : 'text-emerald-200/70 hover:text-emerald-100 hover:bg-emerald-900/40'
                }`}
              >
                <Settings className="w-4 h-4 text-emerald-300" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* Right Actions: Notifications & Primary CTA */}
          <div className="flex items-center space-x-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2 rounded-lg bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-200 transition-colors border border-emerald-700/30"
              >
                <Bell className="w-5 h-5 text-emerald-300" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-emerald-950 font-extrabold text-[10px] flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-emerald-950 border border-emerald-700/60 rounded-xl shadow-2xl p-3 z-50">
                  <div className="flex items-center justify-between border-b border-emerald-800/50 pb-2 mb-2">
                    <span className="font-semibold text-sm text-emerald-200">Notifications</span>
                    <span className="text-xs text-emerald-400/80">{notifications.length} recent</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-emerald-300/60 py-4 text-center">No new notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          className="p-2.5 rounded-lg bg-emerald-900/30 border border-emerald-800/40 text-xs flex items-start space-x-2.5"
                        >
                          {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                          {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                          {n.type === 'info' && <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-emerald-100">{n.title}</p>
                              <span className="text-[10px] text-emerald-400/60">{n.timestamp}</span>
                            </div>
                            <p className="text-emerald-200/70 mt-0.5 leading-snug">{n.message}</p>
                          </div>
                          <button
                            onClick={() => dismissNotification(n.id)}
                            className="text-emerald-500 hover:text-emerald-300"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Primary Action */}
            <button
              onClick={() => {
                setCurrentUserRole('CLUB_ORGANIZER');
                setActiveTab('club');
              }}
              className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-emerald-950 font-bold text-sm shadow-md shadow-emerald-900/30 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Register Event</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
