import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-[#f3f3f4]">
      <div className="fixed left-0 top-0 h-full bg-[#2F4050] z-40">
        <Sidebar collapsed={sidebarCollapsed} />
      </div>
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header onToggleSidebar={toggleSidebar} />
        <main className="mt-[50px] p-4 mx-auto max-w-[1440px]">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
