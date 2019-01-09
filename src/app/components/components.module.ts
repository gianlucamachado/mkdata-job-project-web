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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
  ],
  declarations: [
    LoadingPageComponent,
    FormLoginComponent,
    SearchBarComponent,
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
  ],
  exports: [
    SpinnerComponent,
    SweetMessageComponent,
    ItemFilterHeaderComponent,
    ButtonFilterComponent,
    ItemLoadingComponent,
    LoadingPageComponent,
    FormLoginComponent,
    SearchBarComponent,
    PhotoCircleComponent,
    ButtonAddComponent,
    ButtonGenericComponent,
    ErrorMessageComponent,
    PaginationComponent,
    LoadingPageTransparentComponent,
  ],
})
export class ComponentsModule { }
