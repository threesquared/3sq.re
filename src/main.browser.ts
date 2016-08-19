import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { Title } from '@angular/platform-browser';

import { AppComponent } from './app/components/app/app.component';
import { HttpService } from './app/services/http.service';
import { CacheService } from './app/services/cache.service';
import { WordpressService } from './app/services/wordpress.service';
import { SeoHelper } from './app/helpers/seo.helper';

import { APP_ROUTER_PROVIDERS } from './app/router/app.routes';

export function ngApp() {
  return bootstrap(AppComponent, [APP_ROUTER_PROVIDERS, HTTP_PROVIDERS, Title, HttpService, CacheService, WordpressService, SeoHelper]);
}
