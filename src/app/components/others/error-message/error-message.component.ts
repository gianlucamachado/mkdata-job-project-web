import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * ### Item Error Message
 *
 * Default no list item messaage.
 */
@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {

  /**
   * Message Text.
   */
  @Input() message: string;

  /**
   * Option to show try again button.
   */
  @Input() tryAgainButton: boolean = false;

  /**
   * Try get data click.
   */
  @Output() tryGetData: EventEmitter<void> = new EventEmitter();

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() { }

}
