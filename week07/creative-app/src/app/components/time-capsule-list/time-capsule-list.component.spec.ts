import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeCapsuleListComponent } from './time-capsule-list.component';

describe('TimeCapsuleListComponent', () => {
  let component: TimeCapsuleListComponent;
  let fixture: ComponentFixture<TimeCapsuleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeCapsuleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeCapsuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
