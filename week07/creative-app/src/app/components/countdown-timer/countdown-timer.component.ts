import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
})
export class CountdownTimerComponent implements OnChanges {
  @Input({ required: true }) targetDate!: Date;
  daysLeft = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['targetDate']) {
      this.updateTimer();
    }
  }

  private updateTimer() {
    const diff = new Date(this.targetDate).getTime() - Date.now();
    this.daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}