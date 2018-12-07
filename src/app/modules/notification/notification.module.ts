import { NgModule } from '@angular/core';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    NotificationRoutingModule,
  ],
  declarations: [
    NotificationComponent,
  ],
})
export class NotificationModule { }
