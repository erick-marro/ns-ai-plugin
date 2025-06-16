import { HttpClient, HttpError } from '../core/http-client';
import { OpenAIMessage, OpenAIResponse } from '../types/openai';

export class OpenAIAPI {
  private httpClient: HttpClient;

  /**
   * Initializes the OpenAIAPI client.
   * @param apiKey Your OpenAI API key.
   * @param baseUrl The base URL for the OpenAI API. Defaults to the official endpoint.
   */
  constructor(apiKey: string, baseUrl = 'https://api.openai.com/v1') {
    // 1. We create the HttpClient, passing the Authorization header
    // that will be used for all requests made by this instance.
    this.httpClient = new HttpClient(baseUrl, {
      Authorization: `Bearer ${apiKey}`,
    });
  }

  /**
   * Generates a chat completion response from the OpenAI model.
   * @param {object} params The parameters for the chat completion.
   * @param {OpenAIMessage[]} params.messages The history of the conversation.
   * @param {string} [params.model] The model to use (e.g., 'gpt-3.5-turbo').
   * @param {number} [params.temperature] The sampling temperature.
   * @returns A promise that resolves with the model's response.
   * @throws {HttpError} If the API returns an error.
   */
  async chatCompletion({ messages, model = 'gpt-3.5-turbo', temperature = 0.7 }: { messages: OpenAIMessage[]; model?: string; temperature?: number }): Promise<OpenAIResponse> {
    // 2. Define the API path and the request body.
    const path = '/chat/completions';
    const body = {
      model,
      messages,
      temperature,
    };

    try {
      // 3. Delegate the POST request to our robust HttpClient.
      const response = await this.httpClient.post<OpenAIResponse>(path, body);

      // The OpenAI API response includes the message directly in the root object.
      // We can extract and return it here for convenience.
      return response;
    } catch (error) {
      // 4. Catch the specific HttpError for better logging.
      if (error instanceof HttpError) {
        console.error(`[OpenAI API Error] Status: ${error.statusCode}, Message: ${error.message}`, error.responseData);
      } else {
        console.error('[OpenAI API Error] An unexpected error occurred:', error);
      }
      // Re-throw the error so the calling code can handle it.
      throw error;
    }
  }
}
