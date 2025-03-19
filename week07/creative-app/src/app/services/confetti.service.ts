// src/app/services/confetti.service.ts
import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({ providedIn: 'root' })
export class ConfettiService {
  async launch(style: 'normal' | 'spiral' = 'normal') {
    const defaults = { particleCount: 100, spread: 70 };
    
    if(style === 'spiral') {
      const count = 200;
      const defaults = { origin: { y: 0.7 } };
      
      await Promise.all([
        confetti({ ...defaults, particleCount: count, angle: 60, spread: 55 }),
        confetti({ ...defaults, particleCount: count, angle: 120, spread: 55 }),
        confetti({ ...defaults, particleCount: count, angle: 180, spread: 55 })
      ]);
    } else {
      await confetti(defaults);
    }
  }
}