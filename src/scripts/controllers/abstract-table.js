(function () {
  'use strict';

  App.AbstractTableController = Ember.Controller.extend(App.PagableApi, {
    loading: false,
    currentPage: 1,
    searchBy: function () {
      this.set('currentPage', 1);
      this.set('loading', true);

      return true;
    },
    actions: {
      gotoPage: function () {
        var loading = this.get('loading');

        if (loading) {
          return false;
        } else {
          this.set('loading', true);
        
          return true;
        }
      }
    }
  });
}());