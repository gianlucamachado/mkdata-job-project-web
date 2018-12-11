import { Component, OnInit, Output, EventEmitter } from '@angular/core';

/**
 * Button filter component.
 */
@Component({
  selector: 'app-button-filter',
  templateUrl: './button-filter.component.html',
  styleUrls: ['./button-filter.component.scss'],
})
export class ButtonFilterComponent implements OnInit {

  /**
   * On click output event.
   */
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() { }

}
