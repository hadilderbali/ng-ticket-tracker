import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTeamComponent } from './set-team.component';

describe('SetTeamComponent', () => {
  let component: SetTeamComponent;
  let fixture: ComponentFixture<SetTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
