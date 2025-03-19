import { Injectable, signal, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


export interface TimeCapsule {
  id: string;
  message: string;
  targetDate: Date;
  createdAt: Date;
  theme: 'past' | 'future';
  isUnlocked: boolean;
}

@Injectable({ providedIn: 'root' })
export class TimeCapsuleService {
  private capsules = signal<TimeCapsule[]>([]);
  private readonly platformId: Object;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
    this.capsules.set(this.loadInitialData());
    
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('capsules', JSON.stringify(this.capsules()));
      }
    });
  }

  getCapsules() {
    return this.capsules.asReadonly();
  }

  addCapsule(capsule: Omit<TimeCapsule, 'id' | 'createdAt' | 'isUnlocked'>) {
    const newCapsule: TimeCapsule = {
      ...capsule,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      isUnlocked: new Date() > capsule.targetDate
    };
    this.capsules.update(caps => [...caps, newCapsule]);
  }

  private loadInitialData(): TimeCapsule[] {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('capsules');
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

}