import { ChatMessage } from '@/db/schema';
import { ModelConfig } from '@/types/Model';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

export type ChatOptions = {
  messages: ChatMessage[];
  abortSignal?: AbortSignal;
};

export function createChatModel(config: ModelConfig) {
  const { apiFormat, apiKey, model, baseURL } = config;

  if (!apiFormat.trim() || !apiKey.trim() || !model.trim() || !baseURL.trim()) {
    throw new Error('All the config are required');
  }

  if (apiFormat === 'openai-chat') {
    return createOpenAI({ apiKey, baseURL }).chat(model);
  }
  if (apiFormat === 'openai-responses') {
    return createOpenAI({ apiKey, baseURL }).responses(model);
  }

  if (apiFormat === 'anthropic-messages') {
    return createAnthropic({ apiKey, baseURL })(model);
  }

  throw new Error('Unsupported API Format' + apiFormat);
}

export async function chatWithModel(
  config: ModelConfig,
  chatOptions: ChatOptions,
) {
  if (chatOptions.messages.length === 0) {
    throw new Error('Chat message is empty');
  }

  const { text } = await generateText({
    model: createChatModel(config),
    messages: chatOptions.messages,
    abortSignal: chatOptions.abortSignal,
  });

  return text;
}
