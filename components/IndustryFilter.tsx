
import React from 'react';
import { Filter, X } from 'lucide-react';

interface Props {
  industries: string[];
  selectedIndustries: string[];
  onToggle: (industry: string) => void;
  onClear: () => void;
  counts: Record<string, number>;
}

const IndustryFilter: React.FC<Props> = ({ industries, selectedIndustries, onToggle, onClear, counts }) => {
  if (industries.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
          <Filter className="w-3.5 h-3.5 text-violet-500" />
          Segments
        </div>
        {selectedIndustries.length > 0 && (
          <button
            onClick={onClear}
            className="text-[10px] font-black text-violet-600 hover:text-fuchsia-600 flex items-center gap-1 transition-colors uppercase tracking-widest"
          >
            <X className="w-3 h-3" /> Reset
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2.5">
        {industries.map((industry) => {
          const isSelected = selectedIndustries.includes(industry);
          return (
            <button
              key={industry}
              onClick={() => onToggle(industry)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] font-bold transition-all border-2 ${
                isSelected
                  ? 'bg-zinc-900 border-zinc-900 text-white shadow-lg shadow-zinc-200 scale-105'
                  : 'bg-white border-zinc-300 text-zinc-700 hover:border-violet-400 hover:text-violet-600 shadow-sm'
              }`}
            >
              {industry}
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                isSelected ? 'bg-violet-500 text-white' : 'bg-zinc-200 text-zinc-500'
              }`}>
                {counts[industry]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default IndustryFilter;
