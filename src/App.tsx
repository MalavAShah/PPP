import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { ClubPortal } from './pages/ClubPortal';
import { AuditorDesk } from './pages/AuditorDesk';
import { InstitutionalDashboard } from './pages/InstitutionalDashboard';
import { AdminPanel } from './pages/AdminPanel';
import { UserRole, ROLE_PASSWORDS } from './types';
import { Lock, Unlock, ShieldAlert, ArrowLeft, KeyRound } from 'lucide-react';

interface ProtectedPortalNoticeProps {
  requiredRole: Exclude<UserRole, 'PUBLIC'>;
  portalName: string;
  onBack: () => void;
}

const ProtectedPortalNotice: React.FC<ProtectedPortalNoticeProps> = ({
  requiredRole,
  portalName,
  onBack
}) => {
  const { switchRoleWithProtection } = useApp();
  const password = ROLE_PASSWORDS[requiredRole];

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-xl shadow-amber-950/40 animate-pulse">
        <Lock className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-600/40">
          Password Protected Portal
        </span>
        <h2 className="text-3xl font-extrabold text-white">
          {portalName} Access Restricted
        </h2>
        <p className="max-w-md mx-auto text-sm text-emerald-200/70">
          This portal requires official role credentials. Please enter the security password to unlock this module.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 max-w-sm mx-auto text-xs space-y-1 font-mono text-emerald-200">
        <div className="flex items-center justify-between">
          <span className="text-emerald-400">Required Role:</span>
          <span className="font-bold text-white">{requiredRole.replace('_', ' ')}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-emerald-400">Access Password:</span>
          <span className="font-bold text-amber-300 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/50">{password}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl glass-card hover:bg-emerald-900/60 text-emerald-200 text-xs font-semibold flex items-center justify-center space-x-1.5 border border-emerald-800/60"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <button
          onClick={() => switchRoleWithProtection(requiredRole)}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-emerald-950 font-bold text-xs shadow-lg shadow-emerald-950/50 flex items-center justify-center space-x-1.5"
        >
          <KeyRound className="w-4 h-4" />
          <span>Enter Password to Unlock</span>
        </button>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { currentUser, unlockedRoles, switchRoleWithProtection } = useApp();

  const handleOpenRegisterFromLanding = () => {
    switchRoleWithProtection('CLUB_ORGANIZER', () => {
      setActiveTab('club');
      setIsRegisterModalOpen(true);
    });
  };

  return (
    <div className="min-h-screen bg-[#071510] text-gray-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-emerald-950">
      <div>
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onOpenRegisterModal={handleOpenRegisterFromLanding}
        />

        <main className="transition-all duration-300">
          {activeTab === 'home' && (
            <LandingPage 
              setActiveTab={setActiveTab} 
              onOpenRegisterModal={handleOpenRegisterFromLanding} 
            />
          )}

          {activeTab === 'directory' && <DirectoryPage />}

          {activeTab === 'club' && (
            currentUser.role === 'CLUB_ORGANIZER' || currentUser.role === 'ADMIN' || unlockedRoles['CLUB_ORGANIZER'] ? (
              <ClubPortal 
                isRegisterModalOpen={isRegisterModalOpen} 
                setIsRegisterModalOpen={setIsRegisterModalOpen} 
              />
            ) : (
              <ProtectedPortalNotice 
                requiredRole="CLUB_ORGANIZER" 
                portalName="Club Organizer Portal" 
                onBack={() => setActiveTab('home')} 
              />
            )
          )}

          {activeTab === 'auditor' && (
            currentUser.role === 'AUDITOR' || currentUser.role === 'ADMIN' || unlockedRoles['AUDITOR'] ? (
              <AuditorDesk />
            ) : (
              <ProtectedPortalNotice 
                requiredRole="AUDITOR" 
                portalName="Green Auditor Desk" 
                onBack={() => setActiveTab('home')} 
              />
            )
          )}

          {activeTab === 'dashboard' && (
            currentUser.role === 'SUSTAINABILITY_COMMITTEE' || currentUser.role === 'ADMIN' || unlockedRoles['SUSTAINABILITY_COMMITTEE'] ? (
              <InstitutionalDashboard />
            ) : (
              <ProtectedPortalNotice 
                requiredRole="SUSTAINABILITY_COMMITTEE" 
                portalName="Institutional ESG Analytics" 
                onBack={() => setActiveTab('home')} 
              />
            )
          )}

          {activeTab === 'admin' && (
            currentUser.role === 'ADMIN' || unlockedRoles['ADMIN'] ? (
              <AdminPanel />
            ) : (
              <ProtectedPortalNotice 
                requiredRole="ADMIN" 
                portalName="System Administrator Panel" 
                onBack={() => setActiveTab('home')} 
              />
            )
          )}
        </main>
      </div>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
