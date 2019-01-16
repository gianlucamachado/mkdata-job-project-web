import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { SwalPartialTargets, SwalComponent } from '@toverux/ngx-sweetalert2';

/**
 * Button swal alert component.
 */
@Component({
  selector: 'app-button-swal-alert',
  templateUrl: './button-swal-alert.component.html',
  styleUrls: ['./button-swal-alert.component.scss'],
})
export class ButtonSwalAlertComponent implements OnInit {

  /**
   * Swall confirm reference
   */
  @ViewChild('generalSwal') private generalSwal: SwalComponent;

  /**
   * Swal options.
   */
  @Input() swalOptions: any;

  /**
   * dismissible.
   */
  @Input() dismissible: boolean = true;

  /**
   * Output left button clicked.
   */
  @Output() onLeftButtonConfirm: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Output right button clicked.
   */
  @Output() onRightButtonConfirm: EventEmitter<void> = new EventEmitter<void>();

  /**
   * @ignore
   */
  constructor(
    public readonly swalTargets: SwalPartialTargets,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() { }

  /**
   * Show message.
   */
  show() {

    // show swal
    this.generalSwal.show();

  }

  /**
   * Close message.
   */
  left() {

    // clos swal
    this.generalSwal.nativeSwal.close();

    // em,mit event
    this.onLeftButtonConfirm.emit();

  }

  /**
   * Close message.
   */
  right() {

    // clos swal
    this.generalSwal.nativeSwal.close();

    // em,mit event
    this.onRightButtonConfirm.emit();

  }

}
