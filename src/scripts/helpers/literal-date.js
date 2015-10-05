(function () {
  'use strict';

  Ember.Handlebars.helper('literal-date', function (date) {
    if (date) {
      date = moment(new Date(date));
    }

    if (date && date.isValid()) {
      return date.format('DD/MM/YYYY HH:MM');
    } else {
      return 'No date';
    }
  });
}());