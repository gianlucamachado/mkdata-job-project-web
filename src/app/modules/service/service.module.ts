import { NgModule } from '@angular/core';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';
import { SharedModule } from '../../shared/shared.module';
import { ServiceFormComponent } from './service-form/service-form.component';

@NgModule({
  imports: [
    SharedModule,
    ServiceRoutingModule,
  ],
  declarations: [
    ServiceComponent,
    ServiceFormComponent,
  ],
})
export class ServiceModule { }
