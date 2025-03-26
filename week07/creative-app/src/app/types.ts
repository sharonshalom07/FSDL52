export type Theme = 'cyberpunk' | 'retro' | 'futuristic';
export type EncryptionLevel = 'basic' | 'advanced';

export interface TimeCapsule {
  id: string;
  message: string;
  targetDate: Date;
  createdAt: Date;
  theme: Theme;
  isUnlocked: boolean;
  encryptionLevel: EncryptionLevel;
  passwordHash?: string;
}