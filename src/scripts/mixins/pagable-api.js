(function () {
  'use strict';

  App.PagableApi = Ember.Mixin.create({
    pageOffset: 0,
    pageItemCount: App.DEFAULT_LIMIT,
    gotoPage: function (pageNumber, startIndex, endIndex) {
      this.setProperties({
        pageOffset: startIndex,
        pageItemCount: endIndex - startIndex
      });
    },
    reset: function () {
      this._super();
      this.set('pageOffset', 0);
    }
  });
}());