import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpaceshipComponent } from './create-spaceship.component';

describe('CreateSpaceshipComponent', () => {
  let component: CreateSpaceshipComponent;
  let fixture: ComponentFixture<CreateSpaceshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSpaceshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSpaceshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
