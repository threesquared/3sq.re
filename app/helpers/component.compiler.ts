import { Component } from 'angular2/core';
import { Codeblock } from 'ng2-prism/codeblock';
import { Php } from 'ng2-prism/languages';

export function toComponent(template) {

  @Component({
    selector: 'compiled-component',
    template: template,
    directives: [Codeblock, Php]
  })

  class CompiledComponent {}

  return CompiledComponent;

}
