import { HomeGuardService } from './home-guard/home-guard.service';
import { HomeService } from './home.service';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Components from home module
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { HomeSideMenuPhotoComponent } from './home-side-menu-photo/home-side-menu-photo.component';
import { HomeProfileComponent } from './home-profile/home-profile.component';
import { VerticalSideMenuComponent } from './vertical-side-menu/vertical-side-menu.component';
import { OneSignalService } from './one-signal.service';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    HomeNavbarComponent,
    HomeProfileComponent,
    HomeSideMenuPhotoComponent,
    VerticalSideMenuComponent,
  ],
  providers: [
    HomeService,
    HomeGuardService,
    OneSignalService,
  ],
  exports: [],
})
export class HomeModule { }
