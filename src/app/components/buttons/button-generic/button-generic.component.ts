import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

/**
 * Generic button component.
 */
@Component({
  selector: 'app-button-generic',
  templateUrl: './button-generic.component.html',
  styleUrls: ['./button-generic.component.scss'],
})
export class ButtonGenericComponent implements OnInit {

  /**
   * On click output event.
   */
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Text input.
   */
  @Input() text: string;

  /**
   * Disabled input.
   */
  @Input() isDisabled: boolean = false;

  /**
   * Is outline button.
   */
  @Input() isOutline: boolean = false;

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() { }

}
