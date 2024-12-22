import React from 'react';
import { Bell, User, Menu, RefreshCw, MessageSquare, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="h-[50px] bg-[#009688] text-white flex items-center justify-between px-4 fixed w-full top-0 z-50 shadow-md">
      <div className="flex items-center space-x-2">
        <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-[#00877a] rounded transition-colors"
          title="侧边伸缩"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button 
          className="p-2 hover:bg-[#00877a] rounded transition-colors"
          title="刷新"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
        <span className="text-base">运营平台</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-[#00877a] rounded transition-colors">
          <MessageSquare className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-[#00877a] rounded transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-[#00877a] px-3 py-2 rounded transition-colors">
          <User className="w-5 h-5" />
          <span>pgadm</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
};

export default Header;
