import React, { useState } from 'react';
import { NewsArticle, Category } from '../types';
import { CATEGORY_CONFIG, getRandomTechImage } from '../constants';
import { Play, Pause, Share2, Check } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
  onClick: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [imgSrc, setImgSrc] = useState(article.imageUrl);
  
  const theme = CATEGORY_CONFIG[article.category] || CATEGORY_CONFIG[Category.OTHER];
  const Icon = theme.icon;

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(`${article.title}. ${article.summary}`);
    utterance.rate = 1.1;
    utterance.pitch = 1.0;
    
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const shareData = {
      title: article.title,
      text: article.summary,
      url: article.url || window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        console.warn("Share canceled or failed", err);
      }
    }

    try {
      await navigator.clipboard.writeText(`${article.title}\n${article.url || window.location.href}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard failed", err);
      alert("Could not copy link.");
    }
  };

  const getRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;
      if (isNaN(diffInHours)) return 'Recently';
      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
      return `${Math.floor(diffInHours / 24)}d ago`;
    } catch (e) {
      return 'Recently';
    }
  };

  return (
    <article 
      onClick={onClick}
      className="group relative flex flex-col bg-dark-800 border border-white/5 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-pointer h-full"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-dark-700">
        <img 
          src={imgSrc} 
          alt={article.title} 
          onError={() => setImgSrc(getRandomTechImage())}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent opacity-80"></div>
        
        {/* Score Badge */}
        {article.score && (
           <div className="absolute top-3 right-3 bg-cyan-500 text-black font-mono font-bold text-sm w-8 h-8 flex items-center justify-center rounded shadow-lg">
             {article.score}
           </div>
        )}

        {/* Category Tag */}
        <div className={`absolute top-3 left-3 flex items-center space-x-1 px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 ${theme.color}`}>
          <Icon size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">{article.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-cyan-500 uppercase tracking-wider truncate max-w-[150px]">{article.source}</span>
          <span className="text-xs text-gray-500 font-mono whitespace-nowrap">{getRelativeTime(article.timestamp)}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white leading-tight mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
          {article.summary}
        </p>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          <button 
            onClick={handlePlayAudio}
            className={`flex items-center space-x-2 text-xs font-mono uppercase tracking-wide hover:text-cyan-400 transition-colors ${isPlaying ? 'text-cyan-400 animate-pulse' : 'text-gray-500'}`}
          >
            {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            <span>{isPlaying ? 'Playing' : 'Listen'}</span>
          </button>

          <button 
            onClick={handleShare}
            className={`transition-all p-1 rounded-full flex items-center gap-1 ${isCopied ? 'text-emerald-400 bg-emerald-400/10' : 'text-gray-500 hover:text-white hover:bg-white/10'}`}
            title="Share"
          >
            {isCopied ? <Check size={16} /> : <Share2 size={16} />}
            {isCopied && <span className="text-[10px] font-mono pr-1">COPIED</span>}
          </button>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;