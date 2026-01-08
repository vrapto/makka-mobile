
import { GoogleGenAI } from "@google/genai";
import { MAKKA_PRODUCT } from "../constants";

const API_KEY = process.env.API_KEY || "";

export const getGeminiAssistant = () => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
    You are the Makka Health Assistant, an expert on the "Kidney & Bladder Combo Special". 
    Your goal is to help customers understand the benefits of this product.
    
    Product Details:
    - Name: ${MAKKA_PRODUCT.name}
    - Price: ${MAKKA_PRODUCT.currency}${MAKKA_PRODUCT.price}
    - Benefits: ${MAKKA_PRODUCT.benefits.join(', ')}
    - Key Ingredients: ${MAKKA_PRODUCT.ingredients.join(', ')}
    
    Guidelines:
    1. Be friendly, professional, and health-conscious.
    2. Answer questions specifically about kidney and bladder health in relation to our product.
    3. Always recommend consulting a healthcare professional for specific medical advice.
    4. Keep answers concise and mobile-friendly.
    5. Encourage the user to purchase if they seem interested.
  `;

  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });
};
