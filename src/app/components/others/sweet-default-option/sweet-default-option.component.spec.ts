import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SweetDefaultOptionComponent } from './sweet-default-option.component';

describe('SweetDefaultOptionComponent', () => {
  let component: SweetDefaultOptionComponent;
  let fixture: ComponentFixture<SweetDefaultOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SweetDefaultOptionComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SweetDefaultOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
