import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

window.onload = () => {
  document.body.appendChild(document.createElement('app-root'));
  platformBrowserDynamic().bootstrapModule(AppModule);
};
