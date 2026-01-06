
import React from 'react';
import { Lead } from '../types';
import { Mail, Star, Users, Briefcase, Sparkles, ExternalLink } from 'lucide-react';

interface Props {
  lead: Lead;
  onSave: (lead: Lead) => void;
  isSaved: boolean;
  onClick: (lead: Lead) => void;
}

const LeadCard: React.FC<Props> = ({ lead, onSave, isSaved, onClick }) => {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    onSave(lead);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      onClick={() => onClick(lead)}
      className="bg-white rounded-2xl border border-zinc-300 p-6 hover:border-violet-400 hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)] transition-all group relative cursor-pointer active:scale-[0.99] flex flex-col h-full overflow-hidden"
    >
      {/* Top Gradient Strip */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1 min-w-0">
          <div className="inline-flex px-2 py-0.5 rounded-md bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 text-[9px] font-black text-violet-600 uppercase tracking-[0.2em] mb-2.5">
            {lead.industry}
          </div>
          <h3 className="text-xl font-black text-zinc-900 group-hover:text-violet-600 transition-colors truncate tracking-tighter">
            {lead.companyName}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-zinc-400 text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{lead.email}</span>
          </div>
        </div>
        <button
          onClick={handleSaveClick}
          className={`p-2.5 rounded-xl transition-all relative z-10 flex-shrink-0 border-2 ${
            isSaved 
              ? 'bg-gradient-to-br from-amber-50 to-amber-100 text-amber-500 border-amber-300 shadow-md transform rotate-12' 
              : 'bg-zinc-50 text-zinc-400 border-zinc-300 hover:border-violet-400 hover:text-violet-600'
          }`}
        >
          <Star className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="space-y-5 flex-1">
        <div className="bg-gradient-to-br from-zinc-50 to-white p-4 rounded-xl border border-zinc-200 relative group/thesis">
          <div className="flex items-center gap-2 text-[10px] font-black text-zinc-700 mb-2 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            Fit Analysis
          </div>
          <p className="text-sm text-zinc-600 leading-relaxed line-clamp-2 font-medium italic">"{lead.whyFits}"</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3.5 rounded-xl border border-zinc-200 shadow-sm hover:border-violet-200 transition-colors">
            <div className="flex items-center gap-1.5 text-[9px] font-black text-zinc-400 uppercase mb-2 tracking-widest">
              <Users className="w-3 h-3 text-violet-500" /> Role
            </div>
            <p className="text-[11px] text-zinc-900 font-black truncate">{lead.potentialContact}</p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-zinc-200 shadow-sm hover:border-violet-200 transition-colors">
            <div className="flex items-center gap-1.5 text-[9px] font-black text-zinc-400 uppercase mb-2 tracking-widest">
              <Briefcase className="w-3 h-3 text-violet-500" /> Playbook
            </div>
            <p className="text-[11px] text-zinc-900 font-black truncate">{lead.suggestedApproach}</p>
          </div>
        </div>

        {lead.sources.length > 0 && (
          <div className="space-y-2 pt-1">
            <div className="flex flex-wrap gap-2">
              {lead.sources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50/50 rounded-lg text-[10px] font-black text-zinc-500 hover:text-white hover:bg-violet-600 transition-all border border-zinc-200 shadow-sm"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="truncate max-w-[90px]">{source.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-6 mt-6 border-t border-zinc-200 flex items-center justify-between gap-2">
        <a 
          href={`mailto:${lead.email}`}
          onClick={handleLinkClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-800 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:from-violet-600 hover:to-indigo-600 transition-all shadow-lg active:scale-95 relative z-10 border border-zinc-800"
        >
          <Mail className="w-3.5 h-3.5" />
          Send Outreach
        </a>
        <span className="text-[10px] text-violet-600 font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform flex items-center gap-1">
          Review Intel <span className="text-lg">→</span>
        </span>
      </div>
    </div>
  );
};

export default LeadCard;
