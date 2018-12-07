import { Component, OnInit, Input } from '@angular/core';

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
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() { }

}
