(function () {
  'use strict';

  App.XButtonComponent = Ember.Component.extend({
    tagName: 'button',
    attributeBindings: [ 'title' ],
    title: null,
    click: function () {
      this.sendAction();
    }
  });
}());