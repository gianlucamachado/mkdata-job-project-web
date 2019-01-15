import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { PanelButtonComponent } from './panel-button/panel-button.component';
import { ReportService } from './report.service';

@NgModule({
  imports: [
    SharedModule,
    ReportRoutingModule,
  ],
  declarations: [
    ReportComponent,
    PanelButtonComponent,
  ],
  providers: [ReportService],
})
export class ReportModule { }
