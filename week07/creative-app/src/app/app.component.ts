import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  template: `
    <header>
      <h1>🕰️ Time Capsule Journal</h1>
      <nav>
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
        <a routerLink="/create" routerLinkActive="active">New Capsule</a>
      </nav>
    </header>
    
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    nav {
      padding: 1rem;
      background: #000;
      border-bottom: 2px solid #00ff9d;
      
      a {
        color: #00ff9d;
        text-decoration: none;
        margin-right: 1rem;
        padding: 0.5rem 1rem;
        border: 1px solid transparent;
        transition: all 0.3s;

        &.active {
          border-color: #00ff9d;
          background: rgba(0, 255, 157, 0.1);
        }

        &:hover {
          text-shadow: 0 0 15px #00ff9d;
        }
      }
    }

    .content {
      padding: 2rem;
    }
  `]
})
export class AppComponent {}