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
      { path: '', redirectTo: 'painel' },
      { path: 'painel', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
      { path: 'solicitacao', loadChildren: '../solicitation/solicitation.module#SolicitationModule' },
      { path: 'empresa', loadChildren: '../company/company.module#CompanyModule' },
      { path: 'servico', loadChildren: '../service/service.module#ServiceModule' },
      { path: 'local', loadChildren: '../location/location.module#LocationModule' },
      { path: 'usuario', loadChildren: '../user/user.module#UserModule' },
      { path: 'relatorio', loadChildren: '../report/report.module#ReportModule' },
      { path: 'notificacao', loadChildren: '../notification/notification.module#NotificationModule' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
