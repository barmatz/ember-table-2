(function () {
  'use strict';

  App.DatePickerComponent = Ember.Component.extend({
    classNames: [ 'date-picker' ],
    placeholder: null,
    visible: false,
    value: Ember.computed('_value', {
      get: function () {
        return this.get('_value');
      },
      set: function (key, value) {
        if (!Ember.isBlank(value) && !moment.isDate(value)) {
          value = new Date(value);
        }

        this.set('_value', value);

        return value;
      }
    }),
    datePickerShowed: function () {
      this.set('visible', true);
    },
    datePickerHid: function () {
      this.set('visible', false);
    },
    didInsertElement: function() {
      var value = this.get('value')
        , $ = this.$('input');

      $
        .datepicker({
          format: 'DD d MM yyyy',
          show: this.datePickerShowed,
          hide: this.datePickerHid
        })
        .datepicker('setDate', value);
    },
    actions: {
      toggle: function () {
        var element = this.$('input');

        if (this.get('visible')) {
          element.datepicker('hide');
        } else {
          element.datepicker('show');
        }
      }
    }
  });
}());