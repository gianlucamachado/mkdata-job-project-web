import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserService } from './user.service';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule,
  ],
  declarations: [
    UserComponent,
  ],
  providers: [
    UserService,
  ],
})
export class UserModule { }
