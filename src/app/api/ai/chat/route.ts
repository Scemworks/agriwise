import { NextResponse } from "next/server";
import { withCors } from "../../../../lib/cors";
import { withErrorHandling } from "../../../../lib/errors";

// Simple multilingual canned responses
const RESPONSES: Record<string, Record<string, string>> = {
  en: {
    greeting: "Hello! I'm your AI farming assistant. How can I help you today?",
    pest: "Use integrated pest management: crop rotation, resistant varieties, and biological controls. Apply pesticides only when necessary and follow label instructions.",
    fertilizer:
      "Soil testing is recommended. Base fertilizer application on NPK needs — generally split nitrogen applications across growth stages.",
    default:
      "Could you provide crop and location details so I can give tailored advice?",
  },
  hi: {
    greeting: "नमस्ते! मैं आपकी कृषि सहायक हूँ। कैसे मदद कर सकती हूँ?",
    pest: "इंटीग्रेटेड पेस्ट मैनेजमेंट अपनाएँ: फसल रोटेशन, प्रतिरोधी किस्में और जैविक नियंत्रण।",
    fertilizer: "मिट्टी परीक्षण कराएँ और NPK की जरूरत के अनुसार उर्वरक लगाएँ।",
    default: "कृपया फसल और स्थान बताएं ताकि मैं विशेष सलाह दे सकूँ।",
  },
  ml: {
    greeting: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ കൃഷി sahāyaka ആണ്. എങ്ങനെ സഹായിക്കാം?",
    pest: "ഇന്റഗ്രേറ്റഡ് പെസ്റ്റ് മാനേജ്‌മെന്റ് ഉപയോഗിക്കുക: ഫീൽഡ് ചക്രം, പ്രതിരോധും ജൈവ നിയന്ത്രണങ്ങൾ.",
    fertilizer: "മണ്ണ് പരിശോധന നിർദ്ദേശിക്കുന്നു. NPK ആവശ്യാനുസരണം സാധനങ്ങൾ പ്രയോഗിക്കുക.",
    default: "ദയവായി നിങ്ങളുടെ ഫലവും സ്ഥലവും പറയൂ, അതിനെ അനുസരിച്ച് സഹായം നൽകാം.",
  },
};

export async function handler(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const lang = (body.language || "en") as "en" | "hi" | "ml";
    const message = (body.message || "").toString().toLowerCase();

    const dict = RESPONSES[lang] || RESPONSES.en;

    let reply = dict.default;
    if (
      message.includes("pest") ||
      message.includes("disease") ||
      message.includes("कीट") ||
      message.includes("रोग")
    )
      reply = dict.pest;
    else if (message.includes("fertil") || message.includes("उर्वर"))
      reply = dict.fertilizer;
    else if (
      message.includes("hi") ||
      message.includes("hello") ||
      message.includes("नमस्ते")
    )
      reply = dict.greeting;

    return NextResponse.json({ success: true, reply });
  } catch (_err) {
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 },
    );
  }
}

export const POST = withCors(withErrorHandling(handler));
