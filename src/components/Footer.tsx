import React from 'react';
import { ShieldCheck, Leaf, ExternalLink, Globe } from 'lucide-react';

export const Footer: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  return (
    <footer className="w-full border-t border-emerald-900/40 bg-emerald-950/90 text-emerald-300/80 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Institutional Info */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="font-bold text-white text-base">GECF Framework</span>
              <p className="text-[10px] text-emerald-400 uppercase font-semibold">KJ Somaiya Institute of Management</p>
            </div>
          </div>
          <p className="text-xs text-emerald-200/70 leading-relaxed">
            Standardized institutional sustainability governance operating system designed to measure, verify, benchmark, and continuously improve student-led events.
          </p>
          <div className="text-[11px] text-emerald-400/60 flex items-center space-x-1">
            <Globe className="w-3.5 h-3.5" />
            <span>Somaiya Vidyavihar University, Mumbai</span>
          </div>
        </div>

        {/* Col 2: Core Philosophy & PDCA */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Our Philosophy</h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center space-x-2 text-emerald-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span><strong>Measure</strong> → Objective data tracking</span>
            </li>
            <li className="flex items-center space-x-2 text-emerald-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span><strong>Verify</strong> → Auditor evidence review</span>
            </li>
            <li className="flex items-center space-x-2 text-emerald-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span><strong>Benchmark</strong> → Institutional standards</span>
            </li>
            <li className="flex items-center space-x-2 text-emerald-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span><strong>Improve</strong> → PDCA continuous cycle</span>
            </li>
          </ul>
        </div>

        {/* Col 3: Quick Navigation */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Portals</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('home')} className="hover:text-emerald-200 transition-colors">
                Landing Page & Framework
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('directory')} className="hover:text-emerald-200 transition-colors">
                Certified Events Directory
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('club')} className="hover:text-emerald-200 transition-colors">
                Club Organizer Portal
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('auditor')} className="hover:text-emerald-200 transition-colors">
                Green Auditor Desk
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('dashboard')} className="hover:text-emerald-200 transition-colors">
                Institutional Analytics
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: ISO 20121 Disclaimer Box */}
        <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-700/40 text-xs space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-bold">
            <Leaf className="w-4 h-4" />
            <span>ISO 20121 Alignment Disclaimer</span>
          </div>
          <p className="text-[11px] text-emerald-200/70 leading-relaxed">
            GECF is inspired by the principles of <strong>ISO 20121 (Event Sustainability Management Systems)</strong>, tailored specifically for university campus governance. GECF is an internal institutional certification framework and does not constitute a formal commercial ISO audit.
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-emerald-900/40 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/60">
        <p>© 2026 KJ Somaiya Institute of Management (KJSIM). Student Sustainability Governance Committee.</p>
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          <span className="hover:text-emerald-300">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-emerald-300">Institutional Guidelines</span>
          <span>•</span>
          <span className="hover:text-emerald-300">Support Desk</span>
        </div>
      </div>
    </footer>
  );
};
