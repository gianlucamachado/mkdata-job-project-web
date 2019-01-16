import { SolicitationComponent } from './solicitation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitationDetailsComponent } from './solicitation-details/solicitation-details.component';

const routes: Routes = [
  {
    path: '',
    component: SolicitationComponent,
  },
  {
    path: 'detalhes/:request_id',
    component: SolicitationDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitationRoutingModule { }
