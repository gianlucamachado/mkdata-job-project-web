import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSideMenuPhotoComponent } from './home-side-menu-photo.component';

describe('HomeSideMenuPhotoComponent', () => {
  let component: HomeSideMenuPhotoComponent;
  let fixture: ComponentFixture<HomeSideMenuPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSideMenuPhotoComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSideMenuPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
