/**
 * A custom error class to encapsulate API errors.
 * It contains the HTTP status code and the response data from the server.
 */
export declare class HttpError extends Error {
  statusCode: number;
  responseData: any;
  constructor(statusCode: number, message: string, responseData: any);
}
export declare class HttpClient {
  private baseURL;
  private defaultHeaders;
  constructor(baseURL: string, defaultHeaders?: Record<string, string>);
  /**
   * Performs a POST request.
   * @param path The endpoint path (e.g., '/v1/chat/completions').
   * @param body The request body.
   * @returns A promise that resolves with the JSON response.
   * @throws {HttpError} If the server returns an error status code (>= 400).
   * @throws {Error} If the response content cannot be parsed as JSON.
   */
  post<T>(path: string, body: any): Promise<T>;
  /**
   * Performs a GET request.
   * @param path The endpoint path.
   * @returns A promise that resolves with the JSON response.
   * @throws {HttpError} If the server returns an error status code (>= 400).
   * @throws {Error} If the response content cannot be parsed as JSON.
   */
  get<T>(path: string): Promise<T>;
  private makeRequest;
  private parseResponse;
}
