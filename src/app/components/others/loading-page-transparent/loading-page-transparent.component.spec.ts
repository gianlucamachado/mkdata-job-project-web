import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPageTransparentComponent } from './loading-page-transparent.component';

describe('LoadingPageTransparentComponent', () => {
  let component: LoadingPageTransparentComponent;
  let fixture: ComponentFixture<LoadingPageTransparentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingPageTransparentComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingPageTransparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
