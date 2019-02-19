import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  console.log = () => { };
  console.table = () => { };
  console.error('%cWe are on production!!\n', 'font-weight: bold; font-size:50px; color: red; text-shadow: 1px 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black;', 'font-weight: bold; font-size:50px; color: #377BB5; text-shadow: 1px 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black;');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
