import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppshellsComponent } from './appshells.component';

describe('AppshellsComponent', () => {
  let component: AppshellsComponent;
  let fixture: ComponentFixture<AppshellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppshellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppshellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
