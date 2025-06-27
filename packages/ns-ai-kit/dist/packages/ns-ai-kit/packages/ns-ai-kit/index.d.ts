export interface GeminiMessage {
  role: 'user' | 'model';
  content: string;
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
      role: string;
    };
    finishReason: string;
    index: number;
  }[];
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: {
      role: 'assistant';
      content: string;
    };
    finish_reason: string;
    index: number;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface IGeminiAPI {
  chatCompletion(params: { messages: GeminiMessage[]; model?: string }): Promise<GeminiResponse>;
}

export interface IOpenAIAPI {
  chatCompletion(params: { messages: OpenAIMessage[]; model?: string; temperature?: number }): Promise<OpenAIResponse>;
}
