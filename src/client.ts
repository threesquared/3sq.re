import 'angular2-universal/polyfills';

import { enableProdMode } from '@angular/core';
import { prebootComplete } from 'angular2-universal';

enableProdMode();

import { ngApp } from './main.browser';

document.addEventListener('DOMContentLoaded', () => {

  ngApp().then(prebootComplete);

});
