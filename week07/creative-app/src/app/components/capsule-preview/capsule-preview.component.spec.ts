import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapsulePreviewComponent } from './capsule-preview.component';

describe('CapsulePreviewComponent', () => {
  let component: CapsulePreviewComponent;
  let fixture: ComponentFixture<CapsulePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapsulePreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapsulePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
