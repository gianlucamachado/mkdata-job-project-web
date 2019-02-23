import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditUpdatePageComponent } from './customer-edit-update-page.component';

describe('CustomerEditUpdatePageComponent', () => {
  let component: CustomerEditUpdatePageComponent;
  let fixture: ComponentFixture<CustomerEditUpdatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerEditUpdatePageComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
