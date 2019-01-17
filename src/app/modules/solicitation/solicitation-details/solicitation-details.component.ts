import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitationService } from '../solicitation.service';
import { UtilsService } from '../../../providers/utils/utils.service';
import { SweetMessageComponent } from '../../../components/others/sweet-message/sweet-message.component';
import { ButtonSwalAlertComponent } from '../../../components/buttons/button-swal-alert/button-swal-alert.component';

/**
 * @ignore
 */
@Component({
  selector: 'app-solicitation-details',
  templateUrl: './solicitation-details.component.html',
  styleUrls: ['./solicitation-details.component.scss'],
})
export class SolicitationDetailsComponent implements OnInit {

  /**
   * Solicitations.
   */
  public solicitation: any;

  /**
   * Object values
   */
  public objectValues = Object.values;

  /**
   * Carrousel view child.
   */
  @ViewChild('carousel') carouselElement;

  /**
   * Materialize actions.
   */
  public actions: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Show initialized.
   */
  public showInitialized: boolean = false;

  /**
   * index.
   */
  public index: number = 0;

  /**
   * Loading controller.
   */
  public loading: boolean = true;

  /**
   * Loading page controller.
   */
  public loadingTransparent: boolean = false;

  /**
   * Number method
   */
  public number: NumberConstructor = Number;

  /**
   * Type
   */
  public type: boolean;

  /**
   * Swal options.
   */
  public swalOptions: any = {
    title: '',
    content: '',
    button_left: '',
    button_right: '',
  };

  /**
   * Swal question options.
   */
  public swalQuestionOptions: any = {
    title: '',
    content: '',
    button: 'Entendi',
  };

  /**
   * View message child.
   */
  @ViewChild(SweetMessageComponent) messageComponent: SweetMessageComponent;

  /**
   * View message child.
   */
  @ViewChild(ButtonSwalAlertComponent) questionComponent: ButtonSwalAlertComponent;

  /**
   * @ignore
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private solicitationService: SolicitationService,
    public utilsService: UtilsService,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {

    // request id
    const id: string = this.activatedRoute.snapshot.paramMap.get('request_id');

    // dismiss loading
    setTimeout(async () => {

      // get agencies
      try {

        // get solicitation
        this.solicitation = await this.solicitationService.getRequest(id);

        // log solicitations
        console.log(this.solicitation);

      } catch (e) {
        console.error(e);
      }

      // example of a hacky way to add an image to the carousel dynamically
      window.setTimeout(() => {
        if (this.carouselElement) {
          this.carouselElement.nativeElement.classList.toggle('initialized');
          this.actions.emit('carousel');
        }
      }, 1000);

      // dismiss loading
      this.loading = false;

      // dismiss loading
      this.loadingTransparent = false;

    }, 500);

  }

  /**
   * Change status
   */
  async changeStatus(type: boolean) {

    // log
    console.log('changeStatus(status: any)');

    // present loading
    this.loadingTransparent = true;

    // get request status id
    const id: number = (type) ? 2 : 3;

    // message label
    const label: string = (type) ? 'aprovada' : 'recusada';

    // request id
    const req: string = this.activatedRoute.snapshot.paramMap.get('request_id');

    // set as in progress
    try {

      if (type) {

        // create comment
        const response: any = await this.solicitationService.changeStatus({ request_id: req, request_status_id: id });

        // log response
        console.log(response);

      } else {

        // create comment
        const response: any = await this.solicitationService.refusePurchaseRequest({ request_id: req, purchase_status_id: id }, this.solicitation.purchase_request.purchase_request_id);

        // log response
        console.log(response);

      }

      // message
      this.swalOptions.title = 'Sucesso';
      this.swalOptions.content = `Solicitação de compra ${label}.`;
      this.swalOptions.button = 'Entendi';

      // show message
      this.messageComponent.show();

    } catch (e) {

      // log error
      console.error(e);

    }

    // update values
    this.ngOnInit();

  }

  /**
   * Add new comment.
   */
  async addComment(input: string) {

    // log
    console.log(input);

    // try/catch
    try {

      // present loading
      this.loadingTransparent = true;

      // create body
      const body: any = {
        comment_message: input,
        request_id: this.solicitation.request_id,
      };

      // create comment
      const response: any = await this.solicitationService.createComment(body);

      // log response
      console.log(response);

      // get solicitation
      this.solicitation = await this.solicitationService.getRequest(this.solicitation.request_id);

      // log solicitations
      console.log(this.solicitation);

    } catch (e) {

      // log error
      console.error(e);

    }

    // dismiss loading
    setTimeout(() => this.loadingTransparent = false, 500);
  }

  /**
   * Open change status modal.
   */
  openChangeStatusModal(type: boolean) {

    // log
    console.log('openChangeStatusModal()');

    // default values
    this.swalQuestionOptions.title = 'Solicitação de compra';
    this.swalQuestionOptions.button_left = 'Nâo';
    this.swalQuestionOptions.button_right = 'Sim';
    this.type = type;

    // message
    if (type) {
      this.swalQuestionOptions.content = 'Deseja realmente aprovar a solicitação de compra?';
    } else {
      this.swalQuestionOptions.content = 'Deseja realmente recusar a solicitação de compra?';
    }

    // show message
    this.questionComponent.show();

  }

}
