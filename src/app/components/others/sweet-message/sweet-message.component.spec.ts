import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SweetMessageComponent } from './sweet-message.component';

describe('SweetMessageComponent', () => {
  let component: SweetMessageComponent;
  let fixture: ComponentFixture<SweetMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SweetMessageComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SweetMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
