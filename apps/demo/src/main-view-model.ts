import { Observable } from '@nativescript/core';
//@ts-ignore
import { GeminiAPI, HttpError } from '@marrocode/ns-ai-kit';

export class MainViewModel extends Observable {
  message: string = 'Presiona el botón para hacer una pregunta a la API de Gemini.';
  private gemini: GeminiAPI;
  private isLoading = false;

  constructor() {
    super();
    const apiKey = 'TU_API_KEY_DE_GOOGLE_AI';
    this.gemini = new GeminiAPI(apiKey);
  }

  public async viewDemo() {
    console.log('¡El método viewDemo SÍ fue llamado!');
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.set('message', 'Pensando...');
    try {
      const res = await this.gemini.chatCompletion({
        messages: [{ role: 'user', content: 'Explica qué es NativeScript en un párrafo corto.' }],
      });

      const reply = res.candidates[0]?.content.parts[0]?.text;
      this.set('message', reply || 'No se recibió una respuesta válida.');
    } catch (error) {
      console.error('Error con la API de Gemini:', error);
      let errorMessage = 'Ocurrió un error al contactar a la API.';
      if (error instanceof HttpError) {
        errorMessage = `Error ${error.statusCode}: ${error.message}`;
      }
      this.set('message', errorMessage);
    } finally {
      this.isLoading = false;
    }
  }
}
