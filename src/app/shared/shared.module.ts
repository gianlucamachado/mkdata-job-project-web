import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';

// modules
import { ComponentsModule } from './../components/components.module';

// common components
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class SharedModule { }
