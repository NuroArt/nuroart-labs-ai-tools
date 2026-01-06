
import React from 'react';
import { Lead } from '../types';
import { Star, X, Briefcase, Trash2, ChevronRight } from 'lucide-react';

interface Props {
  savedLeads: Lead[];
  onRemove: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SavedLeadsWidget: React.FC<Props> = ({ savedLeads, onRemove, isOpen, setIsOpen }) => {
  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'w-80 md:w-96' : 'w-20'}`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-600 rounded-[2rem] shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-90 relative group overflow-hidden border-b-4 border-indigo-800 transition-transform duration-300"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Star className="w-8 h-8 relative z-10 group-hover:rotate-12 group-hover:fill-current transition-all" />
          {savedLeads.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-violet-600 text-[10px] font-black px-3 py-1 rounded-full border-2 border-violet-600 shadow-xl animate-bounce">
              {savedLeads.length}
            </span>
          )}
        </button>
      ) : (
        <div className="bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.25)] border border-zinc-300 overflow-hidden flex flex-col max-h-[80vh] animate-in slide-in-from-bottom-12 duration-500 border-b-8 border-zinc-100">
          <div className="bg-zinc-900 p-8 flex items-center justify-between text-white border-b border-zinc-800">
            <div className="flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em]">
              <Star className="w-5 h-5 text-violet-400 fill-current animate-pulse" />
              Strategic Hotlist
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-white/10 p-2.5 rounded-2xl transition-all hover:rotate-90 border border-white/5 hover:border-white/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-8 overflow-y-auto space-y-5 flex-1 bg-gradient-to-b from-white to-zinc-50">
            {savedLeads.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-zinc-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-zinc-200 shadow-inner rotate-3">
                   <Star className="w-8 h-8 text-zinc-200" />
                </div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">No prospects tagged</p>
              </div>
            ) : (
              savedLeads.map((lead) => (
                <div key={lead.id} className="group p-5 rounded-2xl border border-zinc-200 hover:border-violet-300 transition-all bg-white hover:shadow-xl hover:shadow-violet-200/10 active:scale-95 cursor-pointer">
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <h4 className="text-sm font-black text-zinc-900 truncate tracking-tight group-hover:text-violet-600 transition-colors">{lead.companyName}</h4>
                      <div className="inline-flex px-2 py-0.5 rounded bg-zinc-100 text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-2 group-hover:bg-violet-50 group-hover:text-violet-500 transition-colors">
                        {lead.industry}
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onRemove(lead.id); }}
                      className="text-zinc-300 hover:text-rose-500 transition-all p-2 border border-transparent hover:border-rose-100 rounded-xl hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {savedLeads.length > 0 && (
            <div className="p-8 bg-zinc-50 border-t border-zinc-200">
              <button 
                className="group w-full py-5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-violet-200 transition-all shadow-xl shadow-zinc-300 flex items-center justify-center gap-3 border-b-4 border-indigo-800 active:scale-95"
                onClick={() => alert("CRM integration coming soon!")}
              >
                Sync to HubSpot
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedLeadsWidget;
