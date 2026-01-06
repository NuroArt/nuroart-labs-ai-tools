
import React, { useEffect } from 'react';
import { Lead } from '../types';
import { X, ExternalLink, Sparkles, Users, Briefcase, Globe, Mail } from 'lucide-react';

interface Props {
  lead: Lead | null;
  onClose: () => void;
}

const LeadDetailModal: React.FC<Props> = ({ lead, onClose }) => {
  useEffect(() => {
    if (lead) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [lead]);

  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md transition-opacity animate-in fade-in duration-500" 
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 ease-out border border-zinc-800/50">
        {/* Gradient Header */}
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-10 text-white relative border-b border-zinc-800">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-2xl transition-all hover:rotate-90 border border-white/5 hover:border-white/20"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="inline-flex px-3 py-1 rounded-lg bg-violet-600/20 border border-violet-500/30 text-[10px] font-black uppercase tracking-[0.3em] text-violet-400 mb-4">
            Intel Report / {lead.industry}
          </div>
          
          <h2 className="text-5xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">{lead.companyName}</h2>
          
          <div className="flex items-center gap-4 text-zinc-400 text-sm font-bold uppercase tracking-widest">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-violet-400" />
            </div>
            <a href={`mailto:${lead.email}`} className="hover:text-violet-400 transition-colors underline decoration-violet-500/30 underline-offset-8 decoration-2">{lead.email}</a>
          </div>
        </div>

        {/* Body with Subtle Gradient */}
        <div className="p-10 max-h-[60vh] overflow-y-auto space-y-12 bg-gradient-to-b from-white to-zinc-50">
          <section>
            <div className="flex items-center gap-3 text-zinc-900 font-black mb-5 uppercase tracking-[0.2em] text-[11px]">
              <div className="w-1.5 h-6 bg-gradient-to-b from-violet-600 to-fuchsia-600 rounded-full" />
              Strategic Thesis
            </div>
            <p className="text-zinc-600 leading-relaxed text-2xl font-black tracking-tight italic">
              "{lead.whyFits}"
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:border-violet-200 transition-colors">
              <div className="flex items-center gap-2 text-zinc-900 font-black mb-4 text-[11px] uppercase tracking-widest">
                <Users className="w-4 h-4 text-violet-600" />
                Key Personas
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed font-bold">
                {lead.potentialContact}
              </p>
            </section>
            
            <section className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:border-violet-200 transition-colors">
              <div className="flex items-center gap-2 text-zinc-900 font-black mb-4 text-[11px] uppercase tracking-widest">
                <Briefcase className="w-4 h-4 text-violet-600" />
                Tactical Entry
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed font-bold">
                {lead.suggestedApproach}
              </p>
            </section>
          </div>

          {lead.sources.length > 0 && (
            <section>
              <div className="flex items-center gap-3 text-zinc-900 font-black mb-8 text-[11px] uppercase tracking-[0.2em] border-b border-zinc-200 pb-4">
                <Globe className="w-4 h-4 text-violet-600" />
                Discovery Sources
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lead.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between p-5 rounded-2xl border border-zinc-300 bg-white hover:border-violet-500 hover:shadow-xl hover:shadow-violet-200/20 transition-all group"
                  >
                    <div className="flex flex-col min-w-0 pr-3">
                      <span className="text-xs font-black text-zinc-900 group-hover:text-violet-600 transition-colors truncate">
                        {source.title}
                      </span>
                      <span className="text-[10px] text-zinc-400 mt-2 truncate font-bold uppercase tracking-tighter group-hover:text-zinc-600 transition-colors">
                        {source.uri}
                      </span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-zinc-300 group-hover:text-violet-500 flex-shrink-0 transition-transform group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="bg-zinc-50 p-8 border-t border-zinc-200 flex justify-end gap-6">
          <button 
            onClick={onClose}
            className="px-8 py-4 rounded-2xl font-black text-zinc-500 hover:bg-zinc-200 transition-all text-xs uppercase tracking-[0.2em] border border-zinc-300 active:scale-95"
          >
            Dismiss
          </button>
          <a 
            href={`mailto:${lead.email}`}
            className="flex items-center gap-3 px-10 py-4 rounded-2xl font-black bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 text-white hover:shadow-2xl hover:shadow-violet-200 transition-all text-xs uppercase tracking-[0.2em] shadow-xl shadow-zinc-300 border-b-4 border-indigo-800 active:scale-95"
          >
            <Mail className="w-4 h-4" />
            Initiate Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailModal;
