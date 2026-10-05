import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Trash2, 
  Utensils, 
  FileText, 
  ShoppingBag, 
  Users, 
  Lightbulb, 
  CheckCircle2, 
  Award, 
  RefreshCw, 
  BarChart3, 
  AlertCircle, 
  Calendar,
  FileCheck,
  ChevronRight,
  TrendingUp,
  Leaf
} from 'lucide-react';

interface LandingPageProps {
  setActiveTab: (tab: string) => void;
  onOpenRegisterModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActiveTab, onOpenRegisterModal }) => {
  const { switchRoleWithProtection, weights, thresholds, events } = useApp();

  const certifiedCount = events.filter(e => e.status === 'CERTIFIED').length;
  const avgScore = events.filter(e => e.green_score).reduce((acc, e) => acc + (e.green_score || 0), 0) / (events.filter(e => e.green_score).length || 1);

  return (
    <div className="space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glow graphics */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-emerald-800/5 to-transparent blur-3xl pointer-events-none -z-10" />
        
        <div className="max-w-5xl mx-auto text-center space-y-8">
          
          {/* Institutional Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 text-xs font-semibold shadow-inner">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>KJ Somaiya Institute of Management (KJSIM), Mumbai</span>
            <span className="text-emerald-500">•</span>
            <span className="text-emerald-200/80">ISO 20121 Principles Inspired</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none">
            Make Every Event Count. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
              Sustainably.
            </span>
          </h1>

          {/* Subheading */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-200 tracking-wide">
              GECF — Green Event Certification Framework
            </h2>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-emerald-100/80 font-normal leading-relaxed">
              An institutional framework that helps KJ Somaiya Institute of Management measure, verify and continuously improve the environmental and social impact of student-led events.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                switchRoleWithProtection('CLUB_ORGANIZER', () => {
                  onOpenRegisterModal();
                });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-emerald-950 font-extrabold text-base shadow-lg shadow-emerald-900/40 transition-all transform hover:scale-[1.03] flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5 text-emerald-950" />
              <span>Register an Event</span>
            </button>

            <button
              onClick={() => setActiveTab('directory')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card hover:bg-emerald-800/40 text-emerald-100 font-semibold text-base transition-all border border-emerald-700/50 flex items-center justify-center space-x-2"
            >
              <span>Explore GECF Certified Events</span>
              <ArrowRight className="w-5 h-5 text-emerald-400" />
            </button>
          </div>

          {/* Workflow Ribbon Visual */}
          <div className="pt-10">
            <div className="p-4 rounded-2xl glass-panel border border-emerald-700/40 max-w-4xl mx-auto shadow-2xl">
              <p className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-4 text-center">
                Institutional GECF Workflow
              </p>
              <div className="grid grid-cols-5 gap-2 sm:gap-4 text-center">
                {[
                  { step: '01', title: 'PLAN', icon: Calendar, desc: 'Proposal & Strategy' },
                  { step: '02', title: 'EXECUTE', icon: Sparkles, desc: 'Green Action' },
                  { step: '03', title: 'VERIFY', icon: FileCheck, desc: 'Auditor Evidence Review' },
                  { step: '04', title: 'CERTIFY', icon: Award, desc: 'Green Score /100' },
                  { step: '05', title: 'IMPROVE', icon: RefreshCw, desc: 'PDCA Benchmarking' },
                ].map((item, idx) => (
                  <div key={item.step} className="relative group p-2 rounded-xl bg-emerald-950/60 border border-emerald-800/40 hover:border-emerald-500/50 transition-colors">
                    <item.icon className="w-5 h-5 text-emerald-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-mono text-emerald-400/70 block">STEP {item.step}</span>
                    <span className="text-xs font-bold text-white block">{item.title}</span>
                    <span className="text-[10px] text-emerald-300/60 hidden sm:block mt-0.5">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. WHY GECF? (THE PROBLEM & SOLUTION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800">
            Context & Challenge
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Why Does KJSIM Need GECF?
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-emerald-200/70">
            KJSIM hosts dozens of student-led events annually. Traditionally evaluated on turnout and sponsorship, environmental impact went unmeasured.
          </p>
        </div>

        {/* 4 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Single-Use Plastics',
              desc: 'Events often rely on disposable plastic bottles, food containers, and bags without tracking usage volume or disposal.',
              icon: Trash2,
              color: 'from-amber-500/20 to-red-500/10 border-red-500/30'
            },
            {
              title: 'Food Waste',
              desc: 'Food procurement and consumption quantities are rarely measured systematically, leading to unhandled surplus.',
              icon: Utensils,
              color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30'
            },
            {
              title: 'Excess Printing',
              desc: 'Registrations, event schedules, badges, and marketing posters rely unnecessarily on non-recycled paper.',
              icon: FileText,
              color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30'
            },
            {
              title: 'One-Time Décor',
              desc: 'Stage backdrop flex banners and plastic decorative items are discarded after a single 4-hour use.',
              icon: ShoppingBag,
              color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30'
            }
          ].map((card, i) => (
            <div key={i} className={`p-6 rounded-2xl glass-card border bg-gradient-to-b ${card.color} space-y-3`}>
              <card.icon className="w-8 h-8 text-emerald-300" />
              <h3 className="text-lg font-bold text-white">{card.title}</h3>
              <p className="text-xs text-emerald-100/70 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Highlight Banner */}
        <div className="mt-12 p-8 rounded-2xl glass-panel border border-emerald-600/40 text-center space-y-3 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            "The Problem Isn't Lack of Intent. It's Lack of Measurement."
          </h3>
          <p className="max-w-3xl mx-auto text-sm text-emerald-200/80 leading-relaxed">
            GECF bridges the gap by providing an objective governance framework that holds student committees accountable through evidence-backed auditing and institutional certification.
          </p>
        </div>
      </section>

      {/* 3. HOW GECF WORKS (5-STEP PROCESS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800">
            Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            How GECF Works
          </h2>
          <p className="text-sm text-emerald-300/70">
            Powered by the <strong>Plan–Do–Check–Act (PDCA)</strong> continuous improvement approach.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              step: '01',
              name: 'PLAN',
              title: 'Event Proposal & Sustainability Plan',
              desc: 'Organizing club registers the event on GECF portal and commits to sustainability measures across 6 categories.'
            },
            {
              step: '02',
              name: 'DO',
              title: 'Implement Sustainable Measures',
              desc: 'During execution, the club implements waste segregation, digital QR check-ins, bio-cutlery, and local vendor sourcing.'
            },
            {
              step: '03',
              name: 'DOCUMENT',
              title: 'Upload Objective Evidence',
              desc: 'Club uploads high-resolution photos, vendor invoices, compost receipts, attendance logs, and digital passes.'
            },
            {
              step: '04',
              name: 'VERIFY',
              title: 'Green Audit Team Review',
              desc: 'Assigned auditors evaluate uploaded evidence criterion by criterion. No Evidence = No Marks awarded.'
            },
            {
              step: '05',
              name: 'CERTIFY',
              title: 'Score Calculation & Digital Certificate',
              desc: 'System automatically calculates Green Score out of 100, assigns Platinum/Gold/Silver status, and generates a QR-verified certificate.'
            }
          ].map((item, idx) => (
            <div key={item.step} className="p-6 rounded-2xl glass-card border border-emerald-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center space-x-6">
                <span className="text-3xl sm:text-4xl font-black font-mono text-emerald-400/80 bg-emerald-950 px-4 py-2 rounded-xl border border-emerald-800">
                  {item.step}
                </span>
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">{item.name}</span>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-emerald-200/70 mt-1 max-w-2xl">{item.desc}</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-emerald-500 hidden md:block shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* 4. SIX GECF CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800">
            Evaluation Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Six Core GECF Categories
          </h2>
          <p className="text-sm text-emerald-300/70">
            Comprehensive sustainability criteria tailored specifically for university events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: '1. Waste Management',
              weight: '25 Points',
              icon: Trash2,
              examples: ['Waste segregation bins', 'Zero single-use plastic', 'Campus compost diversion', 'E-waste safe handling']
            },
            {
              title: '2. Food Sustainability',
              weight: '20 Points',
              icon: Utensils,
              examples: ['Demand-based meal planning', 'Bio-degradable/reusable cutlery', 'Surplus food NGO donation', 'Water refill stations']
            },
            {
              title: '3. Paper & Materials',
              weight: '15 Points',
              icon: FileText,
              examples: ['QR digital check-ins', 'Digital certificates & flyers', 'Reusable backdrop/banners', 'Zero paper brochures']
            },
            {
              title: '4. Sustainable Procurement',
              weight: '15 Points',
              icon: ShoppingBag,
              examples: ['Local vendors (<30km)', 'Plant sapling/wooden mementos', 'Fair-trade coffee & snacks', 'Responsible sourcing']
            },
            {
              title: '5. Social Sustainability',
              weight: '15 Points',
              icon: Users,
              examples: ['Universal wheelchair access', 'Gender inclusive panels', 'Participant safety & first-aid', 'Fair vendor treatment']
            },
            {
              title: '6. Innovation',
              weight: '10 Points',
              icon: Lightbulb,
              examples: ['Real-time carbon audit tool', 'Gamified participant green challenge', 'Novel eco-tech deployment', 'Measurable experiments']
            }
          ].map((cat, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass-card glass-card-hover space-y-4 border border-emerald-800/40">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 font-extrabold text-xs border border-emerald-700">
                  {cat.weight}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">{cat.title}</h3>

              <ul className="space-y-2 text-xs text-emerald-200/70 border-t border-emerald-800/40 pt-3">
                {cat.examples.map((ex, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SCORING SYSTEM & CERTIFICATION LEVELS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-emerald-600/40 space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Automated Scoring & Certification Engine
            </h2>
            <p className="text-sm text-emerald-200/70 max-w-2xl mx-auto">
              Total score is calculated out of 100 based strictly on verified auditor approvals. Organizers cannot manually alter final scores.
            </p>
          </div>

          {/* Scoring Weights Visualization */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
              <span>Category Weight Allocation (100 Points Total)</span>
              <span>Default Weights</span>
            </div>
            <div className="w-full h-8 rounded-xl bg-emerald-950 overflow-hidden flex p-1 gap-1 border border-emerald-800">
              <div style={{ width: `${weights.waste_management}%` }} className="bg-emerald-500 h-full rounded-lg flex items-center justify-center text-[10px] font-bold text-emerald-950" title="Waste Management (25%)">WM 25%</div>
              <div style={{ width: `${weights.food_sustainability}%` }} className="bg-teal-500 h-full rounded-lg flex items-center justify-center text-[10px] font-bold text-emerald-950" title="Food Sustainability (20%)">Food 20%</div>
              <div style={{ width: `${weights.paper_materials}%` }} className="bg-cyan-500 h-full rounded-lg flex items-center justify-center text-[10px] font-bold text-emerald-950" title="Paper & Materials (15%)">Paper 15%</div>
              <div style={{ width: `${weights.sustainable_procurement}%` }} className="bg-blue-500 h-full rounded-lg flex items-center justify-center text-[10px] font-bold text-white" title="Procurement (15%)">Proc 15%</div>
              <div style={{ width: `${weights.social_sustainability}%` }} className="bg-indigo-500 h-full rounded-lg flex items-center justify-center text-[10px] font-bold text-white" title="Social (15%)">Social 15%</div>
              <div style={{ width: `${weights.innovation}%` }} className="bg-amber-500 h-full rounded-lg flex items-center justify-center text-[10px] font-bold text-amber-950" title="Innovation (10%)">Inn 10%</div>
            </div>
          </div>

          {/* 4 Certification Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl glass-card border border-sky-500/40 text-center space-y-2">
              <span className="px-3 py-1 rounded-full badge-platinum text-xs inline-block">PLATINUM</span>
              <div className="text-3xl font-extrabold text-white">{thresholds.platinum}–100</div>
              <p className="text-xs text-sky-200/70">Exceptional institution-wide sustainability benchmark</p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-amber-500/40 text-center space-y-2">
              <span className="px-3 py-1 rounded-full badge-gold text-xs inline-block">GOLD</span>
              <div className="text-3xl font-extrabold text-white">{thresholds.gold}–{thresholds.platinum - 1}</div>
              <p className="text-xs text-amber-200/70">Strong adherence to green event protocols</p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-slate-500/40 text-center space-y-2">
              <span className="px-3 py-1 rounded-full badge-silver text-xs inline-block">SILVER</span>
              <div className="text-3xl font-extrabold text-white">{thresholds.silver}–{thresholds.gold - 1}</div>
              <p className="text-xs text-slate-200/70">Satisfactory baseline sustainability compliance</p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-red-500/40 text-center space-y-2">
              <span className="px-3 py-1 rounded-full badge-below text-xs inline-block">BELOW CERTIFICATION</span>
              <div className="text-3xl font-extrabold text-white">Below {thresholds.silver}</div>
              <p className="text-xs text-red-200/70">Requires corrective measures for future events</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. FINAL SECTION / CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
          "Every event leaves an impact."
        </h2>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-emerald-200/80 leading-relaxed">
          GECF helps KJSIM turn that impact into measurable data, verified action and continuous improvement.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              switchRoleWithProtection('CLUB_ORGANIZER', () => {
                onOpenRegisterModal();
              });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-emerald-950 font-extrabold text-base shadow-xl transition-all hover:scale-105"
          >
            Start a Green Event
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card hover:bg-emerald-800/40 text-emerald-100 font-semibold text-base transition-all border border-emerald-700/50"
          >
            View Certified Events
          </button>
        </div>
      </section>

    </div>
  );
};
