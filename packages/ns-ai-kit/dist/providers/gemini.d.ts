import { GeminiMessage, GeminiResponse } from '../types/gemini';
export declare class GeminiAPI {
  private httpClient;
  private apiKey;
  /**
   * Initializes the GeminiAPI client.
   * @param apiKey Your Google AI API key.
   * @param baseUrl The base URL for the Gemini API. Defaults to the official endpoint.
   */
  constructor(apiKey: string, baseUrl?: string);
  /**
   * Generates a chat completion response from the Gemini model.
   * @param {object} params The parameters for the chat completion.
   * @param {GeminiMessage[]} params.messages The history of the conversation.
   * @param {string} [params.model] The model to use (e.g., 'models/gemini-pro').
   * @returns A promise that resolves with the model's response.
   * @throws {HttpError} If the API returns an error.
   */
  chatCompletion({ messages, model }: { messages: GeminiMessage[]; model?: string }): Promise<GeminiResponse>;
}
