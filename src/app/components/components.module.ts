import { ButtonSwalAlertComponent } from './buttons/button-swal-alert/button-swal-alert.component';
import { SpinnerComponent } from './others/spinner/spinner.component';
import { SweetMessageComponent } from './others/sweet-message/sweet-message.component';
import { PaginationComponent } from './others/pagination/pagination.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingPageComponent } from './others/loading-page/loading-page.component';
import { FormLoginComponent } from './forms/form-login/form-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './others/search-bar/search-bar.component';
import { PhotoCircleComponent } from './others/photo-circle/photo-circle.component';
import { ButtonAddComponent } from './buttons/button-add/button-add.component';
import { ButtonGenericComponent } from './buttons/button-generic/button-generic.component';
import { ErrorMessageComponent } from './others/error-message/error-message.component';
import { LoadingPageTransparentComponent } from './others/loading-page-transparent/loading-page-transparent.component';
import { ItemLoadingComponent } from './others/item-loading/item-loading.component';
import { ButtonFilterComponent } from './buttons/button-filter/button-filter.component';
import { ItemFilterHeaderComponent } from './others/item-filter-header/item-filter-header.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { DynamicFormComponent } from './others/search-bar/dynamic-form/dynamic-form.component';
import { DynamicQuestionComponent } from './others/search-bar/dynamic-form/dynamic-question/dynamic-question.component';
import { QuestionControlService } from '../providers/form/question-control.service';
import { CreateformsService } from '../providers/form/createforms.service';

import { NgxMaskModule } from 'ngx-mask';
import { MaterializeModule } from 'angular2-materialize';
import { RequestStatusService } from '../providers/utils/request-status.service';
import { InputCommentComponent } from './forms/input-comment/input-comment.component';
import { SweetDefaultOptionComponent } from './others/sweet-default-option/sweet-default-option.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,
    NgxMaskModule.forRoot(),
    SweetAlert2Module.forRoot(),
  ],
  declarations: [
    LoadingPageComponent,
    FormLoginComponent,
    SearchBarComponent,
    DynamicFormComponent,
    DynamicQuestionComponent,
    PhotoCircleComponent,
    ButtonAddComponent,
    ButtonGenericComponent,
    ErrorMessageComponent,
    PaginationComponent,
    LoadingPageTransparentComponent,
    ItemLoadingComponent,
    ButtonFilterComponent,
    ItemFilterHeaderComponent,
    SweetMessageComponent,
    SpinnerComponent,
    InputCommentComponent,
    ButtonSwalAlertComponent,
    SweetDefaultOptionComponent,
  ],
  providers: [
    QuestionControlService,
    CreateformsService,
    RequestStatusService,
  ],
  exports: [
    SweetDefaultOptionComponent,
    ButtonSwalAlertComponent,
    InputCommentComponent,
    SpinnerComponent,
    SweetMessageComponent,
    ItemFilterHeaderComponent,
    ButtonFilterComponent,
    ItemLoadingComponent,
    LoadingPageComponent,
    FormLoginComponent,
    SearchBarComponent,
    DynamicFormComponent,
    DynamicQuestionComponent,
    PhotoCircleComponent,
    ButtonAddComponent,
    ButtonGenericComponent,
    ErrorMessageComponent,
    PaginationComponent,
    LoadingPageTransparentComponent,
    NgxMaskModule,
  ],
})
export class ComponentsModule { }
