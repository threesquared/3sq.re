import {
  describe,
  expect,
  it,
  inject,
  injectAsync,
  beforeEachProviders
} from 'angular2/testing';

import { provide } from 'angular2/core';
import { Title } from 'angular2/platform/browser';

import { LostComponent } from './lost.component';

describe('Lost Component', () => {

  beforeEachProviders(() => [
    Title,
    LostComponent
  ]);

  it('Has a title', inject([LostComponent], (lostComponent: LostComponent) => {

    lostComponent.ngOnInit();
    expect(lostComponent._title.getTitle()).toEqual('3sq.re - 404 Not Found');

  }));
});
