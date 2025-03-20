import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingSlideComponent } from './onboarding-slide.component';

describe('OnboardingSlideComponent', () => {
  let component: OnboardingSlideComponent;
  let fixture: ComponentFixture<OnboardingSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
