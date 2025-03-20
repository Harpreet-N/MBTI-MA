import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbtiResultComponent } from './mbti-result.component';

describe('MbtiResultComponent', () => {
  let component: MbtiResultComponent;
  let fixture: ComponentFixture<MbtiResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbtiResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MbtiResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
