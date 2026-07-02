import { useState } from 'react';
import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from '../../components/Dashboard/Topbar';
import { Outlet } from 'react-router-dom';
export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-[#0A0A0A] dark:text-gray-100 flex h-screen overflow-hidden transition-colors duration-200">
      <Sidebar isMobileOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Topbar openSidebar={() => setIsSidebarOpen(true)} />
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 animate-fade-in">
          <Outlet/>
        </div>
      </main>
    </div>
  );
}