import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, ROLE_PASSWORDS } from '../types';
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
  Info,
  Lock,
  Unlock,
  KeyRound,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRegisterModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenRegisterModal }) => {
  const { 
    currentUser, 
    switchRoleWithProtection, 
    unlockedRoles, 
    lockRole, 
    notifications, 
    dismissNotification, 
    resetDemoData 
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showPasswordsTooltip, setShowPasswordsTooltip] = useState(false);

  const rolesList: { role: UserRole; label: string; desc: string; tab: string }[] = [
    { role: 'PUBLIC', label: 'Public User', desc: 'View landing page & verify certificates', tab: 'home' },
    { role: 'CLUB_ORGANIZER', label: 'Club Organizer', desc: 'Create events, upload evidence', tab: 'club' },
    { role: 'AUDITOR', label: 'Green Auditor', desc: 'Review evidence & assign marks', tab: 'auditor' },
    { role: 'SUSTAINABILITY_COMMITTEE', label: 'Sustainability Committee', desc: 'Institutional analytics & trends', tab: 'dashboard' },
    { role: 'ADMIN', label: 'System Admin', desc: 'Weights, users & audit logs', tab: 'admin' },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;
  const isProtectedRoleActive = currentUser.role !== 'PUBLIC';

  const handleRoleSelect = (role: UserRole, targetTab: string) => {
    setShowRoleMenu(false);
    switchRoleWithProtection(role, () => {
      setActiveTab(targetTab);
    });
  };

  const handleTabClick = (tabKey: string, requiredRole: UserRole) => {
    if (requiredRole === 'PUBLIC') {
      setActiveTab(tabKey);
      return;
    }

    if (currentUser.role === requiredRole || currentUser.role === 'ADMIN' || unlockedRoles[requiredRole]) {
      setActiveTab(tabKey);
    } else {
      switchRoleWithProtection(requiredRole, () => {
        setActiveTab(tabKey);
      });
    }
  };

  const handleRegisterClick = () => {
    switchRoleWithProtection('CLUB_ORGANIZER', () => {
      if (onOpenRegisterModal) {
        onOpenRegisterModal();
      } else {
        setActiveTab('club');
      }
    });
  };

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
              KJSIM Institutional Governance Portal — ISO 20121 Framework
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Lock & Exit Button if logged into protected role */}
            {isProtectedRoleActive && (
              <button
                onClick={() => {
                  lockRole();
                  setActiveTab('home');
                }}
                title="Lock role & return to Public mode"
                className="hidden md:flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-800/50 transition-colors"
              >
                <Lock className="w-3 h-3 text-red-400" />
                <span>Lock Role</span>
              </button>
            )}

            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-emerald-100 font-medium transition-colors border ${
                  isProtectedRoleActive 
                    ? 'bg-emerald-800/70 border-emerald-500/60 shadow-sm' 
                    : 'bg-emerald-900/60 hover:bg-emerald-800/70 border-emerald-700/40'
                }`}
              >
                {isProtectedRoleActive ? (
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
                )}
                <span>
                  Role: <strong className="text-emerald-300">{currentUser.name}</strong> ({currentUser.role.replace('_', ' ')})
                </span>
                <ChevronDown className="w-3 h-3 text-emerald-400" />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-emerald-950 border border-emerald-700/60 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-2 text-[11px] font-semibold text-emerald-400 uppercase tracking-wider border-b border-emerald-800/50 flex items-center justify-between">
                    <span>Switch Active User Role</span>
                    <span className="text-[10px] lowercase text-emerald-300/60 font-mono">Protected</span>
                  </div>

                  <div className="py-1 space-y-1">
                    {rolesList.map(r => {
                      const isPublic = r.role === 'PUBLIC';
                      const isUnlocked = isPublic || unlockedRoles[r.role];
                      const isCurrent = currentUser.role === r.role;

                      return (
                        <button
                          key={r.role}
                          onClick={() => handleRoleSelect(r.role, r.tab)}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-all flex flex-col ${
                            isCurrent 
                              ? 'bg-emerald-600/30 border border-emerald-500/60 text-emerald-100 shadow-sm' 
                              : 'hover:bg-emerald-900/60 text-emerald-200/80 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-semibold text-sm flex items-center space-x-1.5 text-white">
                              <span>{r.label}</span>
                              {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                            </span>

                            {/* Lock/Unlock Badge */}
                            {isPublic ? (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-900/60 text-emerald-300/90 font-medium">
                                Public (Open)
                              </span>
                            ) : isUnlocked ? (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold flex items-center space-x-1 border border-emerald-500/40">
                                <Unlock className="w-2.5 h-2.5" />
                                <span>Unlocked</span>
                              </span>
                            ) : (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 font-semibold flex items-center space-x-1 border border-amber-500/30">
                                <Lock className="w-2.5 h-2.5" />
                                <span>Password</span>
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-emerald-300/60 mt-0.5">{r.desc}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Passwords Helper inside dropdown */}
                  <div className="border-t border-emerald-800/60 pt-2 px-2 mt-1 space-y-2">
                    <button
                      type="button"
                      onClick={() => setShowPasswordsTooltip(!showPasswordsTooltip)}
                      className="w-full flex items-center justify-between text-[11px] text-emerald-300 hover:text-white"
                    >
                      <span className="flex items-center space-x-1">
                        <KeyRound className="w-3 h-3 text-emerald-400" />
                        <span className="font-semibold">Role Passwords Cheat Sheet</span>
                      </span>
                      <span className="text-[10px] underline">{showPasswordsTooltip ? 'Hide' : 'View'}</span>
                    </button>

                    {showPasswordsTooltip && (
                      <div className="p-2.5 rounded-xl bg-emerald-900/60 border border-emerald-700/50 text-[11px] space-y-1 font-mono text-emerald-100">
                        <p><strong className="text-emerald-300 font-sans">Club Organizer:</strong> club2026</p>
                        <p><strong className="text-emerald-300 font-sans">Green Auditor:</strong> audit2026</p>
                        <p><strong className="text-emerald-300 font-sans">Sustainability:</strong> sustain2026</p>
                        <p><strong className="text-emerald-300 font-sans">System Admin:</strong> admin2026</p>
                      </div>
                    )}

                    {isProtectedRoleActive && (
                      <button
                        onClick={() => {
                          setShowRoleMenu(false);
                          lockRole();
                          setActiveTab('home');
                        }}
                        className="w-full py-1.5 rounded-lg bg-red-900/30 hover:bg-red-900/50 text-red-300 border border-red-700/40 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Lock Current Role & Exit</span>
                      </button>
                    )}
                  </div>

                </div>
              )}
            </div>

            {/* Reset Button */}
            <button
              onClick={resetDemoData}
              title="Reset Demo Data & Relock Roles"
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

            {/* Club Portal Button */}
            <button
              onClick={() => handleTabClick('club', 'CLUB_ORGANIZER')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                activeTab === 'club' 
                  ? 'bg-emerald-800/70 text-emerald-100 shadow-sm border border-emerald-700/50' 
                  : 'text-emerald-200/70 hover:text-emerald-100 hover:bg-emerald-900/40'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Club Portal</span>
              {!unlockedRoles['CLUB_ORGANIZER'] && currentUser.role !== 'ADMIN' && (
                <Lock className="w-3 h-3 text-amber-400/80 shrink-0" />
              )}
            </button>

            {/* Audit Desk Button */}
            <button
              onClick={() => handleTabClick('auditor', 'AUDITOR')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                activeTab === 'auditor' 
                  ? 'bg-emerald-800/70 text-emerald-100 shadow-sm border border-emerald-700/50' 
                  : 'text-emerald-200/70 hover:text-emerald-100 hover:bg-emerald-900/40'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Audit Desk</span>
              {!unlockedRoles['AUDITOR'] && currentUser.role !== 'ADMIN' && (
                <Lock className="w-3 h-3 text-amber-400/80 shrink-0" />
              )}
            </button>

            {/* Institutional Analytics Button */}
            <button
              onClick={() => handleTabClick('dashboard', 'SUSTAINABILITY_COMMITTEE')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                activeTab === 'dashboard' 
                  ? 'bg-emerald-800/70 text-emerald-100 shadow-sm border border-emerald-700/50' 
                  : 'text-emerald-200/70 hover:text-emerald-100 hover:bg-emerald-900/40'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Institutional Analytics</span>
              {!unlockedRoles['SUSTAINABILITY_COMMITTEE'] && currentUser.role !== 'ADMIN' && (
                <Lock className="w-3 h-3 text-amber-400/80 shrink-0" />
              )}
            </button>

            {/* Admin Button */}
            <button
              onClick={() => handleTabClick('admin', 'ADMIN')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                activeTab === 'admin' 
                  ? 'bg-emerald-800/70 text-emerald-100 shadow-sm border border-emerald-700/50' 
                  : 'text-emerald-200/70 hover:text-emerald-100 hover:bg-emerald-900/40'
              }`}
            >
              <Settings className="w-4 h-4 text-emerald-300" />
              <span>Admin</span>
              {!unlockedRoles['ADMIN'] && (
                <Lock className="w-3 h-3 text-amber-400/80 shrink-0" />
              )}
            </button>
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
              onClick={handleRegisterClick}
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
