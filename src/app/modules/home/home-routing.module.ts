import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuardService } from './home-guard/home-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [HomeGuardService],
    children: [
      { path: '', redirectTo: 'empresa' },
      { path: 'empresa', loadChildren: '../company/company.module#CompanyModule' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
