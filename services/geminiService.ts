
import { GoogleGenAI, Type } from "@google/genai";
import { BusinessProfile, Lead } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateLeads = async (profile: BusinessProfile): Promise<Lead[]> => {
  const prompt = `
    Find 5 highly relevant B2B lead opportunities for the following business:
    Business Name: ${profile.name}
    Industry: ${profile.industry}
    Description: ${profile.description}
    Target Audience: ${profile.targetAudience}
    Location Preference: ${profile.location}

    Research real companies or market segments that are currently growing, hiring, or showing needs that align with this business. 
    Use Google Search to find up-to-date information.

    For each lead, identify a likely contact person or role and provide a plausible business email address (e.g., info@company.com or name@company.com).

    Return the results in a structured format.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            companyName: { type: Type.STRING },
            industry: { type: Type.STRING },
            whyFits: { type: Type.STRING },
            suggestedApproach: { type: Type.STRING },
            potentialContact: { type: Type.STRING },
            email: { type: Type.STRING, description: "A plausible business email address for the company or contact." },
          },
          required: ["companyName", "industry", "whyFits", "suggestedApproach", "potentialContact", "email"]
        }
      }
    },
  });

  const rawLeads = JSON.parse(response.text || "[]");
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.filter(chunk => chunk.web)
    ?.map(chunk => ({
      title: chunk.web?.title || "Reference",
      uri: chunk.web?.uri || "#"
    })) || [];

  return rawLeads.map((lead: any) => ({
    ...lead,
    id: Math.random().toString(36).substr(2, 9),
    sources: sources.slice(0, 3), // Attach some relevant sources to each lead for credibility
    timestamp: Date.now()
  }));
};
