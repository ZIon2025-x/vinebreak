import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY;

// Initialize the client only if key exists
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// System instruction to ensure the AI acts as a brand expert
const SYSTEM_INSTRUCTION = `
You are 'Terra', the AI Nature Consultant for 'Vinebreak', a luxury skincare brand rooted in the vitality of the vine and flax linen aesthetics.
Our brand philosophy emphasizes "Natural Vitality" and "Earth-to-Skin" transparency.
Your tone is grounded, organic, nurturing, and sophisticated (think minimalist luxury).
You should:
1. Ask the user about their skin's needs or their connection to nature.
2. Recommend our products:
   - 'Deep Roots' (Exfoliating bar with crushed seeds)
   - 'Linen Pure' (Gentle cleanser with flax & chardonnay)
   - 'Golden Harvest' (Brightening oil-infused bar)
3. Explain the benefits of grape polyphenols and natural flax oils for skin barrier protection.
4. Keep responses concise (under 100 words), using a calming, natural vocabulary.
Do not recommend other brands.
`;

// --- MOCK DATA & LOGIC ---

const MOCK_RESPONSES = [
  {
    keywords: ['dry', 'hydrate', 'moisture', 'parched', 'winter'],
    text: "For skin thirsting for solace, I recommend our 'Golden Harvest' bar. Enriched with raw wild honey and late-harvest grape extract, it acts as a natural humectant to draw moisture deep into the dermis, leaving a radiant glow."
  },
  {
    keywords: ['oily', 'acne', 'detox', 'clogged', 'pores'],
    text: "To balance and renew, the 'Deep Roots' exfoliating bar is your ideal companion. Crushed Cabernet seeds and activated charcoal gently purify the pores without stripping your natural oils, revealing the fresh vitality beneath."
  },
  {
    keywords: ['sensitive', 'gentle', 'redness', 'irritated', 'soft'],
    text: "The 'Linen Pure' is our ode to delicacy. Cold-pressed flax oil restores the lipid barrier, while white grape essence provides a soothing, silk-like finish. It is stripped of all harshness, perfect for the most tender skin."
  },
  {
    keywords: ['hello', 'hi', 'start', 'greeting', 'hey'],
    text: "Greetings. I am Terra. I am here to help you unearth a ritual grounded in the seasons. Tell me, how does your skin feel today? Is it seeking renewal, or perhaps a moment of calm?"
  },
  {
    keywords: ['price', 'cost', 'buy', 'shipping'],
    text: "Our artifacts are crafted in small batches in Bordeaux. You can view the full collection in our catalog. We offer carbon-neutral shipping wrapped in recycled linen to ensure your order arrives as pure as it left the atelier."
  },
  {
    keywords: ['ingredient', 'natural', 'chemical', 'organic'],
    text: "We believe in radical transparency. Our formulas rely on organic Vitis Vinifera (grape) extracts and cold-pressed flax oils. We use zero synthetics, parabens, or sulfates. Only what the earth provides."
  }
];

const DEFAULT_MOCK_RESPONSE = "I sense you are looking for a connection to the earth. All our formulations are designed to honor the natural vitality of the vine. Could you tell me a bit more about your skin's current nature so I may guide you?";

// Helper to simulate streaming text
async function* mockStreamGenerator(text: string) {
  const chunks = text.split(/(?=[,.\s])/); // Split by words or punctuation to simulate typing
  for (const chunk of chunks) {
    // Random delay to simulate "thinking" and typing speed
    await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 50));
    
    // Construct a fake GenerateContentResponse object
    const response = {
      candidates: [],
      text: chunk
    } as unknown as GenerateContentResponse;
    yield response;
  }
}

function getMockResponse(message: string): string {
  const lowerMsg = message.toLowerCase();
  const match = MOCK_RESPONSES.find(r => r.keywords.some(k => lowerMsg.includes(k)));
  return match ? match.text : DEFAULT_MOCK_RESPONSE;
}

// --- MAIN SERVICE ---

let chatSession: Chat | null = null;

export const getChatSession = (): Chat | null => {
  if (!ai) return null;
  
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageStream = async (message: string) => {
  // 1. Try to use real API if Key exists
  if (ai) {
    try {
      const chat = getChatSession();
      if (chat) {
        return await chat.sendMessageStream({ message });
      }
    } catch (error) {
      console.warn("Gemini API failed, falling back to Terra Mock Mode.", error);
      // Fallthrough to mock
    }
  }

  // 2. Fallback to Mock Mode
  console.log("Using Terra Mock Mode");
  const mockText = getMockResponse(message);
  return mockStreamGenerator(mockText);
};