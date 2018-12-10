import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LocalStorageModule } from '@ngx-pwa/local-storage';
import { HttpClientModule } from '@angular/common/http';
import { UtilsService } from './providers/utils/utils.service';
import { HttpRequestService } from './providers/http-request/http-request.service';
import { StorageService } from './providers/storage/storage.service';
import { TokenService } from './providers/token/token.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'report-corporate-web' }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    LocalStorageModule,
    HttpClientModule,
  ],
  providers: [
    UtilsService,
    HttpRequestService,
    StorageService,
    TokenService,
  ],
  bootstrap: [
    AppComponent,
  ],
}) export class AppModule { }
