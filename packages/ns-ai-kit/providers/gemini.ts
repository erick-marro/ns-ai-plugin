import { HttpClient, HttpError } from '../core/http-client';
import { GeminiMessage, GeminiResponse } from '../types/gemini';

export class GeminiAPI {
  private httpClient: HttpClient;
  private apiKey: string;

  /**
   * Initializes the GeminiAPI client.
   * @param apiKey Your Google AI API key.
   * @param baseUrl The base URL for the Gemini API. Defaults to the official endpoint.
   */
  constructor(apiKey: string, baseUrl = 'https://generativelanguage.googleapis.com/v1beta') {
    this.apiKey = apiKey;
    this.httpClient = new HttpClient(baseUrl);
  }

  /**
   * Generates a chat completion response from the Gemini model.
   * @param {object} params The parameters for the chat completion.
   * @param {GeminiMessage[]} params.messages The history of the conversation.
   * @param {string} [params.model] The model to use (e.g., 'models/gemini-pro').
   * @returns A promise that resolves with the model's response.
   * @throws {HttpError} If the API returns an error.
   */
  async chatCompletion({ messages, model = 'models/gemini-pro' }: { messages: GeminiMessage[]; model?: string }): Promise<GeminiResponse> {
    // 1. Transform messages to the format required by the Gemini API.
    const contents = messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    // 2. Define the specific API path and the request body.
    const path = `/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`;
    const body = { contents };

    try {
      // 3. Delegate the POST request to our robust HttpClient.
      const response = await this.httpClient.post<GeminiResponse>(path, body);
      return response;
    } catch (error) {
      // 4. (Optional but recommended) Catch the specific HttpError for better logging.
      if (error instanceof HttpError) {
        console.error(`[Gemini API Error] Status: ${error.statusCode}, Message: ${error.message}`, error.responseData);
      } else {
        console.error('[Gemini API Error] An unexpected error occurred:', error);
      }
      // Re-throw the error so the calling code can handle it.
      throw error;
    }
  }
}
