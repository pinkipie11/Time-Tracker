import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeentryEditComponent } from './timeentry-edit.component';

describe('TimeentryEditComponent', () => {
  let component: TimeentryEditComponent;
  let fixture: ComponentFixture<TimeentryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeentryEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeentryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
