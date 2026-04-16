import { ai } from "./googleGenAi";

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

type GenerateQuizProps = {
  content: string;
};

export const generateQuiz = async ({
  content,
}: GenerateQuizProps): Promise<QuizQuestion[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate 5 multiple choice questions based on this article: ${content}.
    
Return the response in this exact JSON format with no markdown, no backticks, no preamble — only valid JSON:
[
  {
    "question": "Question text here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "0"
  }
]

Rules:
- The "answer" field must be the index (0-3) of the correct option as a string.
- All 4 options must be plausible but only one correct.
- Questions should test comprehension of the article content.`,
  });

  const text = response.text ?? "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean) as QuizQuestion[];
};
