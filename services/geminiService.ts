import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { FURNITURE_CATALOG } from "../constants/furniture";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const findFurniture = async (
  base64Image: string,
  userPrompt: string
): Promise<GenerateContentResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  // Strip the data URL prefix if present (e.g., "data:image/png;base64,")
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanBase64
            }
          },
          {
            text: `I have sketched a design for a furniture item or home decor piece. 
            Here is my description of it: "${userPrompt}".
            
            Please act as a professional interior design shopper. 
            1. Analyze my sketch and description.
            2. Search the web for REAL, purchasable products that look as similar as possible to my design.
            3. Provide a list of 3-5 best matching products found.
            4. For each item, give me the Product Name, an Estimated Price, and a brief explanation of why it fits my design.
            
            Use the Google Search tool to find these real items. Ensure you provide the source links in the grounding metadata.`
          }
        ]
      },
      config: {
        tools: [{ googleSearch: {} }],
        // We do not use responseMimeType: 'application/json' because googleSearch works best with natural language responses
        // and we want the grounding metadata for links.
      }
    });

    return response;
  } catch (error) {
    console.error("Error calling Gemini:", error);
    throw error;
  }
};

export const scanRoomImage = async (base64Image: string): Promise<{ items: string[], floorType: string }> => {
  if (!apiKey) throw new Error("API Key is missing.");

  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
  
  // Create a context string of available items
  const catalogContext = FURNITURE_CATALOG.map(item => `- ${item.name} (ID: ${item.id})`).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanBase64
            }
          },
          {
            text: `Analyze this room photo. I want to recreate it virtually using a specific set of isometric assets.
            
            Here is my catalog of available assets:
            ${catalogContext}
            
            1. Identify the type of flooring most similar to the photo (choose one ID from: floor-wood, floor-tile, floor-patio).
            2. Identify which furniture or decor items from my catalog are present in the photo.
            3. Return a JSON object with this structure: { "floorType": "floor-wood", "items": ["iso-sofa", "iso-plant", "iso-lamp"] }.
            Only include items that strictly match my catalog IDs. If unsure, skip the item.`
          }
        ]
      },
      config: {
        responseMimeType: 'application/json'
      }
    });
    
    const text = response.text || "{}";
    try {
        return JSON.parse(text);
    } catch (e) {
        console.error("Failed to parse JSON from Gemini", text);
        return { items: [], floorType: 'floor-wood' };
    }
  } catch (error) {
    console.error("Error scanning room:", error);
    throw error;
  }
};
