(function () {
  'use strict';

  App.PaginationControlComponent = Ember.Component.extend({
    itemsPerPage: 5,
    pageOptionRange: 5,
    cachedCurrentPage: 1,
    totalItems: Ember.computed('_totalItems', {
      get: function () {
        return this.get('_totalItems');
      },
      set: function (key, value) {
        if (value < 0) {
          value = 0;
        }

        this.set('_totalItems', value);

        return value;
      }
    }),
    totalPages: Ember.computed('itemsPerPage', 'totalItems', function () {
      var itemsPerPage = this.get('itemsPerPage')
        , totalItems = this.get('totalItems');

      return Math.ceil(totalItems / itemsPerPage);
    }),
    _currentPage: 1,
    currentPage: Ember.computed('_currentPage', 'totalPages', {
      get: function () {
        return this.get('_currentPage');
      },
      set: function (key, value) {
        var totalPages = this.get('totalPages');

        if (value < 1) {
          value = 1;
        } else if (value > totalPages) {
          value = totalPages;
        }

        this.set('_currentPage', value);

        return value;
      }
    }),
    visiblePageNumbers: Ember.computed('currentPage', 'totalPages', 'pageOptionRange', function () {
      var current = this.get('currentPage')
        , total = this.get('totalPages')
        , range = this.get('pageOptionRange')
        , start = current
        , min = range - Math.floor(range / 2)
        , max = total - range + 1
        , pages = []
        , page;

      if (current < Math.max(min, range)) {
        start = 1;
      } else if (current > max) {
        start = max;
      } else {
        start = current - min + 1;
      }

      while (pages.length < Math.min(range, total)) {
        page = {
          value: start + pages.length,
          active: false
        };

        if (page.value === current) {
          page.active = true;
        }

        pages.push(page);
      }

      return pages;
    }),
    hasMoreThanOnePage: Ember.computed.gt('totalPages', 1),
    isFirstPage: Ember.computed.equal('currentPage', 1),
    isLastPage: Ember.computed.equal('currentPage', 'totalPages'),
    displayFirstPageOption: Ember.computed('currentPage', 'pageOptionRange', function () {
      var currentPage = this.get('currentPage')
        , totalPages = this.get('totalPages')
        , pageOptionRange = this.get('pageOptionRange');

      return (totalPages > pageOptionRange) && (currentPage >= pageOptionRange);
    }),
    displayLastPageOption: Ember.computed('currentPage', 'totalPages', 'pageOptionRange', function () {
      var currentPage = this.get('currentPage')
        , totalPages = this.get('totalPages')
        , pageOptionRange = this.get('pageOptionRange');

      return (totalPages > pageOptionRange) && (currentPage <= (totalPages - pageOptionRange + 1));
    }),
    currentPageDidChange: Ember.observer('currentPage', function () {
      var currentPage = this.get('currentPage')
        , cachedCurrentPage = this.get('cachedCurrentPage')
        , itemsPerPage = this.get('itemsPerPage')
        , totalItems = this.get('totalItems')
        , endIndex = currentPage * itemsPerPage
        , startIndex = endIndex - itemsPerPage;

      if (cachedCurrentPage !== currentPage) {
        if (endIndex > totalItems) {
          endIndex = totalItems;
        }

        this.set('cachedCurrentPage', currentPage);
        this.sendAction('change', currentPage, startIndex, endIndex);
      }
    }),
    actions: {
      gotoFirstPage: function () {
        this.set('currentPage', 1);
      },
      gotoPrevPage: function () {
        this.decrementProperty('currentPage');
      },
      gotoNextPage: function () {
        this.incrementProperty('currentPage');
      },
      gotoLastPage: function () {
        this.set('currentPage', this.get('totalPages'));
      },
      gotoPage: function (page) {
        this.set('currentPage', page);
      }
    }
  });
}());