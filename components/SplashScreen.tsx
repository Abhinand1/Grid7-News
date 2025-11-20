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

  if (!features) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-700 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-cyan-500 blur-[60px] opacity-20 animate-pulse-slow"></div>
        <h1 className="relative text-6xl font-mono font-bold tracking-tighter text-white text-center animate-fade-in">
          GRID<span className="text-cyan-500">7</span>
        </h1>
        <p className="text-xs text-gray-500 text-center uppercase tracking-[0.3em] mt-2 animate-slide-up" style={{animationDelay: '0.2s'}}>
          By Abhinand
        </p>
      </div>

      <div className="h-16 flex flex-col items-center space-y-2">
        {features.map((feature, idx) => (
          <div 
            key={idx}
            className={`text-sm font-mono text-gray-400 transition-all duration-500 transform ${
              idx <= featureIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            { idx <= featureIndex && <span className="text-cyan-500 mr-2">/</span> }
            {feature}
          </div>
        ))}
      </div>

      {/* Loading Bar */}
      <div className="absolute bottom-10 w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
        <div className="h-full bg-cyan-500 animate-[width_2s_ease-in-out_forwards]" style={{width: '100%'}}></div>
      </div>
    </div>
  );
};

export default SplashScreen;