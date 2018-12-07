import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';

@NgModule({
  imports: [
    SharedModule,
    ReportRoutingModule,
  ],
  declarations: [
    ReportComponent,
  ],
})
export class ReportModule { }
