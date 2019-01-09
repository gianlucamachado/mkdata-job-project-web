import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LocalStorageModule } from '@ngx-pwa/local-storage';
import { StorageService } from './providers/storage/storage.service';
import { TokenService } from './providers/token/token.service';
import { PaginationService } from './components/others/pagination/pagination.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'report-corporate-web' }),
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    SharedModule.forRoot(),
    LocalStorageModule,
  ],
  providers: [
    StorageService,
    TokenService,
    PaginationService,
  ],
  bootstrap: [
    AppComponent,
  ],
}) export class AppModule { }
