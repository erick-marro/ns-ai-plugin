import { request } from '@nativescript/core/http';
/**
 * A custom error class to encapsulate API errors.
 * It contains the HTTP status code and the response data from the server.
 */
export class HttpError extends Error {
  constructor(statusCode, message, responseData) {
    super(message);
    this.statusCode = statusCode;
    this.responseData = responseData;
    this.name = 'HttpError';
  }
}
export class HttpClient {
  constructor(baseURL, defaultHeaders = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
  }
  /**
   * Performs a POST request.
   * @param path The endpoint path (e.g., '/v1/chat/completions').
   * @param body The request body.
   * @returns A promise that resolves with the JSON response.
   * @throws {HttpError} If the server returns an error status code (>= 400).
   * @throws {Error} If the response content cannot be parsed as JSON.
   */
  async post(path, body) {
    const response = await this.makeRequest({
      url: `${this.baseURL}${path}`,
      method: 'POST',
      headers: this.defaultHeaders,
      content: JSON.stringify(body),
    });
    // Safely parse the response content.
    return this.parseResponse(response);
  }
  /**
   * Performs a GET request.
   * @param path The endpoint path.
   * @returns A promise that resolves with the JSON response.
   * @throws {HttpError} If the server returns an error status code (>= 400).
   * @throws {Error} If the response content cannot be parsed as JSON.
   */
  async get(path) {
    const response = await this.makeRequest({
      url: `${this.baseURL}${path}`,
      method: 'GET',
      headers: this.defaultHeaders,
    });
    // Safely parse the response content.
    return this.parseResponse(response);
  }
  // --- Private method to handle common request logic and errors ---
  async makeRequest(options) {
    try {
      const response = await request(options);
      if (response.statusCode >= 400) {
        // The server returned an error (e.g., 401, 404, 500)
        let errorData = null;
        let errorMessage = `Request failed with status ${response.statusCode}`;
        // Safely try to parse error response body
        if (response.content) {
          try {
            errorData = response.content.toJSON();
            // Try to get a more specific message from the API's error object
            errorMessage = errorData?.error?.message || errorMessage;
          } catch (e) {
            // If the error response is not JSON, use its raw string content
            errorMessage = response.content.toString();
          }
        }
        throw new HttpError(response.statusCode, errorMessage, errorData);
      }
      return response;
    } catch (e) {
      if (e instanceof HttpError) {
        // Re-throw the HttpError we've already created.
        throw e;
      }
      // Catch other errors (e.g., network issues)
      throw new Error(`Network request failed: ${e.message}`);
    }
  }
  // --- Private method to safely parse a successful response ---
  parseResponse(response) {
    if (!response.content) {
      // Handle cases like 204 No Content, which have a null body.
      return null;
    }
    try {
      return response.content.toJSON();
    } catch (e) {
      // Throw if a successful response was expected to be JSON but wasn't.
      throw new Error(`Failed to parse successful response as JSON. Status: ${response.statusCode}, Content: "${response.content.toString()}"`);
    }
  }
}
//# sourceMappingURL=http-client.js.map
