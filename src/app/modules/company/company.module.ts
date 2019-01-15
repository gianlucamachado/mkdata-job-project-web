import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyService } from './company.service';

@NgModule({
  imports: [
    SharedModule,
    CompanyRoutingModule,
  ],
  declarations: [
    CompanyComponent,
  ],
  providers: [
    CompanyService,
  ],
})
export class CompanyModule { }
