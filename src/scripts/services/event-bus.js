(function () {
  'use strict';

  var EventBus = App.EventBus = Ember.Service.extend(Ember.Evented);
  
  App.register('service:eventBus', EventBus);
}());