import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalSideMenuComponent } from './vertical-side-menu.component';

describe('VerticalSideMenuComponent', () => {
  let component: VerticalSideMenuComponent;
  let fixture: ComponentFixture<VerticalSideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerticalSideMenuComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
