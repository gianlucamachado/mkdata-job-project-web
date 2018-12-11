import { Component, OnInit, Output, EventEmitter } from '@angular/core';

/**
 * Filter header component
 *
 * This is a header used in all side menu filters.
 */
@Component({
  selector: 'app-item-filter-header',
  templateUrl: './item-filter-header.component.html',
  styleUrls: ['./item-filter-header.component.scss'],
})
export class ItemFilterHeaderComponent implements OnInit {

  /**
   * On close event.
   */
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() { }

}
