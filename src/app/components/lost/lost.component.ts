import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { SeoHelper } from '../../helpers/seo.helper';

@Component({
  selector: 'lost',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: '../../templates/lost.html',
})

export class LostComponent {

  constructor(
    private _seoHelper: SeoHelper
  ) {}

  public ngOnInit() {
    this._seoHelper.setMeta('404 Not Found');
  }
}
