// src/app/services/social.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SocialService {
  shareCapsule(capsule: TimeCapsule) {
    const text = `Check out my time capsule for ${capsule.targetDate.toDateString()}!`;
    const url = `https://my-time-capsules.com/capsules/${capsule.id}`;
    
    if(navigator.share) {
      navigator.share({ title: 'My Time Capsule', text, url });
    } else {
      // Fallback for desktop
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' ' + url)}`);
    }
  }
}