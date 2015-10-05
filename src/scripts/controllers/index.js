(function () {
  'use strict';

  App.IndexController = App.AbstractTableController.extend({
    tableItemsDidChange: Ember.observer('model.tableItems', function () {
      this.set('loading', false);
    })
  });
}());