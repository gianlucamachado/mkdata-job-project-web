import { UtilsService } from './../../../providers/utils/utils.service';
import { Component, OnInit, Input } from '@angular/core';

/**
 * Item photo component
 *
 * Show item photo.
 */
@Component({
  selector: 'app-photo-circle',
  templateUrl: './photo-circle.component.html',
  styleUrls: ['./photo-circle.component.scss'],
})
export class PhotoCircleComponent implements OnInit {

  /**
   * Photo url.
   */
  @Input() url: string;

  /**
   * @ignore
   */
  constructor(
    public utilsService: UtilsService,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() { }

}
