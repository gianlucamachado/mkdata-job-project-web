import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationDetailsComponent } from './solicitation-details.component';

describe('SolicitationDetailsComponent', () => {
  let component: SolicitationDetailsComponent;
  let fixture: ComponentFixture<SolicitationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitationDetailsComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
