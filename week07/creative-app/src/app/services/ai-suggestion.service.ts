// src/app/services/ai-suggestion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AiSuggestionService {
  private apiUrl = 'https://api.openai.com/v1/completions';

  constructor(private http: HttpClient) {}

  getSuggestion(prompt: string) {
    return this.http.post(this.apiUrl, {
      model: "text-davinci-003",
      prompt: `Generate a time capsule message about: ${prompt}`,
      max_tokens: 60
    });
  }
}