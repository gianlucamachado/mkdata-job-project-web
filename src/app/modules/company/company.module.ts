import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyService } from './company.service';
import { CompanyFormComponent } from './company-form/company-form.component';

@NgModule({
  imports: [
    SharedModule,
    CompanyRoutingModule,
  ],
  declarations: [
    CompanyComponent,
    CompanyFormComponent,
  ],
  providers: [
    CompanyService,
  ],
})
export class CompanyModule { }
