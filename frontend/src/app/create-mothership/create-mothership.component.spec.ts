import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMothershipComponent } from './create-mothership.component';

describe('CreateMothershipComponent', () => {
  let component: CreateMothershipComponent;
  let fixture: ComponentFixture<CreateMothershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMothershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMothershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
