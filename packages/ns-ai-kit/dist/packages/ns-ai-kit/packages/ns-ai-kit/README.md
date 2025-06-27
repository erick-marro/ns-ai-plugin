
# ⚡ NativeScript AI SDK (Inspired by Vercel AI SDK)

**Finally, bring real AI power into the NativeScript world — without switching tools, frameworks, or your damn stack.**

---

## 🚀 Why This Plugin?

You're a NativeScript dev.
You love the ecosystem.
You build fast, native apps with a clean codebase.

But when it comes to **AI**, everything gets complicated.
You look around and see cool things in React Native, Vercel, and other stacks…
And you wonder:

> “Why can’t I just do this with the tools I already love?”

Now you can.

This plugin brings you the simplicity and flexibility of the **Vercel AI SDK**, but built for **NativeScript**.

Because you shouldn't have to abandon your tech stack just to add some damn intelligence to your app.

---

## 🧠 What You Get

* Easy AI-powered chat interfaces
* Built-in support for OpenAI, Azure, and more (via edge APIs)
* Streamed responses out of the box
* Event-based hooks you can customize
* Works perfectly with NativeScript's ViewModels and UI components

---

## 📦 Installation

```bash
npm install @marrocode/ns-ai-kit
```

---

## 🔧 Basic Usage

```ts
import { Observable } from '@nativescript/core';
import { GeminiAPI, HttpError } from '@marrocode/ns-ai-kit';

export class MainViewModel extends Observable {
  message: string = 'Presiona el botón para hacer una pregunta a la API de Gemini.';
  private gemini: GeminiAPI;
  private isLoading = false;

  constructor() {
    super();
    const apiKey = "TU_API_KEY_DE_GOOGLE_AI";
    this.gemini = new GeminiAPI(apiKey); 
  }

 
  public async viewDemo() {
    console.log("¡El método viewDemo SÍ fue llamado!");
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
      console.error("Error con la API de Gemini:", error);
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
```

---

## 🛠 Example Use Cases

* Build in-app AI assistants
* Let users chat with support bots
* Generate content with OpenAI
* Create dynamic forms or experiences with natural language

---

## 🤘 Who This Is For

* NativeScript devs tired of switching stacks just to "try AI"
* Makers who want control without the noise
* Devs who believe NativeScript should evolve — and are ready to push it forward

---

## ⚠️ Early Version Notice

This is the **first release**. It's still too early to use in production — I literally just published it.  

But if you're curious, bold, or just tired of waiting for NativeScript to catch up with AI, dive in.  

Break things. Improve stuff.

Open issues. Send PRs. Let’s build the damn future together.  

Because innovation doesn’t come from sitting around waiting for someone else to do it.


---

## 📢 Contribute

Ideas? Bugs? Want to push this further?

Open an issue or fork it. You’re more than welcome.

---

## ❤️ Built with love (and frustration) by someone who got tired of switching frameworks just to add a chat box.


