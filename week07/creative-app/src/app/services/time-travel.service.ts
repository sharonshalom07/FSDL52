// src/app/services/time-travel.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TimeTravelService {
  createTimeWarpEffect(duration: number) {
    const app = document.querySelector('app-root') as HTMLElement;
    app.style.animation = `timeWarp ${duration}ms linear`;
    setTimeout(() => app.style.animation = '', duration);
  }
}

