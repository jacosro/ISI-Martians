import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MothershipComponent } from './mothership.component';

describe('MothershipComponent', () => {
  let component: MothershipComponent;
  let fixture: ComponentFixture<MothershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MothershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MothershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
