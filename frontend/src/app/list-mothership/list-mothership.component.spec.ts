import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMothershipComponent } from './list-mothership.component';

describe('ListMothershipComponent', () => {
  let component: ListMothershipComponent;
  let fixture: ComponentFixture<ListMothershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMothershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMothershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
