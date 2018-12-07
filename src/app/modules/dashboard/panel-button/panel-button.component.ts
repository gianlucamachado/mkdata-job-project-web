import { Component, OnInit, Input } from '@angular/core';

/**
 * Panel component.
 */
@Component({
  selector: 'app-panel-button',
  templateUrl: './panel-button.component.html',
  styleUrls: ['./panel-button.component.scss'],
})
export class PanelButtonComponent implements OnInit {

  /**
   * Panel info received by param
   */
  @Input() info: any;

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() { }

}
