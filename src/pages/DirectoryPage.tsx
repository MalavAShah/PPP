import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventItem, Certificate } from '../types';
import { 
  Award, 
  Search, 
  Filter, 
  Calendar, 
  Building2, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  FileCheck,
  X,
  Printer,
  Download
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

interface DirectoryPageProps {
  onVerifyId?: string;
}

export const DirectoryPage: React.FC<DirectoryPageProps> = ({ onVerifyId }) => {
  const { events, certificates } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClub, setSelectedClub] = useState<string>('ALL');
  const [selectedCertLevel, setSelectedCertLevel] = useState<string>('ALL');
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null);
  const [verificationInput, setVerificationInput] = useState(onVerifyId || '');
  const [verifiedCert, setVerifiedCert] = useState<Certificate | null>(null);
  const [verificationSearched, setVerificationSearched] = useState(false);

  // Filter only certified / audited events for public directory
  const certifiedEvents = events.filter(e => e.status === 'CERTIFIED' || e.status === 'AUDITED');

  const filteredEvents = certifiedEvents.filter(e => {
    const matchesSearch = e.event_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.club_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClub = selectedClub === 'ALL' || e.club_id === selectedClub;
    const matchesCert = selectedCertLevel === 'ALL' || e.certification_level === selectedCertLevel;
    return matchesSearch && matchesClub && matchesCert;
  });

  const handleVerifySearch = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationSearched(true);
    const found = certificates.find(c => 
      c.certificate_id.toLowerCase() === verificationInput.trim().toLowerCase() ||
      c.verification_code.toLowerCase() === verificationInput.trim().toLowerCase()
    );
    setVerifiedCert(found || null);
  };

  const getBadgeClass = (level?: string) => {
    if (level === 'PLATINUM') return 'badge-platinum';
    if (level === 'GOLD') return 'badge-gold';
    if (level === 'SILVER') return 'badge-silver';
    return 'badge-below';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Institutional Public Registry</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Certified Green Events Directory
        </h1>
        <p className="max-w-2xl mx-auto text-sm text-emerald-200/70">
          Official repository of audited student-led events at KJSIM with verified Green Scores and digital certificates.
        </p>
      </div>

      {/* Verification Lookup Tool */}
      <div className="p-6 rounded-2xl glass-panel border border-emerald-600/40 space-y-4 max-w-3xl mx-auto">
        <div className="flex items-center space-x-2 text-emerald-300 font-bold text-sm">
          <QrCode className="w-5 h-5 text-emerald-400" />
          <span>Verify Certificate Authenticity</span>
        </div>
        <form onSubmit={handleVerifySearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Certificate ID (e.g. GECF-2026-001) or Verification Code..."
            value={verificationInput}
            onChange={(e) => setVerificationInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-white placeholder-emerald-400/50 text-sm focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm transition-colors flex items-center space-x-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify</span>
          </button>
        </form>

        {verificationSearched && (
          <div className="pt-3 border-t border-emerald-800/40">
            {verifiedCert ? (
              <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-500/50 flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-emerald-200 text-sm">✅ CERTIFICATE VALID</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] ${getBadgeClass(verifiedCert.certification_level)}`}>
                      {verifiedCert.certification_level}
                    </span>
                  </div>
                  <p className="text-emerald-100 font-bold text-sm">{verifiedCert.event_name}</p>
                  <p className="text-emerald-300/80">Organized by: {verifiedCert.club_name} | Date: {verifiedCert.event_date}</p>
                  <p className="text-emerald-300/80">Green Score: <strong>{verifiedCert.score}/100</strong> | Certificate ID: {verifiedCert.certificate_id}</p>
                  <p className="text-[11px] text-emerald-400/70 pt-1">Audited and Verified by GECF Committee ({verifiedCert.auditor_name})</p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2">
                <span>❌ Certificate ID not found or unverified. Please check code.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl glass-card border border-emerald-800/40 flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search event or club name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-white placeholder-emerald-400/50 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center space-x-1 text-xs text-emerald-300">
            <Filter className="w-3.5 h-3.5" />
            <span>Club:</span>
          </div>
          <select
            value={selectedClub}
            onChange={(e) => setSelectedClub(e.target.value)}
            className="px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700/60 text-emerald-200 text-xs focus:outline-none"
          >
            <option value="ALL">All Clubs</option>
            <option value="club-mkt">Marketing Club (MCA)</option>
            <option value="club-fin">Finance Club (FIMC)</option>
            <option value="club-ops">Operations Club (OASIS)</option>
            <option value="club-ecell">E-Cell</option>
            <option value="club-read">READ Club</option>
            <option value="club-talkies">Talkies Club</option>
          </select>

          <select
            value={selectedCertLevel}
            onChange={(e) => setSelectedCertLevel(e.target.value)}
            className="px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700/60 text-emerald-200 text-xs focus:outline-none"
          >
            <option value="ALL">All Certifications</option>
            <option value="PLATINUM">Platinum (90-100)</option>
            <option value="GOLD">Gold (75-89)</option>
            <option value="SILVER">Silver (60-74)</option>
          </select>
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full text-center py-16 p-8 glass-card rounded-2xl space-y-3">
            <Award className="w-12 h-12 text-emerald-500/40 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Certified Events Match Criteria</h3>
            <p className="text-xs text-emerald-300/60">Try adjusting your search query or club filter.</p>
          </div>
        ) : (
          filteredEvents.map(evt => (
            <div
              key={evt.event_id}
              onClick={() => setSelectedEventModal(evt)}
              className="rounded-2xl glass-card glass-card-hover border border-emerald-800/40 cursor-pointer overflow-hidden flex flex-col justify-between group transition-all"
            >
              {/* Event Image Banner */}
              {evt.image_url ? (
                <div className="relative h-44 w-full overflow-hidden bg-emerald-950">
                  <img
                    src={evt.image_url}
                    alt={evt.event_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getBadgeClass(evt.certification_level)}`}>
                      {evt.certification_level || 'AUDITED'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-mono text-emerald-300 font-semibold bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-800 shadow">
                      ID: {evt.event_id}
                    </span>
                  </div>
                </div>
              ) : null}

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  {!evt.image_url && (
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getBadgeClass(evt.certification_level)}`}>
                        {evt.certification_level || 'AUDITED'}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        ID: {evt.event_id}
                      </span>
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors">
                    {evt.event_name}
                  </h3>

                  <div className="space-y-1 text-xs text-emerald-200/70 mt-2">
                    <p className="flex items-center space-x-1.5">
                      <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{evt.club_name}</span>
                    </p>
                    <p className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{evt.date} • {evt.venue}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-emerald-800/40 flex items-center justify-between mt-3">
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase font-semibold block">Green Score</span>
                    <span className="text-2xl font-black text-white">{evt.green_score} <span className="text-xs font-normal text-emerald-400">/ 100</span></span>
                  </div>

                  <button className="px-3 py-1.5 rounded-lg bg-emerald-800/60 hover:bg-emerald-700 text-emerald-100 text-xs font-semibold flex items-center space-x-1 transition-colors">
                    <span>Scorecard</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Event Details & Certificate Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl glass-panel border border-emerald-600/60 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedEventModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Event Banner in Modal */}
            {selectedEventModal.image_url && (
              <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-emerald-700/60 shadow-lg">
                <img
                  src={selectedEventModal.image_url}
                  alt={selectedEventModal.event_name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/30 to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs text-emerald-200 font-semibold drop-shadow">
                  {selectedEventModal.event_type} • {selectedEventModal.venue}
                </div>
              </div>
            )}

            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getBadgeClass(selectedEventModal.certification_level)}`}>
                  {selectedEventModal.certification_level} CERTIFIED
                </span>
                <span className="text-xs text-emerald-400 font-mono">Event ID: {selectedEventModal.event_id}</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{selectedEventModal.event_name}</h2>
              <p className="text-xs text-emerald-300">{selectedEventModal.club_name} | Date: {selectedEventModal.date}</p>
            </div>


            {/* Score Summary Box */}
            <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-700/50 flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-300/70 font-medium block">Audited Green Score</span>
                <span className="text-3xl font-extrabold text-white">{selectedEventModal.green_score} / 100</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-emerald-300/70 font-medium block">Auditor</span>
                <span className="text-xs font-bold text-emerald-200">{selectedEventModal.auditor_name || 'Dr. Priya Sundaram'}</span>
              </div>
            </div>

            {/* Event Specifications */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800">
                <span className="text-emerald-400/70 block">Actual Attendance</span>
                <span className="font-bold text-white text-sm">{selectedEventModal.actual_attendance || selectedEventModal.expected_attendance} Attendees</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800">
                <span className="text-emerald-400/70 block">Catering Vendor</span>
                <span className="font-bold text-white text-sm">{selectedEventModal.catering_vendor}</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800">
                <span className="text-emerald-400/70 block">Waste Plan</span>
                <span className="font-bold text-white text-sm">{selectedEventModal.waste_management_plan}</span>
              </div>
            </div>

            {/* Certificate Preview Card */}
            <div className="p-6 rounded-2xl certificate-border text-center space-y-4 shadow-2xl relative">
              <div className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                KJ SOMAIYA INSTITUTE OF MANAGEMENT — GECF
              </div>
              <h3 className="text-xl font-serif text-amber-200">Green Event Certificate of Excellence</h3>
              <p className="text-xs text-emerald-100/80">This certifies that event <strong>{selectedEventModal.event_name}</strong> organized by <strong>{selectedEventModal.club_name}</strong> achieved an audited score of <strong>{selectedEventModal.green_score}/100</strong> and earned <strong>{selectedEventModal.certification_level}</strong> certification.</p>
              
              <div className="flex items-center justify-center space-x-6 pt-2">
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <QRCodeCanvas 
                    value={`https://gecf.somaiya.edu/verify/${selectedEventModal.event_id}`} 
                    size={80}
                  />
                </div>
                <div className="text-left text-xs text-emerald-200/80 space-y-1">
                  <p>Certificate ID: <strong className="text-amber-300 font-mono">GECF-2026-{(selectedEventModal.event_id).slice(-3)}</strong></p>
                  <p>Status: <strong className="text-emerald-400">✅ Verified</strong></p>
                  <p className="text-[10px] text-emerald-400/60">Scan QR to verify on public ledger</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setSelectedEventModal(null)}
                className="px-5 py-2 rounded-xl glass-card text-emerald-200 text-xs font-semibold hover:bg-emerald-900/60"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
