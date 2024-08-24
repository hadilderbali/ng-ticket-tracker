import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectUserToTicketComponent } from './affect-user-to-ticket.component';

describe('AffectUserToTicketComponent', () => {
  let component: AffectUserToTicketComponent;
  let fixture: ComponentFixture<AffectUserToTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectUserToTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectUserToTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
