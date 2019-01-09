import { PanelButtonComponent } from './panel-button/panel-button.component';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardService } from './dashboard.service';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    PanelButtonComponent,
  ],
  providers: [DashboardService],
})
export class DashboardModule { }
