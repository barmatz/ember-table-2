(function () {
  'use strict';

  App.SampleTableComponent = Ember.Component.extend({
    actions: {
      addItem: function (item) {
        this.get('content').insertAt(0, item);
      },
      removeItem: function (item) {
        var content = this.get('content');

        content.removeObject(content.findBy('id', item.id));
      }
    }
  });
}());