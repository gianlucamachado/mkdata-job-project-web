import { UtilsService } from './../../../providers/utils/utils.service';
import { Component, OnInit, Input } from '@angular/core';

/**
 * ### Home Side Menu Photo Component
 *
 * This component is a photo that will show in side menu.
 */
@Component({
  selector: 'app-home-side-menu-photo',
  templateUrl: './home-side-menu-photo.component.html',
  styleUrls: ['./home-side-menu-photo.component.scss'],
})
export class HomeSideMenuPhotoComponent implements OnInit {

  /**
   * User photo.
   */
  @Input() photoUrl: string;

  /**
   * Sizze image.
   */
  @Input() size: string = '60px';

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
