(function () {
  'use strict';

  App.SearchableApi = Ember.Mixin.create({
    searchField: null,
    searchQuery: null,
    filterField: null,
    filterQuery: null,
    searchBy: function (searchField, query, filterField, filters) {
      this.setProperties({
        searchField: searchField,
        searchQuery: query,
        filterField: filterField,
        filterQuery: filters && filters.map(function (filter) { return filter.get('id'); })
      });
    },
    reset: function () {
      this._super();
      this.setProperties({
        searchField: null,
        searchQuery: null,
        filterQuery: null
      });
    }
  });
}());