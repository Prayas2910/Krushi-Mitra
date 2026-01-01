
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI client using the provided API Key.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

/**
 * Analyzes an image of a crop to identify potential diseases and suggest organic remedies.
 * Uses Gemini 3 Flash for efficient image analysis.
 */
export const analyzeCropDisease = async (
  base64Image: string,
  cropType: string,
  location?: { lat: number; lng: number },
  language: string = 'en'
): Promise<string> => {
  const ai = getAI();
  const prompt = `
    Analyze this image of a ${cropType} crop for potential diseases. 
    1. Identify the disease (if any) with a confidence level.
    2. Provide a detailed summary of symptoms.
    3. Suggest immediate actionable steps for a farmer.
    4. RECOMMENDED SECTION: "What NOT to do" - list specific habits, chemicals, or conditions to avoid to prevent this from spreading or recurring.
    5. Recommend sustainable fertilizers, biopesticides, and organic remedies.
    6. Mention preventive measures for the future.
    
    CRITICAL: YOU MUST RESPOND EXCLUSIVELY IN THE LANGUAGE WITH CODE: ${language}. 
    Even if the crop name is in English, all descriptions and advice must be in ${language}.
    Format your response in clean Markdown.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: {
      temperature: 0.1,
      topP: 0.8,
    }
  });

  return response.text || "Analysis failed. Please try a clearer photo.";
};

/**
 * Provides expert agricultural advice based on user queries and conversation history.
 * Updated to support optional image input within the chat.
 */
export const getExpertAdvice = async (
  query: string, 
  history: { role: 'user' | 'model', content: string, imageUrl?: string }[], 
  language: string = 'en',
  base64Image?: string
) => {
  const ai = getAI();
  
  // Prepare history parts
  const contents = history.map(h => ({
    role: h.role,
    parts: [{ text: h.content }]
  }));

  // Prepare current user message parts
  const currentParts: any[] = [{ text: query }];
  if (base64Image) {
    currentParts.push({
      inlineData: {
        data: base64Image,
        mimeType: 'image/jpeg'
      }
    });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [
      ...contents,
      { role: 'user', parts: currentParts }
    ],
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      systemInstruction: `You are AgroBot, a world-class agricultural expert. 
      YOU MUST SPEAK AND RESPOND ONLY IN THE LANGUAGE: ${language}.
      Provide scientific but practical farming solutions. 
      If the user provides an image, analyze it carefully to provide specific advice.
      Specifically tell farmers what they should NOT do (avoidance) to maintain crop health.
      Always remain polite and encouraging to the farmer.`
    }
  });

  return response.text || "Sorry, I couldn't process that request.";
};

/**
 * Fetches current Mandi rates using Google Search grounding.
 */
export const getMandiRates = async (location: { lat: number; lng: number } | null, language: string = 'en', specificCrop?: string) => {
  const ai = getAI();
  const cropContext = specificCrop ? `for the crop: ${specificCrop}` : 'for major crops (Soybean, Chana, Cotton/Kapas, Tomato, Potato, Onion, etc.)';
  
  const query = location 
    ? `Current Mandi crop prices ${cropContext} near coordinates ${location.lat}, ${location.lng} in the local region. Provide a detailed summary with Min, Max, and Avg prices.`
    : `Current average Mandi market crop prices in India ${cropContext}. Provide a detailed summary with Min, Max, and Avg prices.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `${query} CRITICAL: RESPOND EXCLUSIVELY IN THE LANGUAGE: ${language}.`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

/**
 * Fetches historical price trends for the last 30 days for a specific crop.
 */
export const getCropPriceTrend = async (crop: string, location: { lat: number; lng: number } | null, language: string = 'en') => {
  const ai = getAI();
  const locationText = location ? `near ${location.lat}, ${location.lng}` : 'in major Indian markets';
  const query = `Provide a price trend report for ${crop} over the last 30 days ${locationText}. 
  Include: 
  1. Price variation percentage.
  2. Reason for price change (supply, demand, weather).
  3. Forecast for the next 7 days.
  RESPOND EXCLUSIVELY IN THE LANGUAGE: ${language}.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  return response.text || "Trend data unavailable.";
};

// Fix: Adding searchSuppliers function to find local agricultural stores via Google Maps grounding
/**
 * Searches for local agricultural suppliers using Google Maps grounding.
 * Maps grounding is only supported in Gemini 2.5 series models.
 */
export const searchSuppliers = async (query: string, location: { lat: number; lng: number }) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Find agricultural suppliers, seed banks, and pesticide stores related to "${query}" near coordinates ${location.lat}, ${location.lng}. For each supplier, list their name and specialty.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: location.lat,
            longitude: location.lng
          }
        }
      }
    },
  });

  return {
    text: response.text,
    chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

// Fix: Adding getLatestOutbreaks function to fetch regional pest/disease alerts via Google Search grounding
/**
 * Fetches latest crop disease outbreak alerts using Google Search grounding.
 */
export const getLatestOutbreaks = async (language: string = 'en') => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Search for recent crop disease outbreaks and agricultural pest alerts in India from the last 3 months. Provide a summary and warnings for farmers. RESPOND EXCLUSIVELY IN THE LANGUAGE: ${language}.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};
