import { OpenAIMessage, OpenAIResponse } from '../types/openai';
export declare class OpenAIAPI {
  private httpClient;
  /**
   * Initializes the OpenAIAPI client.
   * @param apiKey Your OpenAI API key.
   * @param baseUrl The base URL for the OpenAI API. Defaults to the official endpoint.
   */
  constructor(apiKey: string, baseUrl?: string);
  /**
   * Generates a chat completion response from the OpenAI model.
   * @param {object} params The parameters for the chat completion.
   * @param {OpenAIMessage[]} params.messages The history of the conversation.
   * @param {string} [params.model] The model to use (e.g., 'gpt-3.5-turbo').
   * @param {number} [params.temperature] The sampling temperature.
   * @returns A promise that resolves with the model's response.
   * @throws {HttpError} If the API returns an error.
   */
  chatCompletion({ messages, model, temperature }: { messages: OpenAIMessage[]; model?: string; temperature?: number }): Promise<OpenAIResponse>;
}
