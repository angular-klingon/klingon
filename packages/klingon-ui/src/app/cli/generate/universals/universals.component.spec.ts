import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalsComponent } from './universals.component';

describe('UniversalsComponent', () => {
  let component: UniversalsComponent;
  let fixture: ComponentFixture<UniversalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
