import { Component, effect, inject } from '@angular/core';
import { TimeCapsuleService, TimeCapsule } from './services/time-capsule.service'; // Add type import
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  selector: 'app-root',
  template: `
    <header>
      <h1>🕰️ Time Capsule Journal</h1>
      <nav>
        <a routerLink="/">Home</a>
        <a routerLink="/create">New Capsule</a>
      </nav>
    </header>
    
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  private capsuleService = inject(TimeCapsuleService);

  constructor() {
    effect(() => {
      // Get the signal value correctly
      const capsules = this.capsuleService.getCapsules()();
      
      // Add proper type annotation
      capsules.forEach((c: TimeCapsule) => {
        c.isUnlocked = new Date() > new Date(c.targetDate);
      });
    });
  }
}