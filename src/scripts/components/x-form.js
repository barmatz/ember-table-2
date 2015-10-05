(function () {
  'use strict';

  App.XFormComponent = Ember.Component.extend({
    actions: {
      submit: function () {
        this.sendAction('submit');
      }
    }
  });
}());