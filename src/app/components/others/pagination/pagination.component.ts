import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ITEMS_PER_PAGE } from './pagination.constants';

/**
 * Pagination component
 *
 * Will list all page about list.
 */
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {

  /**
   * Number of items.
   */
  @Input() numberOfItems: number = 0;

  /**
   * Current page.
   */
  @Input() currentPage: number = 1;

  /**
   * On change page.
   */
  @Output() onChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Items per page.
   */
  public itemsPerPage: number = ITEMS_PER_PAGE;

  /**
   * left arrow.
   */
  public leftArrow: boolean = false;

  /**
   * right arrow.
   */
  public rightArrow: boolean = false;

  /**
   * Max number of pages.
   */
  public max: number = 1;

  /**
   * Min number of pages.
   */
  public min: number = 1;

  /**
   * Pages.
   */
  public pages: number[] = [];

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() { }

  /**
   * @ignore
   */
  ngOnChanges(changes: SimpleChanges): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    if (self.numberOfItems) {

      // decalre len
      self.max = 1;

      // initialize
      self.pages = [];

      // get max
      if (self.numberOfItems % self.itemsPerPage === 0) {
        self.max = Math.floor(self.numberOfItems / self.itemsPerPage);
      } else {
        self.max = Math.floor(self.numberOfItems / self.itemsPerPage) + 1;
      }

      // get pages
      for (let i = 0; i < self.max; i++) {
        self.pages.push(i + 1);
      }
    }

    if (self.currentPage > self.max) {
      // set new max
      self.currentPage = self.max;

      // emit event
      setTimeout(() => self.onSelectPage(self.max), 10);
    }
  }

  /**
   * On select.
   */
  onSelectPage(index: number): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // set new page
    self.currentPage = index;

    // emit event
    self.onChange.emit(self.currentPage);
  }

  /**
   * Increase current page.
   */
  increase(): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    if (self.currentPage < self.max) {
      // increase value
      self.currentPage++;

      // emit event
      self.onChange.emit(self.currentPage);
    }
  }

  /**
   * Decrease current page.
   */
  decrease(): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    if (self.currentPage > self.min) {
      // decrease value
      self.currentPage--;

      // emit event
      self.onChange.emit(self.currentPage);
    }
  }

  /**
   * Hide item pagination
   * @param index Index of page.
   * @param current Current page.
   */
  disabledItem(index: number, current: number): boolean {

    // interval variables
    let start = 0;
    let end = 0;

    if (current < 5) {
      start = 0;
      end = 5;
    } else if (current > this.pages.length - 5) {
      start = this.pages.length - 5;
      end = this.pages.length;
    } else {
      start = current - 3;
      end = current + 2;
    }

    return (index >= start && index < end) ? false : true;
  }

}
