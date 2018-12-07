import { NgModule } from '@angular/core';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ServiceRoutingModule,
  ],
  declarations: [
    ServiceComponent,
  ],
})
export class ServiceModule { }
