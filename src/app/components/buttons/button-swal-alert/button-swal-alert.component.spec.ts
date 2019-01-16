import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSwalAlertComponent } from './button-swal-alert.component';

describe('ButtonSwalAlertComponent', () => {
  let component: ButtonSwalAlertComponent;
  let fixture: ComponentFixture<ButtonSwalAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonSwalAlertComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonSwalAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
