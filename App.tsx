
import React, { useState, useEffect, useMemo } from 'react';
import { BusinessProfile, Lead, GenerationStatus } from './types';
import { generateLeads } from './services/geminiService';
import BusinessForm from './components/BusinessForm';
import LeadCard from './components/LeadCard';
import SavedLeadsWidget from './components/SavedLeadsWidget';
import IndustryFilter from './components/IndustryFilter';
import LeadDetailModal from './components/LeadDetailModal';
import { Sparkles, Zap, ShieldCheck, TrendingUp, AlertCircle, Search } from 'lucide-react';

const App: React.FC = () => {
  const [profile, setProfile] = useState<BusinessProfile>({
    name: '',
    industry: '',
    description: '',
    targetAudience: '',
    location: ''
  });

  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [savedLeads, setSavedLeads] = useState<Lead[]>([]);
  const [status, setStatus] = useState<GenerationStatus>({ loading: false, error: null });
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [activeDetailLead, setActiveDetailLead] = useState<Lead | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('leadflow_saved');
    if (stored) {
      try {
        setSavedLeads(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved leads", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('leadflow_saved', JSON.stringify(savedLeads));
  }, [savedLeads]);

  const handleGenerate = async () => {
    setStatus({ loading: true, error: null });
    setSelectedIndustries([]);
    try {
      const result = await generateLeads(profile);
      setLeads(result);
      setStatus({ loading: false, error: null });
    } catch (err: any) {
      console.error(err);
      setStatus({ 
        loading: false, 
        error: "Failed to generate leads. Please check your API configuration or try again." 
      });
    }
  };

  const toggleSaveLead = (lead: Lead) => {
    const isAlreadySaved = savedLeads.find(l => l.id === lead.id);
    if (isAlreadySaved) {
      setSavedLeads(savedLeads.filter(l => l.id !== lead.id));
    } else {
      setSavedLeads([...savedLeads, lead]);
      setIsWidgetOpen(true);
    }
  };

  const removeSavedLead = (id: string) => {
    setSavedLeads(savedLeads.filter(l => l.id !== id));
  };

  const uniqueIndustries = useMemo(() => {
    const industries = leads.map(l => l.industry);
    return Array.from(new Set(industries)).sort();
  }, [leads]);

  const industryCounts = useMemo(() => {
    return leads.reduce((acc, lead) => {
      acc[lead.industry] = (acc[lead.industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [leads]);

  const filteredLeads = useMemo(() => {
    if (selectedIndustries.length === 0) return leads;
    return leads.filter(l => selectedIndustries.includes(l.industry));
  }, [leads, selectedIndustries]);

  const toggleIndustryFilter = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry) 
        ? prev.filter(i => i !== industry) 
        : [...prev, industry]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-50 to-zinc-100 pb-20 selection:bg-violet-100 selection:text-violet-700 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-200/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-200/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-zinc-300 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200/50 transform hover:scale-105 transition-transform duration-300">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-zinc-900 flex items-baseline gap-1">
              LeadFlow <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">AI</span>
            </h1>
          </div>
          <div className="flex items-center gap-6 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
            <div className="hidden md:flex items-center gap-2 group cursor-default">
              <ShieldCheck className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" /> 
              <span>Grounded Intelligence</span>
            </div>
            <div className="hidden md:flex items-center gap-2 group cursor-default">
              <TrendingUp className="w-4 h-4 text-violet-500 group-hover:scale-110 transition-transform" /> 
              <span>Market Signals</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-4 space-y-6">
            <BusinessForm 
              profile={profile} 
              setProfile={setProfile} 
              onGenerate={handleGenerate}
              loading={status.loading}
            />
            
            <div className="bg-zinc-900 rounded-3xl p-8 text-white overflow-hidden relative shadow-2xl border border-zinc-800 group">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-400 group-hover:rotate-12 transition-transform" />
                  Live Web Engine
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Analyzing current domain signals, social growth, and hiring trends to find prospects with high intent.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/5 border border-white/20 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">Semantic Analysis</span>
                  <span className="bg-white/5 border border-white/20 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">B2B Intent</span>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 blur-3xl rounded-full" />
            </div>
          </div>

          {/* Right Column: Lead Dashboard */}
          <div className="lg:col-span-8">
            {status.error && (
              <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-3 text-rose-700 mb-8 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-semibold">{status.error}</p>
              </div>
            )}

            {status.loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200 animate-pulse h-72">
                    <div className="h-3 bg-zinc-200 rounded-full w-1/4 mb-4" />
                    <div className="h-6 bg-zinc-200 rounded-full w-3/4 mb-8" />
                    <div className="space-y-3 mb-8">
                      <div className="h-3 bg-zinc-100 rounded-full w-full" />
                      <div className="h-3 bg-zinc-100 rounded-full w-5/6" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-10 bg-zinc-100 rounded-xl" />
                      <div className="h-10 bg-zinc-100 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            ) : leads.length > 0 ? (
              <div className="space-y-8">
                <div className="flex items-end justify-between border-b border-zinc-300 pb-4 relative">
                  <div>
                    <h2 className="text-4xl font-black text-zinc-900 tracking-tighter">Market Intel</h2>
                    <p className="text-sm text-zinc-500 mt-1 font-medium italic">High-intent matches found across the web.</p>
                  </div>
                  <div className="bg-gradient-to-r from-zinc-100 to-zinc-200 px-4 py-1.5 rounded-full text-[10px] font-black text-zinc-700 uppercase tracking-[0.2em] border border-zinc-300 shadow-sm">
                    {filteredLeads.length} Identified
                  </div>
                </div>

                <IndustryFilter 
                  industries={uniqueIndustries}
                  selectedIndustries={selectedIndustries}
                  onToggle={toggleIndustryFilter}
                  onClear={() => setSelectedIndustries([])}
                  counts={industryCounts}
                />

                {filteredLeads.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-700 ease-out">
                    {filteredLeads.map(lead => (
                      <LeadCard 
                        key={lead.id} 
                        lead={lead} 
                        onSave={toggleSaveLead}
                        isSaved={!!savedLeads.find(l => l.id === lead.id)}
                        onClick={setActiveDetailLead}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-[2.5rem] border border-zinc-300 p-20 text-center shadow-lg shadow-zinc-200/20">
                    <div className="w-20 h-20 bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-zinc-200 rotate-6">
                      <Search className="w-10 h-10 text-zinc-300" />
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900 mb-2 tracking-tight">Expand Your Search</h3>
                    <p className="text-zinc-500 max-w-xs mx-auto font-medium">No matches in this segment. Try resetting filters to see the full list.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-zinc-300 rounded-[3rem] p-16 text-center flex flex-col items-center justify-center min-h-[580px] shadow-2xl shadow-zinc-200/50 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600" />
                <div className="w-28 h-28 bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-[2.5rem] flex items-center justify-center mb-10 rotate-3 shadow-inner border border-zinc-200 group-hover:rotate-12 transition-transform duration-500">
                  <Search className="w-12 h-12 text-zinc-300" />
                </div>
                <h2 className="text-4xl font-black text-zinc-900 mb-6 tracking-tighter">Your Next Growth Cycle.</h2>
                <p className="text-zinc-500 max-w-md mx-auto mb-12 text-xl font-medium leading-relaxed">
                  Provide your business details and let our AI scout live search results for companies that fit your profile perfectly.
                </p>
                <div className="flex items-center gap-5 py-5 px-8 bg-zinc-50/50 rounded-[2rem] border border-zinc-200 shadow-sm backdrop-blur-sm">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="w-11 h-11 rounded-full border-[3px] border-white bg-zinc-200 overflow-hidden shadow-md">
                        <img src={`https://picsum.photos/seed/${i+300}/64/64`} alt="avatar" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-black text-zinc-600 tracking-widest uppercase">Verified Opportunities</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <LeadDetailModal lead={activeDetailLead} onClose={() => setActiveDetailLead(null)} />
      <SavedLeadsWidget savedLeads={savedLeads} onRemove={removeSavedLead} isOpen={isWidgetOpen} setIsOpen={setIsWidgetOpen} />
    </div>
  );
};

export default App;
