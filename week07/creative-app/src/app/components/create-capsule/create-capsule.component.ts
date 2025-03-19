import { Component, Output, EventEmitter, ViewChild, ElementRef, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-create-capsule',
  templateUrl: './create-capsule.component.html',
})
export class CreateCapsuleComponent {
  private fb = inject(FormBuilder);
  today = new Date().toISOString().split('T')[0]; // Add this property
  
  @Output() capsuleCreated = new EventEmitter<void>();
  @ViewChild('messageInput') messageInput!: ElementRef;

  capsuleForm = this.fb.group({
    message: ['', [Validators.required, Validators.minLength(10)]],
    targetDate: [this.today, [Validators.required]], // Use the property
    theme: ['future', Validators.required]
  });

  onSubmit() {
    if (this.capsuleForm.valid) {
      this.capsuleCreated.emit();
      this.capsuleForm.reset();
      this.messageInput.nativeElement.focus();
    }
  }
}