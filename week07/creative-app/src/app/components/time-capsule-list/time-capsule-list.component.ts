// src/app/components/time-capsule-list/time-capsule-list.component.ts
import { Component, inject } from '@angular/core';
import { TimeCapsuleService } from '../../services/time-capsule.service';
import { DatePipe } from '@angular/common';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [DatePipe, CountdownTimerComponent, RouterLink],
  templateUrl: './time-capsule-list.component.html',
  styleUrl: './time-capsule-list.component.css'
})
export class TimeCapsuleListComponent {
  capsuleService = inject(TimeCapsuleService);
  capsules = this.capsuleService.getCapsules();

  trackById(index: number, capsule: any) {
    return capsule.id;
  }

  decryptMessage(message: string): string {
    try {
      return decodeURIComponent(escape(atob(message)));
    } catch {
      return '🔒 Encrypted Message';
    }
  }
}