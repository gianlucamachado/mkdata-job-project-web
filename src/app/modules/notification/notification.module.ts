import { NgModule } from '@angular/core';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { SharedModule } from '../../shared/shared.module';
import { NotificationService } from './notification.service';

@NgModule({
  imports: [
    SharedModule,
    NotificationRoutingModule,
  ],
  declarations: [
    NotificationComponent,
  ],
  providers: [NotificationService],
})
export class NotificationModule { }
