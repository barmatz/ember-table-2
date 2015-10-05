(function () {
  'use strict';

  App.AbstractTableComponent = Ember.Component.extend(App.Propagator, App.Filterer, {
    content: null,
    loading: false,
    currentPage: 1,
    pageItemCount: 1,
    totalItems: 0,
    resetSearchQueries: function (/* ref */) {
      throw new ReferenceError('this method must be overridden');
    },
    searchBy: function (ref, query, filters) {
      this.cacheFilters(ref, filters);
      this.resetSearchQueries(ref);
      this.propagateEvent(ref, query, filters);
    },
    actions: {
      gotoPage: function (page, startIndex, endIndex) {
        this.sendAction('gotoPage', page, startIndex, endIndex);
      }
    }
  });
}());