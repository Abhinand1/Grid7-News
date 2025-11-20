import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import NewsModal from './components/NewsModal';
import Timeline from './components/Timeline';
import SplashScreen from './components/SplashScreen';
import SubscribeModal from './components/SubscribeModal';
import { CATEGORY_CONFIG, INITIAL_NEWS, UPCOMING_LAUNCHES } from './constants';
import { NewsArticle, Category } from './types';
import { fetchLiveNews } from './services/geminiService';
import { ArrowDown } from 'lucide-react';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<'news' | 'launches'>('news');
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);
  const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [visibleArticlesCount, setVisibleArticlesCount] = useState(6);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [hasAutoRefreshed, setHasAutoRefreshed] = useState(false);

  // Filter Logic
  const filteredArticles = useMemo(() => {
    if (activeCategory === Category.ALL) return articles;
    return articles.filter(a => a.category === activeCategory);
  }, [articles, activeCategory]);

  const visibleArticles = filteredArticles.slice(0, visibleArticlesCount);
  const hasMore = visibleArticlesCount < filteredArticles.length;

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
        const newArticles = await fetchLiveNews();
        if (newArticles.length > 0) {
             // Merge new articles at the top, removing duplicates based on title
             setArticles(prev => {
                 const combined = [...newArticles, ...prev];
                 const unique = Array.from(new Map(combined.map(item => [item.title, item])).values());
                 return unique;
             });
        }
    } catch (e) {
        console.error("Refresh failed", e);
    } finally {
        setIsRefreshing(false);
    }
  };

  // Auto-refresh once splash finishes or on first mount if no splash
  useEffect(() => {
    if (!showSplash && !hasAutoRefreshed) {
      setHasAutoRefreshed(true);
      handleRefresh();
    }
  }, [showSplash, hasAutoRefreshed]);

  const handleLoadMore = () => {
    setVisibleArticlesCount(prev => prev + 6);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* Background Elements */}
      <div className="perspective-container">
        <div className="perspective-grid"></div>
      </div>
      
      {/* Ambient Glows */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow z-0"></div>
      <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow z-0" style={{animationDelay: '2s'}}></div>

      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      <div className={`relative z-10 transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          onSubscribeClick={() => setIsSubscribeOpen(true)}
        />

        <main className="max-w-7xl mx-auto px-4 py-8 min-h-[calc(100vh-8rem)]">
          
          {/* News View */}
          {activeTab === 'news' && (
            <div className="animate-fade-in">
              {/* Redesigned Category Control Deck */}
              <div className="mb-10 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent h-px w-full top-1/2 -z-10"></div>
                <div className="flex flex-wrap gap-4 justify-center">
                  {Object.values(Category).map((cat) => {
                    const config = CATEGORY_CONFIG[cat];
                    const isActive = activeCategory === cat;
                    const Icon = config.icon;
                    
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                            setActiveCategory(cat);
                            setVisibleArticlesCount(6); // Reset pagination
                        }}
                        className={`relative group flex items-center space-x-2 px-6 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300 overflow-hidden ${
                          isActive 
                            ? `border-transparent text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] scale-105` 
                            : `bg-black/40 ${config.border} text-gray-400 hover:text-white hover:border-white/40`
                        }`}
                      >
                         {/* Active Gradient Background */}
                         {isActive && (
                           <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-100`}></div>
                         )}
                         
                         {/* Hover Glow for inactive */}
                         {!isActive && (
                            <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                         )}

                        <span className="relative z-10 flex items-center gap-2">
                            <Icon size={16} className={isActive ? 'text-white' : config.color} />
                            <span className={`text-sm font-bold tracking-wide uppercase ${isActive ? 'font-tech' : 'font-sans'}`}>{cat}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {visibleArticles.map((article, idx) => (
                  <div key={article.id} className="animate-slide-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <NewsCard 
                      article={article} 
                      onClick={() => setSelectedArticle(article)}
                    />
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {visibleArticles.length === 0 && (
                 <div className="text-center py-32 text-gray-500 border border-dashed border-white/10 rounded-xl mt-8">
                    <p className="font-mono text-lg">NO DATA FOUND IN SECTOR.</p>
                 </div>
              )}

              {/* Load More */}
              {hasMore && (
                <div className="flex justify-center mt-16">
                  <button 
                    onClick={handleLoadMore}
                    className="relative group overflow-hidden bg-dark-800 border border-white/10 px-10 py-4 rounded-full transition-all hover:border-cyan-500/50"
                  >
                    <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative flex items-center space-x-3 font-mono text-sm font-bold uppercase tracking-widest text-gray-300 group-hover:text-white">
                        <span>Load More News</span>
                        <ArrowDown size={16} className="text-cyan-500 group-hover:animate-bounce"/>
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Launches View */}
          {activeTab === 'launches' && (
            <div className="animate-fade-in">
              <Timeline events={UPCOMING_LAUNCHES} />
            </div>
          )}
        </main>

        <footer className="py-10 text-center border-t border-white/5 mt-12 bg-black/50 backdrop-blur-lg">
            <div className="flex justify-center space-x-6 mb-6">
                {/* Social placeholders could go here */}
            </div>
            <p className="text-gray-600 text-[10px] font-mono uppercase tracking-[0.2em]">
                Grid7 Intelligence Network &copy; {new Date().getFullYear()}
            </p>
            <p className="text-gray-700 text-[10px] font-mono mt-2">Designed by Abhinand</p>
        </footer>
      </div>

      {/* Modals */}
      <NewsModal 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
      />
      
      <SubscribeModal 
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        articles={articles}
      />
    </div>
  );
};

export default App;