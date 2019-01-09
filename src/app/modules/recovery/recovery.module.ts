import { NgModule } from '@angular/core';

import { RecoveryRoutingModule } from './recovery-routing.module';
import { RecoveryComponent } from './recovery.component';
import { RecoveryService } from './recovery.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RecoveryRoutingModule,
  ],
  declarations: [
    RecoveryComponent,
  ],
  providers: [
    RecoveryService,
  ],
})
export class RecoveryModule { }
