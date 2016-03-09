import { Component, OnInit } from 'angular2/core';
import { RouteData, ROUTER_DIRECTIVES } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

@Component({
  selector: 'lost',
  bindings: [Title],
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'app/templates/lost.html',
})

export class LostComponent {

  constructor(
    private _title: Title)
  {}

  ngOnInit() {
    this._title.setTitle("3sq.re - 404 Not Found");
  }
}
