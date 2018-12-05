import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAirshipComponent } from './create-airship.component';

describe('CreateAirshipComponent', () => {
  let component: CreateAirshipComponent;
  let fixture: ComponentFixture<CreateAirshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAirshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAirshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
