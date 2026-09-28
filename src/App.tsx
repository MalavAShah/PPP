import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { ClubPortal } from './pages/ClubPortal';
import { AuditorDesk } from './pages/AuditorDesk';
import { InstitutionalDashboard } from './pages/InstitutionalDashboard';
import { AdminPanel } from './pages/AdminPanel';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#071510] text-gray-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-emerald-950">
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="transition-all duration-300">
          {activeTab === 'home' && (
            <LandingPage 
              setActiveTab={setActiveTab} 
              onOpenRegisterModal={() => {
                setActiveTab('club');
                setIsRegisterModalOpen(true);
              }} 
            />
          )}

          {activeTab === 'directory' && <DirectoryPage />}

          {activeTab === 'club' && (
            <ClubPortal 
              isRegisterModalOpen={isRegisterModalOpen} 
              setIsRegisterModalOpen={setIsRegisterModalOpen} 
            />
          )}

          {activeTab === 'auditor' && <AuditorDesk />}

          {activeTab === 'dashboard' && <InstitutionalDashboard />}

          {activeTab === 'admin' && <AdminPanel />}
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
