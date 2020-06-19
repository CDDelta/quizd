import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesLandingComponent } from './quizzes-landing.component';

describe('QuizzesLandingComponent', () => {
  let component: QuizzesLandingComponent;
  let fixture: ComponentFixture<QuizzesLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
