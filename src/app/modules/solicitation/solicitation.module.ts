import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { SolicitationRoutingModule } from './solicitation-routing.module';
import { SolicitationComponent } from './solicitation.component';

@NgModule({
  imports: [
    SharedModule,
    SolicitationRoutingModule,
  ],
  declarations: [
    SolicitationComponent,
  ],
})
export class SolicitationModule { }
