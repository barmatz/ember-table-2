(function () {
  'use strict';

  App.SampleTableRowComponent = App.TableRowComponent.extend({
    attributes: [ 'id', 'name', 'date' ],
    id: Ember.computed.alias('store.current.id'), 
    name: Ember.computed.alias('store.current.name'), 
    date: Ember.computed.alias('store.current.date'), 
    validate: function () {
      if (Ember.isBlank(this.get('name'))) {
        this.set('error', 'Missing name value');
        return false;
      } else {
        return true;
      }
    },
    create: function () {
      // TODO something
      return new Ember.RSVP.Promise(function (resolve) {
        resolve();
      });
    },
    update: function () {
      // TODO something
      return new Ember.RSVP.Promise(function (resolve) {
        resolve();
      });
    },
    remove: function () {
      // TODO something
      return new Ember.RSVP.Promise(function (resolve) {
        resolve();
      });
    }
  });
}());