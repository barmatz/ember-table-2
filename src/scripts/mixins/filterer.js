(function () {
  'use strict';

  App.Filterer = Ember.Mixin.create({
    cachedFilters: null,
    restoreFilters: function (filterName, filters) {
      var cachedFilters = this.get('cachedFilters').get(filterName);

      if (filters && cachedFilters) {
        cachedFilters.forEach(function (cachedFilter) {
          var cachedId = cachedFilter.get('id');

          filters.forEach(function (filter) {
            var id = filter.get('id');

            if (id === cachedId) {
              filter.set('checked', true);
            }
          });
        });
      }
    },
    cacheFilters: function (filterName, filters) {
      this.get('cachedFilters').set(filterName, filters);
    },
    init: function () {
      this._super();
      this.set('cachedFilters', Ember.Object.create());
    }
  });
}());