import { GeminiMessage, GeminiResponse, OpenAIMessage, OpenAIResponse } from './typing';
export * from './typing';

export interface IGeminiAPI {
  chatCompletion(params: { messages: GeminiMessage[]; model?: string }): Promise<GeminiResponse>;
}

export interface IOpenAIAPI {
  chatCompletion(params: { messages: OpenAIMessage[]; model?: string; temperature?: number }): Promise<OpenAIResponse>;
}
