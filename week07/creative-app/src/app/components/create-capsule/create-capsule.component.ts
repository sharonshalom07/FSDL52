import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TimeCapsuleService } from '../../services/time-capsule.service';
import { Router } from '@angular/router';
import { ConfettiService } from '../../services/confetti.service';
import { Theme, EncryptionLevel } from '../../types';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-capsule.component.html',
  styleUrls: ['./create-capsule.component.css']
})
export class CreateCapsuleComponent {
  private fb = inject(FormBuilder);
  private capsuleService = inject(TimeCapsuleService);
  private router = inject(Router);
  private confetti = inject(ConfettiService);

  @ViewChild('messageInput') messageInput!: ElementRef<HTMLTextAreaElement>;

  today = new Date().toISOString().split('T')[0];
  themes: Theme[] = ['cyberpunk', 'retro', 'futuristic'];
  encryptionLevels: EncryptionLevel[] = ['basic', 'advanced'];

  capsuleForm = this.fb.group({
    message: ['', [Validators.required, Validators.minLength(10)]],
    targetDate: [this.today, [Validators.required]],
    theme: ['cyberpunk' as Theme, Validators.required],
    encryptionLevel: ['basic' as EncryptionLevel, Validators.required]
  });

  async onSubmit() {
    if (this.capsuleForm.valid) {
      const formValue = this.capsuleForm.value;
      this.capsuleService.addCapsule({
        message: this.encryptMessage(formValue.message!),
        targetDate: new Date(formValue.targetDate!),
        theme: formValue.theme!,
        encryptionLevel: formValue.encryptionLevel!
      });
      
      await this.confetti.launch();
      this.router.navigate(['/']);
    }
  }

  private encryptMessage(message: string): string {
    return btoa(unescape(encodeURIComponent(message)));
  }
}