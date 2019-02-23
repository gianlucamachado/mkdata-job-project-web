import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyService } from './company.service';
import { CustomerEditUpdatePageComponent } from './customer-edit-update-page/customer-edit-update-page.component';

@NgModule({
  imports: [
    SharedModule,
    CompanyRoutingModule,
  ],
  declarations: [
    CompanyComponent,
    CustomerEditUpdatePageComponent,
  ],
  providers: [
    CompanyService,
  ],
})
export class CompanyModule { }
