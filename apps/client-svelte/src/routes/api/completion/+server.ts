import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';
import type { RequestEvent } from './$types';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(requestEvent: RequestEvent) {

  // Get the prompt from the request body
  // (this is a streaming request, so we need to read the body as a stream)
  const reader = requestEvent.request.body.getReader();
  const { value } = await reader.read();
  const prompt = JSON.parse(new TextDecoder().decode(value)) ;

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    stream: true,
    temperature: 0.6,
    prompt: `Create three slogans for a business with unique features.
              Business: Bookstore with cats
              Slogans: "Purr-fect Pages", "Books and Whiskers", "Novels and Nuzzles"
              Business: Gym with rock climbing
              Slogans: "Peak Performance", "Reach New Heights", "Climb Your Way Fit"
              Business: ${prompt}
              Slogans:
    `,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
