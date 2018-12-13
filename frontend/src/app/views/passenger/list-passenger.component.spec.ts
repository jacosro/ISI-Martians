import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPassengerComponent } from './list-passenger.component';

describe('ListPassengerComponent', () => {
  let component: ListPassengerComponent;
  let fixture: ComponentFixture<ListPassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
