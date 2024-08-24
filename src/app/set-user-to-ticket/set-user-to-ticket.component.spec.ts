import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUserToTicketComponent } from './set-user-to-ticket.component';

describe('SetUserToTicketComponent', () => {
  let component: SetUserToTicketComponent;
  let fixture: ComponentFixture<SetUserToTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetUserToTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetUserToTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
