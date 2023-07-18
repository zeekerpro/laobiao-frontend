import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';
import type { RequestEvent, RequestHandler } from './$types';

// Create an OpenAI API client (that's edge friendly!)
const openaiConfig = new Configuration({
  apiKey: OPENAI_API_KEY,
  basePath: 'https://openai.laobiao.us/v1'
});
const openai = new OpenAIApi(openaiConfig);

// export const config = {
//   runtime: "edge"
// }

export const POST = (async (requestEvent: RequestEvent) => {

  // Get the prompt from the request body
  const { request } = requestEvent

  const { messages } = await request.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    // todo: use model that user setting before
    model: 'gpt-3.5-turbo',
    stream: true,
    temperature: 0.6,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
    max_tokens: 2048,
    messages
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}) satisfies RequestHandler
