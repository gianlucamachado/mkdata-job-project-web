import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Pagination } from '../../../providers/utils/list-controller.service';

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
   * Object to control pagination.
   */
  @Input() pager: Pagination;

  /**
   * emit a new page selected.
   */
  @Output() pagination: EventEmitter<number> = new EventEmitter<number>();

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() { }

}
