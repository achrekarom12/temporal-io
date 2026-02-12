import { generateText } from 'ai';
import { temporalProvider } from '@temporalio/ai-sdk';

export async function poemAgent(prompt: string): Promise<string> {
  const result = await generateText({
    model: temporalProvider.languageModel('gemini-2.5-flash-lite'),
    prompt,
    system: 'You only respond in poems.',
  });
  return result.text;
}

