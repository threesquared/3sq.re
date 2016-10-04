import { Component, OnInit } from '@angular/core';

import { SeoHelper } from '../../helpers/seo.helper';

@Component({
  selector: 'lost',
  templateUrl: '../../templates/lost.html',
})

export class LostComponent implements OnInit {

  constructor(
    private _seoHelper: SeoHelper
  ) {}

  public ngOnInit() {
    this._seoHelper.setMeta('404 Not Found');
  }
}
