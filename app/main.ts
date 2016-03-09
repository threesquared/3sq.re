import { bootstrap } from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { provide, ComponentRef } from 'angular2/core';
import { AppComponent } from './components/app/app.component';
import { appInjector } from './injectors/app.injector';
import { HttpService } from './services/http.service';
import { CacheService } from './services/cache.service';
import { WordpressService } from './services/wordpress.service';

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, HttpService, CacheService, WordpressService]).then((appRef: ComponentRef) => {
  appInjector(appRef.injector);
});
