
export interface BusinessProfile {
  name: string;
  industry: string;
  description: string;
  targetAudience: string;
  location: string;
}

export interface Lead {
  id: string;
  companyName: string;
  industry: string;
  whyFits: string;
  suggestedApproach: string;
  potentialContact: string;
  email: string;
  sources: { title: string; uri: string }[];
  timestamp: number;
}

export interface GenerationStatus {
  loading: boolean;
  error: string | null;
}
