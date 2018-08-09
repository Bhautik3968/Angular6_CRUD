import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorGlobalComponent } from './error-global.component';

describe('ErrorGlobalComponent', () => {
  let component: ErrorGlobalComponent;
  let fixture: ComponentFixture<ErrorGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
