export interface ChatMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
}
export interface OpenAIChatResponse {
  id: string;
  object: string;
  created: number;
  choices: {
    message: ChatMessage;
    finish_reason: string;
    index: number;
  }[];
}
export interface GeminiChatResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}
