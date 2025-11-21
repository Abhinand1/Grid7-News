import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isFading, setIsFading] = useState(false);
  const [featureIndex, setFeatureIndex] = useState(-1);

  const features = [
    "Live Breaking News",
    "AI-Generated Briefs",
    "Futuristic Interface"
  ];

  useEffect(() => {
    // Sequence the animations
    const featureInterval = setInterval(() => {
      setFeatureIndex(prev => {
        if (prev < features.length - 1) return prev + 1;
        return prev;
      });
    }, 500);

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    const removeTimer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearInterval(featureInterval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish, features.length]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-700 overflow-hidden ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* 3D Background (Identical to Main App) */}
      <div className="perspective-container">
        <div className="perspective-grid"></div>
      </div>
      
      {/* Ambient Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[150px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>

      <div className="relative z-10 mb-12 flex flex-col items-center">
        {/* Logo Container with Glitch/Shimmer potential */}
        <div className="relative group">
            <div className="absolute inset-0 bg-cyan-500 blur-[40px] opacity-20 animate-pulse"></div>
            <h1 className="relative text-6xl sm:text-8xl font-tech font-black tracking-tighter text-white text-center animate-fade-in select-none">
            GRID<span className="text-cyan-500 inline-block animate-[pulse_2s_infinite]">7</span>
            </h1>
        </div>
        
        <p className="text-xs text-gray-500 text-center font-mono uppercase tracking-[0.5em] mt-4 animate-slide-up opacity-0" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
          Future Intelligence
        </p>
        <p className="text-[10px] text-gray-600 text-center font-mono mt-2 animate-slide-up opacity-0" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
          By Abhinand
        </p>
      </div>

      <div className="h-24 flex flex-col items-center space-y-3 relative z-10">
        {features.map((feature, idx) => (
          <div 
            key={idx}
            className={`text-sm font-mono font-bold tracking-wide transition-all duration-500 transform flex items-center ${
              idx <= featureIndex 
                ? 'opacity-100 translate-y-0 text-cyan-400/80' 
                : 'opacity-0 translate-y-4 text-gray-600'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full mr-3 ${idx <= featureIndex ? 'bg-cyan-500 shadow-[0_0_8px_#06b6d4]' : 'bg-gray-800'}`}></span>
            {feature}
          </div>
        ))}
      </div>

      {/* Loading Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 animate-[width_2.5s_ease-in-out_forwards] shadow-[0_0_20px_#06b6d4]" style={{width: '100%'}}></div>
      </div>
    </div>
  );
};

export default SplashScreen;