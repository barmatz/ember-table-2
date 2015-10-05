(function () {
  'use strict';

  App.AbstractTableRoute = Ember.Route.extend(App.SearchableApi, App.PagableApi, {
    disableLoading: false,
    afterModel: function () {
      this.set('disableLoading', false);
    },
    gotoPage: function (pageNumber, startIndex, endIndex) {
      this._super(pageNumber, startIndex, endIndex);
      this.set('disableLoading', true);
      this.refresh();
    },
    searchBy: function (searchField, query, filterField, filters) {
      var pageItemCount = this.get('pageItemCount')
        , startIndex = 0
        , endIndex = pageItemCount;

      this._super(searchField, query, filterField, filters);
      this.gotoPage(1, startIndex, endIndex);
    },
    actions: {
      loading: function () {
        return !this.get('disableLoading');
      },
      gotoPage: function (pageNumber, startIndex, endIndex) {
        this.gotoPage(pageNumber, startIndex, endIndex);
      },
      willTransition: function (transition) {
        var route = this.routeName
          , target = transition.targetName;

        if (route !== target) {
          this.reset();
        }
      }
    }
  });
}());