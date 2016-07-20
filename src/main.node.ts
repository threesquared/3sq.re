import {
  REQUEST_URL,
  ORIGIN_URL,
  NODE_LOCATION_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  ExpressEngineConfig
} from 'angular2-universal';

import { provideRouter } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { AppComponent } from './app/components/app/app.component';
import { HttpService } from './app/services/http.service';
import { CacheService } from './app/services/cache.service';
import { WordpressService } from './app/services/wordpress.service';
import { SeoHelper } from './app/helpers/seo.helper';
import { APP_ROUTER_PROVIDERS } from './app/router/app.routes';

export function ngApp(req, res) {
  let baseUrl = '/';
  let url = req.originalUrl || '/';

  let config: ExpressEngineConfig = {
    directives: [
      AppComponent
    ],
    platformProviders: [
      {provide: ORIGIN_URL, useValue: 'http://localhost:3000'},
      {provide: APP_BASE_HREF, useValue: baseUrl},
    ],
    providers: [
      {provide: REQUEST_URL, useValue: url},
      NODE_HTTP_PROVIDERS,
      APP_ROUTER_PROVIDERS,
      NODE_LOCATION_PROVIDERS,
      Title,
      HttpService,
      CacheService,
      WordpressService,
      SeoHelper
    ],
    async: true,
    preboot: false
  };

  res.render('index', config);
}
