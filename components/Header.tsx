import React from 'react';
import { RefreshCw, Mail } from 'lucide-react';

interface HeaderProps {
  activeTab: 'news' | 'launches';
  setActiveTab: (tab: 'news' | 'launches') => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onSubscribeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onRefresh, isRefreshing, onSubscribeClick }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 glass-morphism">
      {/* Top Bar: Logo & Actions */}
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between relative overflow-hidden">
        {/* Grid Texture Overlay for Header */}
        <div className="absolute inset-0 header-texture pointer-events-none opacity-30"></div>

        {/* Logo */}
        <div className="flex flex-col relative z-10 cursor-pointer group mr-4">
          <h1 className="font-tech text-3xl sm:text-4xl font-black tracking-tighter text-white group-hover:text-cyan-400 transition-colors duration-300 relative">
            GRID<span className="text-cyan-500">7</span>
            {/* Scanner Effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
          </h1>
          <span className="text-[0.5rem] sm:text-[0.6rem] text-gray-500 uppercase tracking-[0.3em] -mt-1 ml-1 group-hover:text-cyan-300 transition-colors">
            Future Intelligence
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3 relative z-10">
           <button 
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 sm:p-3 rounded-full bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 transition-all"
            aria-label="Refresh"
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin text-cyan-500' : ''} />
          </button>
          
          {/* Subscribe Button - Visible on all screens, text hidden on mobile */}
          <button 
            onClick={onSubscribeClick}
            className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-xs font-mono py-2 px-3 sm:py-3 sm:px-5 rounded-lg transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <Mail size={16} />
            <span className="hidden sm:inline">SUBSCRIBE</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-8 sm:space-x-12 pb-0 relative z-10 border-t border-white/5">
        <button
          onClick={() => setActiveTab('news')}
          className={`pt-3 pb-3 text-[0.65rem] sm:text-xs font-bold tracking-[0.2em] uppercase border-t-2 transition-all duration-300 ${
            activeTab === 'news' 
              ? 'border-cyan-500 text-white' 
              : 'border-transparent text-gray-600 hover:text-gray-300'
          }`}
        >
          Top Stories
        </button>
        <button
          onClick={() => setActiveTab('launches')}
          className={`pt-3 pb-3 text-[0.65rem] sm:text-xs font-bold tracking-[0.2em] uppercase border-t-2 transition-all duration-300 ${
            activeTab === 'launches' 
              ? 'border-emerald-500 text-white' 
              : 'border-transparent text-gray-600 hover:text-gray-300'
          }`}
        >
          Upcoming Launches
        </button>
      </div>
    </header>
  );
};

export default Header;