import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScoringWeights, CertificationThresholds } from '../types';
import { 
  Settings, 
  Users, 
  Building2, 
  Sliders, 
  FileClock, 
  CheckCircle2, 
  Save, 
  ShieldAlert,
  UserPlus
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { 
    users, 
    categories, 
    criteria, 
    weights, 
    thresholds, 
    auditLogs, 
    updateWeights, 
    updateThresholds 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'weights' | 'users' | 'logs'>('weights');

  // Form states for scoring weights & thresholds
  const [localWeights, setLocalWeights] = useState<ScoringWeights>(weights);
  const [localThresholds, setLocalThresholds] = useState<CertificationThresholds>(thresholds);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const totalWeightSum = Object.values(localWeights).reduce((a, b) => a + b, 0);

  const handleSaveScoringConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalWeightSum !== 100) return;
    updateWeights(localWeights);
    updateThresholds(localThresholds);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">System Governance</span>
          <h1 className="text-3xl font-extrabold text-white">Administrator Control Panel</h1>
          <p className="text-xs text-emerald-200/70">Manage user permissions, configure category weights, edit certification thresholds, and inspect audit logs.</p>
        </div>
      </div>

      {/* Admin Subtabs */}
      <div className="flex border-b border-emerald-900/60 space-x-6 text-sm font-semibold">
        <button
          onClick={() => setActiveAdminTab('weights')}
          className={`pb-3 transition-colors border-b-2 flex items-center space-x-2 ${
            activeAdminTab === 'weights' 
              ? 'border-emerald-400 text-emerald-300' 
              : 'border-transparent text-emerald-200/50 hover:text-emerald-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Scoring Weights & Thresholds</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('users')}
          className={`pb-3 transition-colors border-b-2 flex items-center space-x-2 ${
            activeAdminTab === 'users' 
              ? 'border-emerald-400 text-emerald-300' 
              : 'border-transparent text-emerald-200/50 hover:text-emerald-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Users & Role Assignments ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('logs')}
          className={`pb-3 transition-colors border-b-2 flex items-center space-x-2 ${
            activeAdminTab === 'logs' 
              ? 'border-emerald-400 text-emerald-300' 
              : 'border-transparent text-emerald-200/50 hover:text-emerald-200'
          }`}
        >
          <FileClock className="w-4 h-4" />
          <span>System Audit Trail Logs ({auditLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: SCORING WEIGHTS & THRESHOLDS CONFIGURATOR */}
      {activeAdminTab === 'weights' && (
        <form onSubmit={handleSaveScoringConfig} className="space-y-6">
          
          <div className="p-6 rounded-2xl glass-panel border border-emerald-800/40 space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">Category Weight Allocations (Must Sum to 100)</h3>
                <p className="text-xs text-emerald-300/70">Adjust point weights across the 6 GECF sustainability pillars.</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                totalWeightSum === 100 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'
              }`}>
                Current Sum: {totalWeightSum} / 100 Pts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div className="space-y-2 p-4 rounded-xl bg-emerald-950/60 border border-emerald-800">
                <label className="font-bold text-white block">Waste Management Weight</label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={localWeights.waste_management}
                  onChange={(e) => setLocalWeights({ ...localWeights, waste_management: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-900 border border-emerald-700 text-white font-bold"
                />
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-emerald-950/60 border border-emerald-800">
                <label className="font-bold text-white block">Food Sustainability Weight</label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={localWeights.food_sustainability}
                  onChange={(e) => setLocalWeights({ ...localWeights, food_sustainability: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-900 border border-emerald-700 text-white font-bold"
                />
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-emerald-950/60 border border-emerald-800">
                <label className="font-bold text-white block">Paper & Materials Weight</label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={localWeights.paper_materials}
                  onChange={(e) => setLocalWeights({ ...localWeights, paper_materials: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-900 border border-emerald-700 text-white font-bold"
                />
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-emerald-950/60 border border-emerald-800">
                <label className="font-bold text-white block">Sustainable Procurement Weight</label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={localWeights.sustainable_procurement}
                  onChange={(e) => setLocalWeights({ ...localWeights, sustainable_procurement: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-900 border border-emerald-700 text-white font-bold"
                />
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-emerald-950/60 border border-emerald-800">
                <label className="font-bold text-white block">Social Sustainability Weight</label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={localWeights.social_sustainability}
                  onChange={(e) => setLocalWeights({ ...localWeights, social_sustainability: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-900 border border-emerald-700 text-white font-bold"
                />
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-emerald-950/60 border border-emerald-800">
                <label className="font-bold text-white block">Innovation Weight</label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={localWeights.innovation}
                  onChange={(e) => setLocalWeights({ ...localWeights, innovation: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-900 border border-emerald-700 text-white font-bold"
                />
              </div>
            </div>
          </div>

          {/* Certification Threshold Configurator */}
          <div className="p-6 rounded-2xl glass-panel border border-emerald-800/40 space-y-6">
            <h3 className="font-bold text-white text-base">Certification Level Score Cutoffs</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
              <div className="space-y-2 p-4 rounded-xl bg-emerald-950 border border-sky-500/40">
                <label className="font-bold text-sky-300 block">Platinum Cutoff (&ge; Score)</label>
                <input
                  type="number"
                  value={localThresholds.platinum}
                  onChange={(e) => setLocalThresholds({ ...localThresholds, platinum: parseInt(e.target.value) || 90 })}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-900 border border-sky-600 text-white font-bold"
                />
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-emerald-950 border border-amber-500/40">
                <label className="font-bold text-amber-300 block">Gold Cutoff (&ge; Score)</label>
                <input
                  type="number"
                  value={localThresholds.gold}
                  onChange={(e) => setLocalThresholds({ ...localThresholds, gold: parseInt(e.target.value) || 75 })}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-900 border border-amber-600 text-white font-bold"
                />
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-emerald-950 border border-slate-500/40">
                <label className="font-bold text-slate-300 block">Silver Cutoff (&ge; Score)</label>
                <input
                  type="number"
                  value={localThresholds.silver}
                  onChange={(e) => setLocalThresholds({ ...localThresholds, silver: parseInt(e.target.value) || 60 })}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-900 border border-slate-600 text-white font-bold"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {savedSuccess && (
              <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Configuration saved successfully!</span>
              </span>
            )}
            <div className="ml-auto">
              <button
                type="submit"
                disabled={totalWeightSum !== 100}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-sm shadow-lg flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Governance Configuration</span>
              </button>
            </div>
          </div>

        </form>
      )}

      {/* TAB 2: USERS & ROLES */}
      {activeAdminTab === 'users' && (
        <div className="p-6 rounded-2xl glass-panel border border-emerald-800/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Registered System Users</h3>
            <button className="px-3 py-1.5 rounded-lg bg-emerald-800/60 hover:bg-emerald-700 text-emerald-100 text-xs font-semibold flex items-center space-x-1">
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add User</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-emerald-400 uppercase font-bold text-[10px] tracking-wider border-b border-emerald-800/60 pb-3">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Assigned Role</th>
                  <th className="py-3 px-4">Assigned Club</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/40">
                {users.map(u => (
                  <tr key={u.user_id} className="hover:bg-emerald-900/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center space-x-2">
                      <img src={u.avatar} alt="User Avatar" className="w-6 h-6 rounded-full object-cover" />
                      <span>{u.name}</span>
                    </td>
                    <td className="py-3 px-4 text-emerald-300/80 font-mono">{u.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-bold text-[10px]">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-emerald-200">{u.club_name || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SYSTEM AUDIT TRAIL LOGS */}
      {activeAdminTab === 'logs' && (
        <div className="p-6 rounded-2xl glass-panel border border-emerald-800/40 space-y-4">
          <h3 className="font-bold text-white text-base">Immutable System Audit Logs</h3>
          
          <div className="space-y-2">
            {auditLogs.map(log => (
              <div key={log.log_id} className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-xs flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-emerald-300">{log.user_name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-900/60 px-1.5 py-0.2 rounded">{log.action}</span>
                    <span className="text-emerald-200 font-semibold">{log.entity}: {log.entity_id}</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/70">{log.details}</p>
                </div>
                <span className="text-[10px] text-emerald-400/60 font-mono shrink-0 ml-4">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
