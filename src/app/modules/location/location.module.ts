import { NgModule } from '@angular/core';

import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    LocationRoutingModule,
  ],
  declarations: [
    LocationComponent,
  ],
})
export class LocationModule { }
