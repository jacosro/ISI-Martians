import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePassengerComponent } from './create-passenger.component';

describe('CreatePassengerComponent', () => {
  let component: CreatePassengerComponent;
  let fixture: ComponentFixture<CreatePassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
