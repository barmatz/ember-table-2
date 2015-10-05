(function () {
  'use strict';

  App.PaginatedTableComponent = Ember.Component.extend({
    currentPage: 0,
    pageItemCount: 0,
    totalItems: 0,
    pageOptionRange: 5,
    tableClass: null,
    actions: {
      gotoPage: function () {
        this.sendAction.apply(this, [ 'gotoPage' ].concat([].slice.call(arguments)));
      }
    }
  });
}());