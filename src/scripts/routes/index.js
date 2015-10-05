(function () {
  'use strict';

  App.IndexRoute = App.AbstractTableRoute.extend({
    model: function () {
      return {
        tableItems: [
          { id: 1, name: 'Or Barmatz', date: new Date() },
          { id: 2, name: 'Guy Edwards', date: new Date() }
        ],
        totalItems: 100
      };
    }
  });
}());