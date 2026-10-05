import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventItem, Criterion, EventStatus, Evidence } from '../types';
import { 
  Plus, 
  FileCheck2, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  X, 
  ChevronRight, 
  ArrowLeft,
  Calendar,
  Building2,
  Trash2,
  Utensils,
  ShoppingBag,
  Users,
  Lightbulb,
  ShieldAlert,
  Eye,
  Award,
  Image as ImageIcon
} from 'lucide-react';

const PRESET_EVENT_IMAGES = [
  { name: 'Eco Conclave', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80' },
  { name: 'Green Hackathon', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80' },
  { name: 'Ventures Summit', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80' },
  { name: 'Eco-Cultural Fest', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80' },
];

interface ClubPortalProps {
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (open: boolean) => void;
}

export const ClubPortal: React.FC<ClubPortalProps> = ({ isRegisterModalOpen, setIsRegisterModalOpen }) => {
  const { 
    currentUser, 
    events, 
    criteria, 
    categories, 
    responses, 
    evidenceList, 
    createEvent, 
    submitEventResponse, 
    uploadEvidence 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'my_events' | 'checklist'>('my_events');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(events[0]?.event_id || null);

  // Registration Form State
  const [regStep, setRegStep] = useState(1);
  const [formData, setFormData] = useState({
    event_name: '',
    club_id: currentUser.club_id || 'club-mkt',
    club_name: currentUser.club_name || 'Marketing Club (MCA)',
    event_type: 'Conclave / Summit',
    date: '2026-10-15',
    time: '10:00 AM - 05:00 PM',
    venue: 'SIMSR Main Auditorium',
    coordinator_name: currentUser.name,
    coordinator_contact: '+91 98200 12345',
    expected_attendance: 250,
    food_requirement: 'Snacks & Beverages catering for 250 attendees.',
    catering_vendor: 'Campus Green Catering',
    decor_requirements: 'Digital LED screens and rented potted plants.',
    printing_requirements: 'Zero paper printing. Digital QR passes.',
    material_requirements: 'Jute delegate bags and seed pencils.',
    waste_management_plan: '3-bin waste segregation + biogas plant transfer.',
    water_arrangements: '50L water dispensers with copper cups.',
    intended_categories: ['cat-waste', 'cat-food', 'cat-paper', 'cat-procurement', 'cat-social', 'cat-innovation'],
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'
  });

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulated Evidence File Upload State
  const [selectedCritForUpload, setSelectedCritForUpload] = useState<Criterion | null>(null);
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadFileType, setUploadFileType] = useState<Evidence['file_type']>('image');

  // Filter user's club events (or all for demo/admin)
  const myEvents = currentUser.role === 'ADMIN' 
    ? events 
    : events.filter(e => e.club_id === currentUser.club_id || e.coordinator_name === currentUser.name || currentUser.role === 'CLUB_ORGANIZER');

  const selectedEvent = events.find(e => e.event_id === selectedEventId) || myEvents[0] || events[0];

  // Stats
  const totalEvents = myEvents.length;
  const submittedEvents = myEvents.filter(e => e.status === 'SUBMITTED' || e.status === 'UNDER_REVIEW').length;
  const certifiedEventsCount = myEvents.filter(e => e.status === 'CERTIFIED').length;
  const avgScore = myEvents.filter(e => e.green_score).reduce((acc, e) => acc + (e.green_score || 0), 0) / (myEvents.filter(e => e.green_score).length || 1);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEvent(formData);
    setIsRegisterModalOpen(false);
    setRegStep(1);
    // Reset form defaults
    setFormData(prev => ({ ...prev, event_name: '' }));
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCritForUpload || !selectedEventId || !uploadFileName) return;

    const mockUrl = uploadFileType === 'image' 
      ? 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80';

    uploadEvidence(selectedEventId, selectedCritForUpload.criterion_id, uploadFileName, uploadFileType, mockUrl);
    setSelectedCritForUpload(null);
    setUploadFileName('');
  };

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case 'DRAFT': return <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">Draft</span>;
      case 'SUBMITTED': return <span className="px-2.5 py-0.5 rounded-full bg-blue-900/60 text-blue-300 text-xs font-semibold border border-blue-700">Submitted</span>;
      case 'UNDER_REVIEW': return <span className="px-2.5 py-0.5 rounded-full bg-amber-900/60 text-amber-300 text-xs font-semibold border border-amber-700">Under Review</span>;
      case 'EVIDENCE_REQUIRED': return <span className="px-2.5 py-0.5 rounded-full bg-red-900/60 text-red-300 text-xs font-semibold border border-red-700">Evidence Required</span>;
      case 'AUDITED': return <span className="px-2.5 py-0.5 rounded-full bg-teal-900/60 text-teal-300 text-xs font-semibold border border-teal-700">Audited</span>;
      case 'CERTIFIED': return <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-semibold border border-emerald-500">Certified</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & New Event Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">Club Governance Hub</span>
          <h1 className="text-3xl font-extrabold text-white">Club Organizer Portal</h1>
          <p className="text-xs text-emerald-200/70">Manage event proposals, complete GECF checklists, and upload audit evidence.</p>
        </div>

        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-emerald-950 font-extrabold text-sm shadow-lg flex items-center space-x-2 transition-transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>+ Register New Event</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-emerald-800/40">
          <span className="text-xs text-emerald-300/70 font-medium block">Total Registered</span>
          <span className="text-2xl font-extrabold text-white">{totalEvents}</span>
        </div>
        <div className="p-4 rounded-2xl glass-card border border-emerald-800/40">
          <span className="text-xs text-emerald-300/70 font-medium block">Submitted / Review</span>
          <span className="text-2xl font-extrabold text-blue-400">{submittedEvents}</span>
        </div>
        <div className="p-4 rounded-2xl glass-card border border-emerald-800/40">
          <span className="text-xs text-emerald-300/70 font-medium block">Certified Events</span>
          <span className="text-2xl font-extrabold text-emerald-400">{certifiedEventsCount}</span>
        </div>
        <div className="p-4 rounded-2xl glass-card border border-emerald-800/40">
          <span className="text-xs text-emerald-300/70 font-medium block">Avg Green Score</span>
          <span className="text-2xl font-extrabold text-amber-400">{isNaN(avgScore) ? '0' : avgScore.toFixed(1)} <span className="text-xs font-normal text-emerald-400">/100</span></span>
        </div>
        <div className="p-4 rounded-2xl glass-card border border-emerald-800/40">
          <span className="text-xs text-emerald-300/70 font-medium block">Active Club</span>
          <span className="text-xs font-bold text-emerald-200 truncate block mt-2">{currentUser.club_name || 'MCA Club'}</span>
        </div>
      </div>

      {/* Tabs Switcher: My Events vs Checklist */}
      <div className="flex border-b border-emerald-900/60 space-x-6 text-sm font-semibold">
        <button
          onClick={() => setActiveSubTab('my_events')}
          className={`pb-3 transition-colors border-b-2 flex items-center space-x-2 ${
            activeSubTab === 'my_events' 
              ? 'border-emerald-400 text-emerald-300' 
              : 'border-transparent text-emerald-200/50 hover:text-emerald-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>My Registered Events ({myEvents.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('checklist')}
          className={`pb-3 transition-colors border-b-2 flex items-center space-x-2 ${
            activeSubTab === 'checklist' 
              ? 'border-emerald-400 text-emerald-300' 
              : 'border-transparent text-emerald-200/50 hover:text-emerald-200'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Green Event Dynamic Checklist & Evidence</span>
        </button>
      </div>

      {/* SUB TAB 1: MY EVENTS TABLE */}
      {activeSubTab === 'my_events' && (
        <div className="p-6 rounded-2xl glass-panel border border-emerald-800/40 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-emerald-400 uppercase font-bold text-[10px] tracking-wider border-b border-emerald-800/60 pb-3">
                <tr>
                  <th className="py-3 px-4">Event Name</th>
                  <th className="py-3 px-4">Date & Venue</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Green Score</th>
                  <th className="py-3 px-4">Certification</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/40">
                {myEvents.map(evt => (
                  <tr key={evt.event_id} className="hover:bg-emerald-900/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        {evt.image_url ? (
                          <img src={evt.image_url} alt={evt.event_name} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-emerald-700/50 shadow-sm" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-emerald-900/60 border border-emerald-800 flex items-center justify-center shrink-0 text-emerald-400 font-bold text-xs">
                            {evt.event_name[0] || 'E'}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-white text-sm">{evt.event_name}</div>
                          <div className="text-[11px] text-emerald-300/60">{evt.club_name} • ID: {evt.event_id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-emerald-200/80">
                      <div>{evt.date}</div>
                      <div className="text-[11px] text-emerald-400/60">{evt.venue}</div>
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(evt.status)}</td>
                    <td className="py-4 px-4">
                      {evt.green_score ? (
                        <span className="font-extrabold text-sm text-white">{evt.green_score} / 100</span>
                      ) : (
                        <span className="text-emerald-400/50">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {evt.certification_level ? (
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          evt.certification_level === 'PLATINUM' ? 'badge-platinum' :
                          evt.certification_level === 'GOLD' ? 'badge-gold' :
                          evt.certification_level === 'SILVER' ? 'badge-silver' : 'badge-below'
                        }`}>
                          {evt.certification_level}
                        </span>
                      ) : (
                        <span className="text-emerald-400/50">Pending Audit</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedEventId(evt.event_id);
                          setActiveSubTab('checklist');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-800/60 hover:bg-emerald-700 text-emerald-100 text-xs font-semibold"
                      >
                        Manage Evidence
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB TAB 2: GREEN EVENT CHECKLIST & EVIDENCE UPLOAD */}
      {activeSubTab === 'checklist' && (
        <div className="space-y-6">
          
          {/* Event Selector Header */}
          <div className="p-4 rounded-2xl glass-card border border-emerald-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-xs text-emerald-300 font-semibold">Active Selected Event:</span>
              <select
                value={selectedEventId || ''}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-600 text-white font-bold text-sm focus:outline-none"
              >
                {myEvents.map(e => (
                  <option key={e.event_id} value={e.event_id}>{e.event_name} ({e.event_id})</option>
                ))}
              </select>
            </div>

            {selectedEvent && (
              <div className="flex items-center space-x-3 text-xs">
                <span>Status: {getStatusBadge(selectedEvent.status)}</span>
                {selectedEvent.green_score && (
                  <span className="font-bold text-amber-300">Score: {selectedEvent.green_score}/100</span>
                )}
              </div>
            )}
          </div>

          {/* Principle Warning Banner */}
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/40 text-amber-200 text-xs flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">GECF Governance Principle: No Evidence = No Marks</p>
              <p className="text-[11px] text-amber-300/80">Checking "Implemented" alone does not grant score points. You must upload high-resolution photographs, vendor receipts, or digital verification logs for the Green Audit Team to verify.</p>
            </div>
          </div>

          {/* 6 Category Checklists Accordion */}
          <div className="space-y-6">
            {categories.map(cat => {
              const catCriteria = criteria.filter(c => c.category_id === cat.category_id);

              return (
                <div key={cat.category_id} className="p-6 rounded-2xl glass-panel border border-emerald-800/50 space-y-4">
                  
                  <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                        {cat.category_name[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">{cat.category_name}</h3>
                        <p className="text-xs text-emerald-300/60">{cat.description}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-700">
                      Max Weight: {cat.weight} Points
                    </span>
                  </div>

                  {/* Criteria Items */}
                  <div className="space-y-4">
                    {catCriteria.map(crit => {
                      const key = `${selectedEvent?.event_id}_${crit.criterion_id}`;
                      const resp = responses[key];
                      const uploadedFiles = evidenceList.filter(ev => ev.event_id === selectedEvent?.event_id && ev.criterion_id === crit.criterion_id);
                      const isImplemented = resp?.response_value === 'YES';

                      return (
                        <div key={crit.criterion_id} className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/40 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-emerald-200 text-sm">{crit.title}</span>
                                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                                  Max: {crit.max_points} pts
                                </span>
                              </div>
                              <p className="text-xs text-emerald-300/70 mt-0.5">{crit.description}</p>
                            </div>

                            {/* Implementation Checkbox */}
                            <div className="flex items-center space-x-3 bg-emerald-900/40 p-2 rounded-lg border border-emerald-700/40">
                              <label className="flex items-center space-x-2 text-xs text-emerald-200 font-semibold cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isImplemented}
                                  onChange={(e) => submitEventResponse(selectedEvent.event_id, crit.criterion_id, e.target.checked ? 'YES' : 'NO')}
                                  className="w-4 h-4 rounded text-emerald-500 bg-emerald-950 border-emerald-700 focus:ring-emerald-500"
                                />
                                <span>{isImplemented ? '✅ Implemented' : '☐ Not Implemented'}</span>
                              </label>
                            </div>
                          </div>

                          {/* Requirement & Evidence Details */}
                          <div className="p-3 rounded-lg bg-emerald-900/20 text-xs space-y-1">
                            <p><strong className="text-emerald-300">Requirement:</strong> <span className="text-emerald-200/80">{crit.requirement}</span></p>
                            <p><strong className="text-emerald-300">Required Evidence:</strong> <span className="text-emerald-200/80">{crit.evidence_required}</span></p>
                          </div>

                          {/* Evidence Files List & Upload Trigger */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                            <div className="flex flex-wrap items-center gap-2">
                              {uploadedFiles.length === 0 ? (
                                <span className="text-xs text-amber-400/80 italic">No evidence uploaded yet</span>
                              ) : (
                                uploadedFiles.map(ev => (
                                  <div key={ev.evidence_id} className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-emerald-900/60 border border-emerald-700/50 text-[11px]">
                                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-100 font-mono truncate max-w-[120px]">{ev.file_name}</span>
                                    <span className={`px-1 rounded text-[9px] font-bold ${
                                      ev.status === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-300' :
                                      ev.status === 'REJECTED' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                                    }`}>
                                      {ev.status}
                                    </span>
                                  </div>
                                ))
                              )}
                            </div>

                            <button
                              onClick={() => setSelectedCritForUpload(crit)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold border border-emerald-500/40 flex items-center space-x-1.5 transition-colors"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Attach Evidence</span>
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* EVENT REGISTRATION MODAL WIZARD */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl glass-panel border border-emerald-600/60 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">GECF Proposal Wizard</span>
              <h2 className="text-2xl font-bold text-white">Register a New Sustainable Event</h2>
              <p className="text-xs text-emerald-300/70">Step {regStep} of 4</p>
            </div>

            {/* Step Progress Bar */}
            <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden flex">
              <div className={`h-full bg-emerald-400 transition-all ${
                regStep === 1 ? 'w-1/4' : regStep === 2 ? 'w-2/4' : regStep === 3 ? 'w-3/4' : 'w-full'
              }`} />
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              
              {/* STEP 1: EVENT INFO */}
              {regStep === 1 && (
                <div className="space-y-4 text-xs">
                  <h3 className="font-bold text-sm text-emerald-200">Step 1 — Event Basic Information</h3>
                  
                  <div className="space-y-1">
                    <label className="text-emerald-300 font-semibold">Event Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Annual Green Tech Conclave 2026"
                      value={formData.event_name}
                      onChange={(e) => setFormData({ ...formData, event_name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-emerald-300 font-semibold">Organizing Club</label>
                      <input
                        type="text"
                        disabled
                        value={formData.club_name}
                        className="w-full px-3 py-2 rounded-xl bg-emerald-900/40 border border-emerald-800 text-emerald-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-emerald-300 font-semibold">Event Type</label>
                      <select
                        value={formData.event_type}
                        onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-white focus:outline-none"
                      >
                        <option value="Conclave / Summit">Conclave / Summit</option>
                        <option value="Cultural Fest">Cultural Fest</option>
                        <option value="Hackathon / Contest">Hackathon / Contest</option>
                        <option value="Workshop / Seminar">Workshop / Seminar</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-emerald-300 font-semibold">Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-emerald-300 font-semibold">Time</label>
                      <input
                        type="text"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-emerald-300 font-semibold">Expected Attendance</label>
                      <input
                        type="number"
                        value={formData.expected_attendance}
                        onChange={(e) => setFormData({ ...formData, expected_attendance: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-emerald-300 font-semibold">Venue</label>
                    <input
                      type="text"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-white focus:outline-none"
                    />
                  </div>

                  {/* ADD IMAGE OPTION IN REGISTER EVENT */}
                  <div className="space-y-2 p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-800/60">
                    <div className="flex items-center justify-between">
                      <label className="text-emerald-300 font-bold flex items-center space-x-1.5">
                        <ImageIcon className="w-4 h-4 text-emerald-400" />
                        <span>Event Banner / Poster Image</span>
                      </label>
                      {formData.image_url && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image_url: '' })}
                          className="text-[11px] text-red-400 hover:text-red-300 font-medium"
                        >
                          Clear Image
                        </button>
                      )}
                    </div>

                    {/* Image Preview */}
                    {formData.image_url ? (
                      <div className="relative h-32 rounded-xl overflow-hidden border border-emerald-700/60 group">
                        <img src={formData.image_url} alt="Event Poster" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex items-end p-2.5">
                          <span className="text-white text-xs font-semibold drop-shadow">Poster Live Preview</span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-24 rounded-xl border-2 border-dashed border-emerald-800/80 bg-emerald-900/10 flex flex-col items-center justify-center text-emerald-400/60 text-xs">
                        <ImageIcon className="w-6 h-6 mb-1" />
                        <span>No image selected yet</span>
                      </div>
                    )}

                    {/* Image Upload from Device + Paste URL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <label className="px-3 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/60 text-emerald-200 text-xs font-semibold cursor-pointer flex items-center justify-center space-x-2 transition-colors">
                        <Upload className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Upload from Computer / Device</span>
                        <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                      </label>

                      <input
                        type="url"
                        placeholder="Or paste image URL (https://...)"
                        value={formData.image_url.startsWith('data:') ? '' : formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        className="px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Preset Themes Selector */}
                    <div className="pt-1">
                      <span className="text-[10px] text-emerald-400/80 font-semibold block mb-1.5">Or Pick a Curated Theme Poster:</span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {PRESET_EVENT_IMAGES.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setFormData({ ...formData, image_url: preset.url })}
                            className={`p-1 rounded-lg border text-center transition-all ${
                              formData.image_url === preset.url ? 'border-emerald-400 bg-emerald-800/50 shadow-sm' : 'border-emerald-800/60 hover:border-emerald-600 bg-emerald-950'
                            }`}
                          >
                            <img src={preset.url} alt={preset.name} className="w-full h-8 rounded object-cover mb-0.5" />
                            <span className="text-[9px] text-emerald-300 truncate block">{preset.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: EVENT PLANNING */}
              {regStep === 2 && (
                <div className="space-y-4 text-xs">
                  <h3 className="font-bold text-sm text-emerald-200">Step 2 — Event Operational Planning</h3>
                  
                  <div className="space-y-1">
                    <label className="text-emerald-300 font-semibold">Catering Vendor Information</label>
                    <input
                      type="text"
                      value={formData.catering_vendor}
                      onChange={(e) => setFormData({ ...formData, catering_vendor: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-emerald-300 font-semibold">Waste Management & Composting Plan</label>
                    <textarea
                      rows={2}
                      value={formData.waste_management_plan}
                      onChange={(e) => setFormData({ ...formData, waste_management_plan: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-emerald-300 font-semibold">Water Dispensing Arrangements</label>
                    <input
                      type="text"
                      value={formData.water_arrangements}
                      onChange={(e) => setFormData({ ...formData, water_arrangements: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: SUSTAINABILITY PLAN */}
              {regStep === 3 && (
                <div className="space-y-4 text-xs">
                  <h3 className="font-bold text-sm text-emerald-200">Step 3 — Target GECF Categories</h3>
                  <p className="text-emerald-300/70">Select the sustainability categories your club commits to target:</p>

                  <div className="grid grid-cols-2 gap-3">
                    {categories.map(cat => (
                      <label key={cat.category_id} className="p-3 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center space-x-3 cursor-pointer hover:border-emerald-500">
                        <input
                          type="checkbox"
                          checked={formData.intended_categories.includes(cat.category_id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, intended_categories: [...formData.intended_categories, cat.category_id] });
                            } else {
                              setFormData({ ...formData, intended_categories: formData.intended_categories.filter(id => id !== cat.category_id) });
                            }
                          }}
                          className="w-4 h-4 text-emerald-500 rounded bg-emerald-900 border-emerald-700"
                        />
                        <div>
                          <span className="font-bold text-white block">{cat.category_name}</span>
                          <span className="text-[10px] text-emerald-400">{cat.weight} Pts Weight</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW & SUBMIT */}
              {regStep === 4 && (
                <div className="space-y-4 text-xs">
                  <h3 className="font-bold text-sm text-emerald-200">Step 4 — Review & Lock Proposal</h3>
                  
                  <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-800 space-y-2">
                    {formData.image_url && (
                      <div className="h-28 w-full rounded-xl overflow-hidden border border-emerald-700/60 mb-3">
                        <img src={formData.image_url} alt="Event Review Poster" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <p><strong className="text-emerald-400">Event:</strong> {formData.event_name}</p>
                    <p><strong className="text-emerald-400">Club:</strong> {formData.club_name}</p>
                    <p><strong className="text-emerald-400">Date & Venue:</strong> {formData.date} at {formData.venue}</p>
                    <p><strong className="text-emerald-400">Expected Attendance:</strong> {formData.expected_attendance}</p>
                    <p><strong className="text-emerald-400">Target Categories:</strong> {formData.intended_categories.length} Categories Selected</p>
                  </div>

                  <p className="text-[11px] text-amber-300">🔒 Once submitted, your proposal will be locked and assigned to the Green Audit Team.</p>
                </div>
              )}

              {/* Modal Step Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-emerald-800/60">
                {regStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setRegStep(regStep - 1)}
                    className="px-4 py-2 rounded-xl glass-card text-emerald-200 text-xs font-semibold"
                  >
                    Back
                  </button>
                ) : <div />}

                {regStep < 4 ? (
                  <button
                    type="button"
                    disabled={!formData.event_name}
                    onClick={() => setRegStep(regStep + 1)}
                    className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-emerald-950 font-extrabold text-xs shadow-lg"
                  >
                    Submit Event Proposal
                  </button>
                )}
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ATTACH EVIDENCE MODAL */}
      {selectedCritForUpload && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md glass-panel border border-emerald-600/60 rounded-3xl p-6 space-y-4">
            <button
              onClick={() => setSelectedCritForUpload(null)}
              className="absolute top-4 right-4 text-emerald-400 hover:text-emerald-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-white text-base">Attach Objective Evidence</h3>
            <p className="text-xs text-emerald-300">Criterion: <strong>{selectedCritForUpload.title}</strong></p>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-emerald-300 font-semibold">File Description / Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. food_waste_weighing_receipt.jpg"
                  value={uploadFileName}
                  onChange={(e) => setUploadFileName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-emerald-300 font-semibold">File Format</label>
                <select
                  value={uploadFileType}
                  onChange={(e) => setUploadFileType(e.target.value as Evidence['file_type'])}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-white focus:outline-none"
                >
                  <option value="image">JPG / PNG Photograph</option>
                  <option value="pdf">PDF Document / Invoice</option>
                  <option value="spreadsheet">XLSX Spreadsheet</option>
                </select>
              </div>

              <div className="p-4 rounded-xl border-2 border-dashed border-emerald-700/60 text-center space-y-2 bg-emerald-950/40">
                <Upload className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="text-emerald-200/80 text-[11px]">Click or drag evidence document here to simulate upload</p>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCritForUpload(null)}
                  className="px-4 py-2 rounded-xl glass-card text-emerald-200 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs"
                >
                  Upload & Attach
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
