import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SwalComponent, SwalPartialTargets } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-sweet-default-option',
  templateUrl: './sweet-default-option.component.html',
  styleUrls: ['./sweet-default-option.component.scss'],
})
export class SweetDefaultOptionComponent implements OnInit {

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
   * Output confirm button clicked.
   */
  @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();

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
  close() {

    // clos swal
    this.generalSwal.nativeSwal.close();

    // em,mit event
    this.onConfirm.emit();

  }

}
