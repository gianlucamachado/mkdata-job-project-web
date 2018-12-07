import { Component, OnInit, Output, EventEmitter } from '@angular/core';

/**
 * Add button component.
 */
@Component({
  selector: 'app-button-add',
  templateUrl: './button-add.component.html',
  styleUrls: ['./button-add.component.scss'],
})
export class ButtonAddComponent implements OnInit {

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
