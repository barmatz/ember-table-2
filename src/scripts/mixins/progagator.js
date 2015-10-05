(function () {
  'use strict';

  App.Propagator = Ember.Mixin.create({
    propagateEvent: function (eventName, args) {
      this.sendAction.apply(this, [ eventName ].concat([].slice.call(args)));
    }
  });
}());