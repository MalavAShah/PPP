import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventItem, Criterion, CertificationLevel } from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Eye, 
  FileText, 
  Award, 
  Lock, 
  ChevronRight,
  MessageSquare,
  Sparkles,
  Search,
  UserCheck
} from 'lucide-react';

export const AuditorDesk: React.FC = () => {
  const { 
    currentUser, 
    events, 
    categories, 
    criteria, 
    evidenceList, 
    responses, 
    reviewEvidence, 
    finalizeAudit 
  } = useApp();

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [auditorComments, setAuditorComments] = useState('');
  const [previewFile, setPreviewFile] = useState<{ url: string; name: string } | null>(null);
  const [rejectModal, setRejectModal] = useState<{ evidenceId: string } | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);

  // Filter events pending audit or audited
  const pendingAudits = events.filter(e => e.status === 'SUBMITTED' || e.status === 'UNDER_REVIEW' || e.status === 'EVIDENCE_REQUIRED');
  const completedAudits = events.filter(e => e.status === 'AUDITED' || e.status === 'CERTIFIED');

  const selectedEvent = events.find(e => e.event_id === selectedEventId);

  // Live score tally
  const calculateLiveScore = () => {
    if (!selectedEvent) return 0;
    let total = 0;
    Object.values(scores).forEach(val => {
      total += (val || 0);
    });
    return Math.min(100, Math.round(total));
  };

  const getCategoryScoreTally = (catId: string) => {
    const catCriteria = criteria.filter(c => c.category_id === catId);
    let earned = 0;
    let max = 0;
    catCriteria.forEach(crit => {
      earned += (scores[crit.criterion_id] || 0);
      max += crit.max_points;
    });
    return { earned, max };
  };

  const handleApproveCriterion = (crit: Criterion) => {
    setScores(prev => ({ ...prev, [crit.criterion_id]: crit.max_points }));
  };

  const handleRejectCriterion = (crit: Criterion) => {
    setScores(prev => ({ ...prev, [crit.criterion_id]: 0 }));
  };

  const handleScoreChange = (criterionId: string, val: number, max: number) => {
    const bounded = Math.max(0, Math.min(max, val));
    setScores(prev => ({ ...prev, [criterionId]: bounded }));
  };

  const handleFinalizeSubmit = () => {
    if (!selectedEventId) return;
    finalizeAudit(selectedEventId, scores, auditorComments);
    setShowFinalizeModal(false);
    setSelectedEventId(null);
  };

  const liveTotalScore = calculateLiveScore();
  let liveCertLevel: CertificationLevel = 'BELOW_CERTIFICATION';
  if (liveTotalScore >= 90) liveCertLevel = 'PLATINUM';
  else if (liveTotalScore >= 75) liveCertLevel = 'GOLD';
  else if (liveTotalScore >= 60) liveCertLevel = 'SILVER';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block">Institutional Compliance Desk</span>
          <h1 className="text-3xl font-extrabold text-white">Green Audit Team Interface</h1>
          <p className="text-xs text-emerald-200/70">Review submitted evidence, assign criterion points, and finalize GECF certifications.</p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-900/40 px-3 py-1.5 rounded-xl border border-emerald-700/50 text-xs">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-200">Auditor: <strong className="text-white">{currentUser.name}</strong></span>
        </div>
      </div>

      {/* Auditor KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-emerald-800/40">
          <span className="text-xs text-emerald-300/70 font-medium block">Pending Audits</span>
          <span className="text-2xl font-extrabold text-amber-400">{pendingAudits.length}</span>
        </div>
        <div className="p-4 rounded-2xl glass-card border border-emerald-800/40">
          <span className="text-xs text-emerald-300/70 font-medium block">Completed Audits</span>
          <span className="text-2xl font-extrabold text-emerald-400">{completedAudits.length}</span>
        </div>
        <div className="p-4 rounded-2xl glass-card border border-emerald-800/40">
          <span className="text-xs text-emerald-300/70 font-medium block">Evidence Pending</span>
          <span className="text-2xl font-extrabold text-cyan-400">
            {evidenceList.filter(e => e.status === 'PENDING').length}
          </span>
        </div>
        <div className="p-4 rounded-2xl glass-card border border-emerald-800/40">
          <span className="text-xs text-emerald-300/70 font-medium block">Platinum Issued</span>
          <span className="text-2xl font-extrabold text-sky-400">
            {events.filter(e => e.certification_level === 'PLATINUM').length}
          </span>
        </div>
        <div className="p-4 rounded-2xl glass-card border border-emerald-800/40">
          <span className="text-xs text-emerald-300/70 font-medium block">Gold Issued</span>
          <span className="text-2xl font-extrabold text-amber-300">
            {events.filter(e => e.certification_level === 'GOLD').length}
          </span>
        </div>
      </div>

      {/* MAIN LAYOUT: PENDING QUEUE vs LIVE AUDIT SCREEN */}
      {!selectedEvent ? (
        
        /* QUEUE TABLE */
        <div className="p-6 rounded-2xl glass-panel border border-emerald-800/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Pending Events Queue ({pendingAudits.length})</h3>
            <span className="text-xs text-emerald-300/60">Click "Review & Audit" to launch scoring screen</span>
          </div>

          {pendingAudits.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="font-bold text-white text-sm">All Audits Completed!</p>
              <p className="text-xs text-emerald-300/60">There are no pending events waiting for audit review.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-emerald-400 uppercase font-bold text-[10px] tracking-wider border-b border-emerald-800/60 pb-3">
                  <tr>
                    <th className="py-3 px-4">Event Name</th>
                    <th className="py-3 px-4">Club Name</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Evidence Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-900/40">
                  {pendingAudits.map(evt => {
                    const eventEvidence = evidenceList.filter(ev => ev.event_id === evt.event_id);
                    const pendingEvCount = eventEvidence.filter(ev => ev.status === 'PENDING').length;

                    return (
                      <tr key={evt.event_id} className="hover:bg-emerald-900/30 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-bold text-white text-sm">{evt.event_name}</div>
                          <div className="text-[11px] text-emerald-300/60">{evt.event_type} • ID: {evt.event_id}</div>
                        </td>
                        <td className="py-4 px-4 text-emerald-200">{evt.club_name}</td>
                        <td className="py-4 px-4 text-emerald-300/80">{evt.date}</td>
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-900/50 text-amber-300 font-semibold text-[11px]">
                            {eventEvidence.length} Files ({pendingEvCount} Pending)
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedEventId(evt.event_id);
                              // Initialize default full points for criteria with verified evidence
                              const initialScores: Record<string, number> = {};
                              criteria.forEach(crit => {
                                initialScores[crit.criterion_id] = crit.max_points;
                              });
                              setScores(initialScores);
                            }}
                            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs shadow-md transition-colors flex items-center space-x-1 ml-auto"
                          >
                            <span>Review & Audit</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      ) : (

        /* LIVE AUDIT SCREEN FOR SELECTED EVENT */
        <div className="space-y-6">
          
          {/* Back Button & Event Specs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-emerald-600/60">
            <div>
              <button
                onClick={() => setSelectedEventId(null)}
                className="text-xs text-emerald-400 hover:text-emerald-200 font-semibold mb-2 flex items-center space-x-1"
              >
                <span>← Back to Audit Queue</span>
              </button>
              <h2 className="text-2xl font-bold text-white">{selectedEvent.event_name}</h2>
              <p className="text-xs text-emerald-300">{selectedEvent.club_name} | Date: {selectedEvent.date} | Venue: {selectedEvent.venue}</p>
            </div>

            {/* Live Score Tally Box */}
            <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-center space-y-1 min-w-[200px] shadow-xl">
              <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest block">LIVE AUDIT SCORE</span>
              <div className="text-3xl font-black text-white">{liveTotalScore} <span className="text-xs font-normal text-emerald-400">/ 100</span></div>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold inline-block ${
                liveCertLevel === 'PLATINUM' ? 'badge-platinum' :
                liveCertLevel === 'GOLD' ? 'badge-gold' :
                liveCertLevel === 'SILVER' ? 'badge-silver' : 'badge-below'
              }`}>
                {liveCertLevel}
              </span>
            </div>
          </div>

          {/* Category Breakdown Score Tally Bar */}
          <div className="p-4 rounded-xl glass-card border border-emerald-800/40 grid grid-cols-2 sm:grid-cols-6 gap-3 text-center text-xs">
            {categories.map(cat => {
              const tally = getCategoryScoreTally(cat.category_id);
              return (
                <div key={cat.category_id} className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800">
                  <span className="text-[10px] text-emerald-400 font-bold block truncate">{cat.category_name}</span>
                  <span className="font-extrabold text-white text-sm">{tally.earned} / {tally.max}</span>
                </div>
              );
            })}
          </div>

          {/* 6 Category Auditing Accordion */}
          <div className="space-y-6">
            {categories.map(cat => {
              const catCriteria = criteria.filter(c => c.category_id === cat.category_id);

              return (
                <div key={cat.category_id} className="p-6 rounded-2xl glass-panel border border-emerald-800/50 space-y-4">
                  
                  <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3">
                    <h3 className="font-bold text-white text-base">{cat.category_name} (Max {cat.weight} Pts)</h3>
                    <span className="text-xs font-bold text-emerald-300">
                      Earned: {getCategoryScoreTally(cat.category_id).earned} / {cat.weight}
                    </span>
                  </div>

                  <div className="space-y-6">
                    {catCriteria.map(crit => {
                      const evFiles = evidenceList.filter(ev => ev.event_id === selectedEvent.event_id && ev.criterion_id === crit.criterion_id);
                      const currentAssignedScore = scores[crit.criterion_id] !== undefined ? scores[crit.criterion_id] : crit.max_points;

                      return (
                        <div key={crit.criterion_id} className="p-5 rounded-xl bg-emerald-950/70 border border-emerald-800/60 space-y-4">
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-white text-sm">{crit.title}</span>
                                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                                  Max: {crit.max_points} pts
                                </span>
                              </div>
                              <p className="text-xs text-emerald-300/70 mt-0.5">{crit.requirement}</p>
                            </div>

                            {/* Score Input Box */}
                            <div className="flex items-center space-x-2 bg-emerald-900/50 p-2 rounded-lg border border-emerald-700/50">
                              <span className="text-xs text-emerald-300 font-semibold">Assigned Points:</span>
                              <input
                                type="number"
                                min={0}
                                max={crit.max_points}
                                value={currentAssignedScore}
                                onChange={(e) => handleScoreChange(crit.criterion_id, parseInt(e.target.value) || 0, crit.max_points)}
                                className="w-16 px-2 py-1 rounded bg-emerald-950 border border-emerald-600 text-center font-bold text-white text-sm focus:outline-none"
                              />
                              <span className="text-xs text-emerald-400 font-bold">/ {crit.max_points}</span>
                            </div>
                          </div>

                          {/* Uploaded Evidence Files Review */}
                          <div className="p-3 rounded-lg bg-emerald-900/30 text-xs space-y-2 border border-emerald-800/40">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Submitted Evidence Files:</span>
                            {evFiles.length === 0 ? (
                              <p className="text-amber-400/80 italic">⚠️ No evidence attached by organizer. Mandatory principle: No Evidence = 0 Points.</p>
                            ) : (
                              <div className="space-y-2">
                                {evFiles.map(file => (
                                  <div key={file.evidence_id} className="flex flex-wrap items-center justify-between gap-2 p-2 rounded bg-emerald-950 border border-emerald-800">
                                    <div className="flex items-center space-x-2">
                                      <FileText className="w-4 h-4 text-emerald-400" />
                                      <span className="font-mono text-emerald-100">{file.file_name}</span>
                                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                        file.status === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-300' :
                                        file.status === 'REJECTED' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                                      }`}>
                                        {file.status}
                                      </span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={() => setPreviewFile({ url: file.file_url, name: file.file_name })}
                                        className="px-2 py-1 rounded bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200 text-[11px] flex items-center space-x-1"
                                      >
                                        <Eye className="w-3 h-3" />
                                        <span>Preview</span>
                                      </button>

                                      <button
                                        onClick={() => reviewEvidence(file.evidence_id, 'VERIFIED')}
                                        className="px-2 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-[11px] flex items-center space-x-1"
                                      >
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span>Approve</span>
                                      </button>

                                      <button
                                        onClick={() => {
                                          setRejectModal({ evidenceId: file.evidence_id });
                                        }}
                                        className="px-2 py-1 rounded bg-red-900/60 hover:bg-red-800 text-red-200 font-bold text-[11px] flex items-center space-x-1"
                                      >
                                        <XCircle className="w-3 h-3" />
                                        <span>Reject</span>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Auditor Overall Comments & Finalize Button */}
          <div className="p-6 rounded-2xl glass-panel border border-emerald-600/60 space-y-4">
            <h3 className="font-bold text-white text-base">Auditor Final Remarks</h3>
            <textarea
              rows={3}
              placeholder="Enter overall auditor notes, compliance remarks, and suggestions for future events..."
              value={auditorComments}
              onChange={(e) => setAuditorComments(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-emerald-950 border border-emerald-700 text-white placeholder-emerald-400/40 text-xs focus:outline-none focus:border-emerald-500"
            />

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-amber-300 flex items-center space-x-1">
                <Lock className="w-4 h-4" />
                <span>Once finalized, score and certification level are locked.</span>
              </div>

              <button
                onClick={() => setShowFinalizeModal(true)}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-emerald-950 font-extrabold text-sm shadow-xl transition-transform hover:scale-105"
              >
                Finalize Audit & Issue Certification
              </button>
            </div>
          </div>

        </div>
      )}

      {/* PREVIEW FILE MODAL */}
      {previewFile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl glass-panel border border-emerald-600/60 rounded-3xl p-6 space-y-4">
            <button
              onClick={() => setPreviewFile(null)}
              className="absolute top-4 right-4 text-emerald-400 hover:text-emerald-200"
            >
              ✕
            </button>
            <h3 className="font-bold text-white text-sm">{previewFile.name}</h3>
            <div className="rounded-xl overflow-hidden border border-emerald-800 bg-black max-h-[70vh]">
              <img src={previewFile.url} alt="Evidence Preview" className="w-full h-auto max-h-[60vh] object-contain mx-auto" />
            </div>
          </div>
        </div>
      )}

      {/* REJECT EVIDENCE MODAL */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md glass-panel border border-red-600/60 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-red-300 text-base">Reject Uploaded Evidence</h3>
            <p className="text-xs text-emerald-300">Specify reason for rejection so the organizing club can re-upload:</p>
            <textarea
              rows={3}
              required
              placeholder="e.g. Photo resolution too blurry / Catering invoice missing GST number..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-red-700 text-white text-xs focus:outline-none"
            />
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setRejectModal(null)}
                className="px-4 py-2 rounded-xl glass-card text-emerald-200 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  reviewEvidence(rejectModal.evidenceId, 'REJECTED', rejectionReason);
                  setRejectModal(null);
                  setRejectionReason('');
                }}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FINALIZE CONFIRMATION MODAL */}
      {showFinalizeModal && selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg glass-panel border border-emerald-500/60 rounded-3xl p-6 sm:p-8 space-y-6 text-center">
            <Sparkles className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Confirm Audit Finalization</h3>
              <p className="text-xs text-emerald-200/80">
                You are about to finalize the audit for <strong>{selectedEvent.event_name}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-700 space-y-1">
              <span className="text-xs text-emerald-400">Calculated Final Score</span>
              <div className="text-3xl font-black text-white">{liveTotalScore} / 100</div>
              <span className="text-xs font-bold text-amber-300 uppercase block">Certification: {liveCertLevel}</span>
            </div>

            <p className="text-[11px] text-amber-300">
              "Once finalized, this audit cannot be modified without administrator authorization."
            </p>

            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setShowFinalizeModal(false)}
                className="px-5 py-2.5 rounded-xl glass-card text-emerald-200 text-xs font-semibold"
              >
                Review Scores Again
              </button>
              <button
                onClick={handleFinalizeSubmit}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-xs shadow-lg"
              >
                Yes, Lock & Finalize Audit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
