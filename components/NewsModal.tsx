import React, { useEffect, useState } from 'react';
import { NewsArticle, Category } from '../types';
import { X, Share2, ExternalLink, Calendar, Check, Search } from 'lucide-react';
import { CATEGORY_CONFIG, getRandomTechImage } from '../constants';

interface NewsModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ article, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>('');

  // Sync local image state with article prop
  useEffect(() => {
    if (article) {
      setImgSrc(article.imageUrl || '');
    }
  }, [article]);

  // Handle Back Button Logic
  useEffect(() => {
    if (article) {
      // 1. Push a new state to history when modal opens
      window.history.pushState({ modalOpen: true }, '', window.location.href);

      // 2. Define handler for popstate (Back button press)
      const handlePopState = () => {
        // When back is pressed, close the modal
        onClose();
      };

      // 3. Add event listener
      window.addEventListener('popstate', handlePopState);

      // Lock body scroll
      document.body.style.overflow = 'hidden';
      setIsCopied(false);

      // Cleanup
      return () => {
        window.removeEventListener('popstate', handlePopState);
        document.body.style.overflow = 'auto';
      };
    }
  }, [article, onClose]);

  // Wrapper for closing via UI button (X or Background)
  const handleManualClose = () => {
    if (window.history.state?.modalOpen) {
        window.history.back();
    } else {
        onClose();
    }
  };

  const handleShare = async () => {
    if (!article) return;

    const shareData = {
      title: article.title,
      text: article.summary,
      url: article.url && article.url !== '#' ? article.url : window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        console.warn("Share failed", err);
      }
    }

    try {
      await navigator.clipboard.writeText(`${article.title}\n${shareData.url}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
        alert("Could not copy link.");
    }
  };

  if (!article) return null;

  const theme = CATEGORY_CONFIG[article.category] || CATEGORY_CONFIG[Category.OTHER];
  
  // Determine link - fallback to search if URL is missing or '#'
  const activeUrl = (!article.url || article.url === '#') 
    ? `https://www.google.com/search?q=${encodeURIComponent(article.title + ' ' + article.source)}` 
    : article.url;

  // Logic to determine button state
  const isLaunch = article.source === 'Grid7 Timeline';
  const isSearchLink = isLaunch || (!article.url || article.url === '#' || article.url.includes('google.com/search'));

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={handleManualClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-dark-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        
        {/* Header Image Area */}
        <div className="relative h-64 sm:h-80 shrink-0 bg-dark-900">
          <img 
            src={imgSrc} 
            alt={article.title} 
            onError={() => setImgSrc(getRandomTechImage())}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-black/50"></div>
          
          <button 
            onClick={handleManualClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-cyan-500 text-white rounded-full transition-colors backdrop-blur-md z-10"
          >
            <X size={20} />
          </button>

           <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-dark-800 to-transparent">
             <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${theme.bg} ${theme.color} border border-white/5 mb-4`}>
                <theme.icon size={14} />
                <span className="text-xs font-bold uppercase tracking-wider">{article.category}</span>
             </div>
             <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight text-shadow-sm">
               {article.title}
             </h2>
           </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between text-sm text-gray-400 font-mono mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center space-x-4">
                    <span className="text-cyan-500 font-bold">{article.source}</span>
                    <span className="flex items-center"><Calendar size={14} className="mr-1"/> {new Date(article.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={handleShare}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all ${isCopied ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}
                    >
                        {isCopied ? <Check size={16} /> : <Share2 size={16} />}
                        {isCopied && <span className="text-xs font-bold">COPIED</span>}
                    </button>
                </div>
            </div>

            <div className="prose prose-invert prose-cyan max-w-none">
                <p className="text-lg text-gray-300 font-light leading-relaxed mb-6">
                    {article.summary}
                </p>
                <div className="text-gray-400 leading-7 space-y-4">
                     {article.content.split('\n').map((paragraph, idx) => (
                         <p key={idx}>{paragraph}</p>
                     ))}
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <a 
                    href={activeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 bg-white text-black hover:bg-cyan-500 transition-colors px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide ${isSearchLink ? 'hover:bg-blue-400' : ''}`}
                >
                    <span>{isSearchLink ? 'Search the Web' : 'Read Full Article'}</span>
                    {isSearchLink ? <Search size={16} /> : <ExternalLink size={16} />}
                </a>
            </div>
        </div>

      </div>
    </div>
  );
};

export default NewsModal;