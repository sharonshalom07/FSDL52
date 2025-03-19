// src/app/services/time-capsule.service.ts
import { Injectable, signal, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface TimeCapsule {
  id: string;
  message: string;
  targetDate: Date;
  createdAt: Date;
  theme: 'cyberpunk' | 'retro' | 'futuristic';
  isUnlocked: boolean;
  encryptionLevel: 'basic' | 'advanced';
  passwordHash?: string;
  securityQuestion?: string;
  securityAnswerHash?: string;
}

@Injectable({ providedIn: 'root' })
export class TimeCapsuleService {
  private capsules = signal<TimeCapsule[]>([]);
  private readonly storageKey = 'time-capsules-v1';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeFromStorage();
    
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.capsules()));
      }
    });
  }
  verifyPassword(capsuleId: string, password: string): boolean {
    const capsule = this.capsules().find(c => c.id === capsuleId);
    return capsule?.passwordHash === this.hashString(password);
  }
  
  private hashString(str: string): string {
    return btoa(unescape(encodeURIComponent(str)));
  }

  private initializeFromStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(this.storageKey);
      this.capsules.set(data ? JSON.parse(data) : []);
    }
  }

  getCapsules() {
    return this.capsules.asReadonly();
  }

  addCapsule(capsule: Omit<TimeCapsule, 'id' | 'createdAt' | 'isUnlocked'>) {
    const newCapsule: TimeCapsule = {
      ...capsule,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      isUnlocked: new Date() > new Date(capsule.targetDate)
    };
    this.capsules.update(caps => [newCapsule, ...caps]);
  }
}