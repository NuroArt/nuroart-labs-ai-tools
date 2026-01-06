
import React from 'react';
import { BusinessProfile } from '../types';
import { Building2, Target, MapPin, Search, Sparkles } from 'lucide-react';

interface Props {
  profile: BusinessProfile;
  setProfile: (p: BusinessProfile) => void;
  onGenerate: () => void;
  loading: boolean;
}

const BusinessForm: React.FC<Props> = ({ profile, setProfile, onGenerate, loading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-zinc-200/50 border border-zinc-300 relative overflow-hidden">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xl font-black text-zinc-900 flex items-center gap-3 tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-violet-600" />
          </div>
          Profile Parameters
        </h2>
        {loading && (
          <div className="bg-violet-50 px-3 py-1 rounded-full flex items-center gap-2 border border-violet-100">
            <Sparkles className="w-3 h-3 text-violet-500 animate-pulse" />
            <span className="text-[9px] font-black text-violet-600 uppercase tracking-widest">Active Search</span>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        <div className="group">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2.5 ml-1 transition-colors group-focus-within:text-violet-500">Business Entity</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="e.g. Acme SaaS"
            className="w-full px-5 py-3.5 rounded-2xl border border-zinc-300 bg-zinc-50/30 focus:bg-white focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 outline-none transition-all placeholder:text-zinc-400 font-bold text-zinc-900"
          />
        </div>

        <div className="group">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2.5 ml-1 group-focus-within:text-violet-500">Vertical Focus</label>
          <input
            type="text"
            name="industry"
            value={profile.industry}
            onChange={handleChange}
            placeholder="e.g. Fintech, Enterprise"
            className="w-full px-5 py-3.5 rounded-2xl border border-zinc-300 bg-zinc-50/30 focus:bg-white focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 outline-none transition-all placeholder:text-zinc-400 font-bold text-zinc-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="group">
            <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2.5 ml-1 group-focus-within:text-violet-500">Target Segment</label>
            <div className="relative">
              <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                name="targetAudience"
                value={profile.targetAudience}
                onChange={handleChange}
                placeholder="CEOs, Managers"
                className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-zinc-300 bg-zinc-50/30 focus:bg-white focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 outline-none transition-all placeholder:text-zinc-400 font-bold text-zinc-900 text-sm"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2.5 ml-1 group-focus-within:text-violet-500">Geographic Bias</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="EMEA, USA"
                className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-zinc-300 bg-zinc-50/30 focus:bg-white focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 outline-none transition-all placeholder:text-zinc-400 font-bold text-zinc-900 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="group">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2.5 ml-1 group-focus-within:text-violet-500">Service Value Prop</label>
          <textarea
            name="description"
            value={profile.description}
            onChange={handleChange}
            rows={4}
            placeholder="How do you solve problems?"
            className="w-full px-5 py-3.5 rounded-2xl border border-zinc-300 bg-zinc-50/30 focus:bg-white focus:ring-4 focus:ring-violet-500/5 focus:border-violet-500 outline-none transition-all placeholder:text-zinc-400 font-bold text-zinc-900 resize-none leading-relaxed"
          />
        </div>

        <button
          onClick={onGenerate}
          disabled={loading || !profile.name || !profile.description}
          className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all relative overflow-hidden shadow-xl active:scale-95 group border-b-4 ${
            loading 
              ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed border-zinc-300' 
              : 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 text-white border-indigo-800 hover:shadow-violet-200 shadow-violet-200/50'
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-[3px] border-zinc-300 border-t-violet-500 rounded-full animate-spin" />
              <span>Scanning Markets...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4 transition-transform group-hover:scale-125 group-hover:rotate-12" />
              <span>Generate Target List</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BusinessForm;
