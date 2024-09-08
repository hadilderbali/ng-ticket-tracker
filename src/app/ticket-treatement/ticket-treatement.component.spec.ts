import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTreatementComponent } from './ticket-treatement.component';

describe('TicketTreatementComponent', () => {
  let component: TicketTreatementComponent;
  let fixture: ComponentFixture<TicketTreatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketTreatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketTreatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
