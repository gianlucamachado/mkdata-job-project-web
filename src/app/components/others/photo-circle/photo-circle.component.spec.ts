import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoCircleComponent } from './photo-circle.component';

describe('PhotoCircleComponent', () => {
  let component: PhotoCircleComponent;
  let fixture: ComponentFixture<PhotoCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoCircleComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
