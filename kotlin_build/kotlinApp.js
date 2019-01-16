(function (_, Kotlin) {
  'use strict';
  var addClass = Kotlin.kotlin.dom.addClass_hhb33f$;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  function main(args) {
    var tmp$;
    require('../src/css/app.css');
    var infoElement = InfoGenerator_getInstance().create_6taknv$(false);
    (tmp$ = document.body) != null ? tmp$.appendChild(infoElement) : null;
  }
  function InfoGenerator() {
    InfoGenerator_instance = this;
  }
  InfoGenerator.prototype.create_6taknv$ = function (development) {
    if (development === void 0)
      development = false;
    var $receiver = document.createElement('div');
    var content = document.createTextNode('Development4 TEST: ' + development);
    $receiver.appendChild(content);
    addClass($receiver, ['alarm']);
    return $receiver;
  };
  InfoGenerator.$metadata$ = {kind: Kind_OBJECT, simpleName: 'InfoGenerator', interfaces: []};
  var InfoGenerator_instance = null;
  function InfoGenerator_getInstance() {
    if (InfoGenerator_instance === null) {
      new InfoGenerator();
    }
    return InfoGenerator_instance;
  }
  var package$app = _.app || (_.app = {});
  package$app.main_kand9s$ = main;
  var package$info = package$app.info || (package$app.info = {});
  Object.defineProperty(package$info, 'InfoGenerator', {get: InfoGenerator_getInstance});
  main([]);
  return _;
}(module.exports, require('kotlin')));

//# sourceMappingURL=kotlinApp.js.map
