import { Component, OnInit, Input } from '@angular/core';

/**
 * Spinner component.
 */
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {

  /**
   * Square size in pixels, default is 40px;
   */
  @Input() sizeInPixels: string = '40px';

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() { }

}
