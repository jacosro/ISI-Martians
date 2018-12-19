import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpaceshipComponent } from './list-spaceship.component';

describe('ListSpaceshipComponent', () => {
  let component: ListSpaceshipComponent;
  let fixture: ComponentFixture<ListSpaceshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSpaceshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSpaceshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
