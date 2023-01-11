import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalitationsComponent } from './localitations.component';

describe('LocalitationsComponent', () => {
  let component: LocalitationsComponent;
  let fixture: ComponentFixture<LocalitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalitationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
