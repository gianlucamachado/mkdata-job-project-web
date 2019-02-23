import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CustomerEditUpdatePageComponent } from './customer-edit-update-page/customer-edit-update-page.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
  },
  {
    path: 'novo',
    component: CustomerEditUpdatePageComponent,
  },
  {
    path: 'editar/:customer_id',
    component: CustomerEditUpdatePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule { }
