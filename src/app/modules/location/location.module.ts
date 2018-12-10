import { NgModule } from '@angular/core';

import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { SharedModule } from '../../shared/shared.module';
import { LocationFormComponent } from './location-form/location-form.component';

@NgModule({
  imports: [
    SharedModule,
    LocationRoutingModule,
  ],
  declarations: [
    LocationComponent,
    LocationFormComponent,
  ],
})
export class LocationModule { }
