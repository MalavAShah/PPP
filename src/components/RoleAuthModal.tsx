import React, { useState, useEffect } from 'react';
import { UserRole, ROLE_PASSWORDS } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Lock, 
  Unlock, 
  KeyRound, 
  ShieldCheck, 
  AlertCircle, 
  X, 
  Eye, 
  EyeOff, 
  Sparkles,
  Building2,
  BarChart3,
  Settings,
  Info
} from 'lucide-react';

interface RoleAuthModalProps {
  isOpen: boolean;
  targetRole: UserRole | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const RoleAuthModal: React.FC<RoleAuthModalProps> = ({
  isOpen,
  targetRole,
  onClose,
  onSuccess
}) => {
  const { verifyAndUnlockRole } = useApp();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(null);
      setShowPassword(false);
    }
  }, [isOpen, targetRole]);

  if (!isOpen || !targetRole || targetRole === 'PUBLIC') return null;

  const roleMeta: Record<Exclude<UserRole, 'PUBLIC'>, {
    title: string;
    subtitle: string;
    badge: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
  }> = {
    CLUB_ORGANIZER: {
      title: 'Club Organizer Portal',
      subtitle: 'Authenticate to register events, complete sustainability checklists and upload audit evidence.',
      badge: 'Student Governance Tier',
      icon: Building2,
      accentColor: 'from-emerald-600 to-teal-600',
    },
    AUDITOR: {
      title: 'Green Auditor Desk',
      subtitle: 'Authenticate to review student evidence, verify marks, and finalize ISO-aligned GECF certifications.',
      badge: 'Compliance & Verification Tier',
      icon: ShieldCheck,
      accentColor: 'from-teal-600 to-cyan-600',
    },
    SUSTAINABILITY_COMMITTEE: {
      title: 'Sustainability Committee',
      subtitle: 'Authenticate to access institutional trends, cross-club benchmarks, and university ESG analytics.',
      badge: 'Institutional Governance Tier',
      icon: BarChart3,
      accentColor: 'from-cyan-600 to-blue-600',
    },
    ADMIN: {
      title: 'System Administrator Control',
      subtitle: 'Authenticate to manage scoring weights, certification thresholds, and system audit trail logs.',
      badge: 'Master Administration Tier',
      icon: Settings,
      accentColor: 'from-amber-600 to-emerald-600',
    }
  };

  const currentMeta = roleMeta[targetRole as Exclude<UserRole, 'PUBLIC'>];
  const RoleIcon = currentMeta.icon;
  const expectedPassword = ROLE_PASSWORDS[targetRole as Exclude<UserRole, 'PUBLIC'>];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter the security password.');
      return;
    }

    const result = verifyAndUnlockRole(targetRole, password);
    if (result.success) {
      onClose();
      if (onSuccess) onSuccess();
    } else {
      setError(result.error || 'Invalid password. Please check the credentials.');
    }
  };

  const handleQuickFill = (role: Exclude<UserRole, 'PUBLIC'>) => {
    setPassword(ROLE_PASSWORDS[role]);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel border border-emerald-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden">
        
        {/* Glow behind modal */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 hover:text-white transition-colors border border-emerald-800/60"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentMeta.accentColor} p-0.5 shadow-lg shadow-emerald-950/60`}>
              <div className="w-full h-full bg-emerald-950 rounded-[14px] flex items-center justify-center">
                <RoleIcon className="w-6 h-6 text-emerald-300" />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-700/50">
                {currentMeta.badge}
              </span>
              <h3 className="text-xl font-extrabold text-white mt-0.5">
                {currentMeta.title}
              </h3>
            </div>
          </div>

          <p className="text-xs text-emerald-200/70 leading-relaxed">
            {currentMeta.subtitle}
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="text-emerald-200 font-semibold flex items-center space-x-1.5">
                <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                <span>Role Password *</span>
              </label>
              <button
                type="button"
                onClick={() => handleQuickFill(targetRole as Exclude<UserRole, 'PUBLIC'>)}
                className="text-[11px] text-emerald-400 hover:text-emerald-200 underline font-medium"
              >
                Auto-fill Demo Password
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                className={`w-full px-4 py-3 rounded-xl bg-emerald-950/90 border text-white text-sm focus:outline-none transition-colors pr-10 ${
                  error ? 'border-red-500 focus:border-red-400' : 'border-emerald-600/70 focus:border-emerald-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-emerald-400/80 hover:text-emerald-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center space-x-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl glass-card hover:bg-emerald-900/60 text-emerald-200 text-xs font-semibold transition-colors border border-emerald-800/60"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-emerald-950 font-extrabold text-xs shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center space-x-1.5"
            >
              <Unlock className="w-3.5 h-3.5 text-emerald-950" />
              <span>Unlock & Access</span>
            </button>
          </div>
        </form>

        {/* Collapsible Passwords Reference Box */}
        <div className="border-t border-emerald-900/60 pt-4">
          <button
            type="button"
            onClick={() => setShowCheatSheet(!showCheatSheet)}
            className="w-full flex items-center justify-between text-xs text-emerald-300/80 hover:text-emerald-200 transition-colors"
          >
            <span className="flex items-center space-x-1.5 font-semibold">
              <Info className="w-3.5 h-3.5 text-emerald-400" />
              <span>View All Role Passwords</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-900/50 px-2 py-0.5 rounded">
              {showCheatSheet ? 'Hide' : 'Show'}
            </span>
          </button>

          {showCheatSheet && (
            <div className="mt-3 p-3 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 text-xs space-y-2 animate-in fade-in">
              <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                Official Access Credentials:
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-900/40">
                  <span className="text-emerald-300">Club Organizer:</span>
                  <span className="text-white font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/60">club2026</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-900/40">
                  <span className="text-emerald-300">Green Auditor:</span>
                  <span className="text-white font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/60">audit2026</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-900/40">
                  <span className="text-emerald-300">Sustainability Committee:</span>
                  <span className="text-white font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/60">sustain2026</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-900/40">
                  <span className="text-emerald-300">System Admin:</span>
                  <span className="text-white font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/60">admin2026</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-900/20 text-emerald-400/80">
                  <span>Public User:</span>
                  <span className="italic font-sans text-[10px]">No password (open)</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
