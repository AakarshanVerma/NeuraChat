import endent from 'endent';
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';

const createPrompt = (inputCode: string) => {
  if (!inputCode) return '';
  return endent`${inputCode}`;
};

export const OpenAIStream = async (
  inputCode: string,
  model: string,
  key?: string,
) => {
  const prompt = createPrompt(inputCode);

  const messages = [{ role: 'system', content: prompt }];

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key || process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0,
      stream: true,
    }),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (!res.ok || !res.body) {
    const result = await res.text();
    throw new Error(`OpenAI API error: ${result || res.statusText}`);
  }

  const stream = new ReadableStream({
    async start(controller) {
      const parser = createParser((event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          if (event.data === '[DONE]') {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(event.data);
            const text = json.choices?.[0]?.delta?.content || '';
            controller.enqueue(encoder.encode(text));
          } catch (err) {
            controller.error(err);
          }
        }
      });

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};
