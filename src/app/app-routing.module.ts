import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Define App routes
 */
const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './modules/login/login.module#LoginModule',
  },
  {
    path: 'administrador',
    loadChildren: './modules/home/home.module#HomeModule',
  },
  {
    path: 'recuperar-acesso',
    loadChildren: './modules/recovery/recovery.module#RecoveryModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES),
  ],
  exports: [
    RouterModule,
  ],
  declarations: [],
})
export class AppRoutingModule { }
