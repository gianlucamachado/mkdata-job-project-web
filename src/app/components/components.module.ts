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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
  ],
  exports: [
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
