import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFilterHeaderComponent } from './item-filter-header.component';

describe('ItemFilterHeaderComponent', () => {
  let component: ItemFilterHeaderComponent;
  let fixture: ComponentFixture<ItemFilterHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemFilterHeaderComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFilterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
