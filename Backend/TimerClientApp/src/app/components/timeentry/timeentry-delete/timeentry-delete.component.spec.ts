import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeentryDeleteComponent } from './timeentry-delete.component';

describe('TimeentryDeleteComponent', () => {
  let component: TimeentryDeleteComponent;
  let fixture: ComponentFixture<TimeentryDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeentryDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeentryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
