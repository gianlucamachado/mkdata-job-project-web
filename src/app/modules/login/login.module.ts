import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from './../../shared/shared.module';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    LoginRoutingModule,
    SharedModule,
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    LoginService,
  ],
})
export class LoginModule { }
