import React, { useState } from 'react';
import { X, Mail, CheckCircle, Loader2, Send, AlertCircle } from 'lucide-react';
import { NewsArticle } from '../types';
import { generateNewsletterContent } from '../services/geminiService';
import { sendNewsletter } from '../services/emailService';
import { EMAILJS_CONFIG } from '../constants';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: NewsArticle[];
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose, articles }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'generating' | 'sending' | 'sent' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Check configuration
    if (EMAILJS_CONFIG.PUBLIC_KEY === 'public_key_here') {
        alert("NOTE: EmailJS keys are missing in constants.ts. The email will be simulated.");
    }

    setStatus('generating');
    setStatusMessage('AI Agent constructing briefing...');
    
    // 1. Generate Content via Gemini
    const emailContent = await generateNewsletterContent(email, articles);
    
    // 2. Send via EmailJS
    setStatus('sending');
    setStatusMessage('Encrypting and transmitting via quantum link...');
    
    const success = await sendNewsletter(email, emailContent);

    if (success) {
        setStatus('sent');
    } else {
        setStatus('error');
        setStatusMessage('Transmission failed. Server rejected the protocol.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-dark-800 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-900/20 to-transparent p-6 border-b border-white/10">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X size={20} />
          </button>
          <h2 className="text-2xl font-tech font-bold text-white mb-1 flex items-center gap-2">
            GRID<span className="text-cyan-500">7</span> <span className="text-sm font-mono text-gray-400 font-normal mt-1">/ ACCESS</span>
          </h2>
          <p className="text-gray-400 text-xs font-mono uppercase tracking-wider">Weekly Intelligence Briefing</p>
        </div>

        {/* Body */}
        <div className="p-8">
          {status === 'idle' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-mono text-cyan-400 uppercase">Enter Verification ID (Email)</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-cyan-500 transition-colors" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operative@grid7.net"
                    className="w-full bg-black border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Send size={18} />
                <span>INITIATE SUBSCRIPTION</span>
              </button>
              <p className="text-[10px] text-gray-600 text-center font-mono">
                By subscribing, you agree to receive AI-curated summaries every Sunday.
              </p>
            </form>
          )}

          {(status === 'generating' || status === 'sending') && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-cyan-900 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="font-mono text-sm text-cyan-400 animate-pulse">{statusMessage}</p>
            </div>
          )}

          {status === 'sent' && (
            <div className="flex flex-col items-center justify-center py-4 space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/50">
                <CheckCircle className="text-emerald-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Access Granted</h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">
                A secure briefing has been dispatched to <span className="text-cyan-400 font-mono">{email}</span>.
              </p>
              <button onClick={onClose} className="mt-4 text-xs font-mono text-gray-500 hover:text-white border-b border-transparent hover:border-white transition-all">
                CLOSE TERMINAL
              </button>
            </div>
          )}

          {status === 'error' && (
             <div className="flex flex-col items-center justify-center py-4 space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/50">
                <AlertCircle className="text-red-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Transmission Failed</h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">
                {statusMessage}
              </p>
               <button onClick={() => setStatus('idle')} className="mt-4 text-xs font-mono text-cyan-500 hover:text-white border-b border-transparent hover:border-white transition-all">
                RETRY
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;