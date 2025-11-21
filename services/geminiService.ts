import { GoogleGenAI } from "@google/genai";
import { NewsArticle, Category } from "../types";
import { getRandomTechImage } from "../constants";

// Initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Fallback parser to extract JSON from Markdown code blocks
const parseJSONResponse = (text: string) => {
    let cleanText = text.trim();
    if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    try {
        return JSON.parse(cleanText);
    } catch (e) {
        console.error("Failed to parse JSON:", e);
        return null;
    }
};

// Helper to perform a single category fetch
const fetchCategoryNews = async (categoryPrompt: string): Promise<NewsArticle[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Find the absolute latest, breaking tech news from the last 24 hours regarding: ${categoryPrompt}.
            Focus on major tech markets including India, US, and China.
            
            Return exactly 4 items.
            
            Output strictly a JSON ARRAY of objects. Do not add any markdown formatting, just the raw JSON string.
            Structure:
            [
              {
                "title": "Headline",
                "summary": "Two sentence summary",
                "content": "Short paragraph details",
                "category": "AI" | "OS" | "Gadgets" | "Other",
                "source": "Source Name",
                "score": 8 // random integer 6-10
              }
            ]`,
            config: {
                tools: [{ googleSearch: {} }],
            }
        });

        if (!response.text) return [];

        const rawData = parseJSONResponse(response.text);
        if (!Array.isArray(rawData)) return [];

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

        return rawData.map((item: any, index: number) => {
             // Map grounding links
            const relatedChunk = groundingChunks.find((c: any) => {
                const title = c.web?.title?.toLowerCase() || '';
                const itemTitle = item.title?.toLowerCase() || '';
                return title.includes(itemTitle) || itemTitle.includes(title);
            });

            let url = relatedChunk?.web?.uri;
            if (!url) {
                // Generate a Google Search fallback if no direct link
                url = `https://www.google.com/search?q=${encodeURIComponent(item.title + " " + item.source)}`;
            }

            return {
                id: `live-${Date.now()}-${Math.random()}`,
                title: item.title,
                summary: item.summary,
                content: item.content,
                category: (Object.values(Category).includes(item.category) ? item.category : Category.OTHER) as Category,
                source: item.source,
                timestamp: new Date().toISOString(),
                url: url,
                imageUrl: getRandomTechImage(),
                score: item.score || 8
            };
        });

    } catch (e) {
        console.error(`Error fetching category ${categoryPrompt}:`, e);
        return [];
    }
};

// PARALLEL FETCHING
export const fetchLiveNews = async (): Promise<NewsArticle[]> => {
  console.log("Starting parallel fetch...");

  // We split the task into two parallel requests to speed up loading
  const [softwareNews, hardwareNews] = await Promise.all([
      fetchCategoryNews("AI, Software, Apps (WhatsApp, Instagram, Windows), and CyberSecurity"),
      fetchCategoryNews("Hardware, Smartphones (OnePlus, Realme, Samsung), and Gadgets")
  ]);

  // Merge results
  return [...softwareNews, ...hardwareNews];
};

export const generateNewsletterContent = async (email: string, topArticles: NewsArticle[]): Promise<string> => {
    const articleContext = topArticles.slice(0, 3).map(a => `- ${a.title}: ${a.summary}`).join('\n');

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Write a futuristic, cleanly formatted email body for a subscriber named ${email}.
            It is for the "Grid7 Intelligence Brief".
            
            Include these 3 top stories:
            ${articleContext}
            
            Format Requirements:
            - Use plain text but valid structure.
            - Keep it exciting and tech-focused.
            - End with "Stay Plugged In. - The Grid7 Team".
            - Do NOT include Subject lines. Just the body.`
        });
        return response.text || "Welcome to Grid7.";
    } catch (e) {
        console.error("Failed to generate email content", e);
        return `Welcome to Grid7.\n\nTop Stories:\n${articleContext}\n\nStay Plugged In.`;
    }
};