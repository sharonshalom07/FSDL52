import { Component, Input } from '@angular/core';
import { TimeCapsule } from '../../services/time-capsule.service';
import { CommonModule } from '@angular/common';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer.component';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, CountdownTimerComponent,DatePipe], // Add missing imports
  selector: 'app-time-capsule-list',
  templateUrl: './time-capsule-list.component.html',
})
export class TimeCapsuleListComponent {
  @Input({ required: true }) capsules!: TimeCapsule[];

  trackById(index: number, capsule: TimeCapsule) {
    return capsule.id;
  }
}