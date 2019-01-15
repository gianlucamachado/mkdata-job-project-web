import { NgModule } from '@angular/core';

import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { SharedModule } from '../../shared/shared.module';
import { LocationFormComponent } from './location-form/location-form.component';
import { LocationService } from './location.service';

@NgModule({
  imports: [
    SharedModule,
    LocationRoutingModule,
  ],
  declarations: [
    LocationComponent,
    LocationFormComponent,
  ],
  providers: [
    LocationService,
  ],
})
export class LocationModule { }
