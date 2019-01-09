import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { SolicitationRoutingModule } from './solicitation-routing.module';
import { SolicitationComponent } from './solicitation.component';
import { SolicitationService } from './solicitation.service';

@NgModule({
  imports: [
    SharedModule,
    SolicitationRoutingModule,
  ],
  declarations: [
    SolicitationComponent,
  ],
  providers: [SolicitationService],
})
export class SolicitationModule { }
