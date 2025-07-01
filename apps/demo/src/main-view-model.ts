import { Observable } from '@nativescript/core';

import { GeminiAPI } from '@marrocode/ns-ai-kit';

export class MainViewModel extends Observable {
  message: string = 'Presiona el botón para hacer una pregunta a la API de Gemini.';
  private isLoading = false;
  gemini: GeminiAPI = null;

  constructor() {
    super();
    const apiKey = 'AIzaSyBGQyEgh3aFD4qEKPd1VWDo3MTKQyATM-U';
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
        messages: [{ role: 'user', content: 'Explica qué es React en un párrafo corto.' }],
      });

      const reply = res.candidates[0]?.content.parts[0]?.text;
      this.set('message', reply || 'No se recibió una respuesta válida.');
    } catch (error) {
      console.error('Error con la API de Gemini:', error);
      let errorMessage = 'Ocurrió un error al contactar a la API.';
      if (error) {
        errorMessage = `Error ${error.statusCode}: ${error.message}`;
      }
      this.set('message', errorMessage);
    } finally {
      this.isLoading = false;
    }
  }
}
