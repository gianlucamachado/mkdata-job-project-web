import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLoadingComponent } from './item-loading.component';

describe('ItemLoadingComponent', () => {
  let component: ItemLoadingComponent;
  let fixture: ComponentFixture<ItemLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemLoadingComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
