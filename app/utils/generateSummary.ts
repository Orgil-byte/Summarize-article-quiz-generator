import { ai } from "./googleGenAi";

type generateSummary = {
  content: string | undefined;
};

export const generateSummary = async ({ content }: generateSummary) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Please provide a concise summary of the following article: ${content}`,
  });

  return response.text;
};
