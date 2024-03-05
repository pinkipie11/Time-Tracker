import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeentriesListComponent } from './timeentries-list.component';

describe('TimeentriesListComponent', () => {
  let component: TimeentriesListComponent;
  let fixture: ComponentFixture<TimeentriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeentriesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeentriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
