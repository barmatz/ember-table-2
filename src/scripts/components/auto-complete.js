(function () {
  'use strict';

  function get(object, key) {
    if (typeof object === 'object' && !Ember.isNone(object)) {
      if ('get' in object && typeof object.get === 'function') {
        return object.get(key);
      } else {
        return object[key];
      }
    } else {
      return object;
    }
  }

  App.AutoCompleteComponent = Ember.Component.extend({
    classNames: [ 'auto-complete' ],
    placeholder: null,
    value: null,
    optionLabelPath: null,
    highlight: false,
    hint: true,
    minLength: 1,
    limit: 20,
    valueDidChange: Ember.observer('value', function () {
      var value = this.get('value');

      this.$('input').val(value);
    }),
    getResults: function (query, syncDone, asyncDone) {
      this.sendAction('getSyncResults', query, syncDone);
      this.sendAction('getAsyncResults', query, asyncDone);
    },
    didInsertElement: function () {
      var self = this
        , highlight = this.get('highlight')
        , hint = this.get('hint')
        , minLength = this.get('minLength')
        , limit = this.get('limit')
        , optionLabelPath = this.get('optionLabelPath')
        , value = this.get('value');

      if (optionLabelPath) {
        value = get(value, optionLabelPath);
      }

      this.$('input')
        .typeahead({
          highlight: highlight,
          hint: hint,
          minLength: minLength,
          classNames: {
            input: 'form-control',
            menu: 'auto-complete-dropdown-menu',
            suggestion: 'auto-complete-dropdown-item',
            cursor: 'selected'
          }
        }, {
          limit: limit,
          source: this.getResults.bind(this),
          display: function (suggestion) {
            if (optionLabelPath) {
              suggestion = get(suggestion, optionLabelPath);
            }

            return suggestion;
          },
          templates: {
            notFound: function () {
              var element = document.createElement('div');

              element.className = 'auto-complete-dropdown-item text-muted';
              element.innerHTML = 'No results';

              return element;
            },
            pending: function () {
              var template = self.container.lookup('template:components/x-spinner')
                , component = Ember.Component.create()
                , view = self.createChildView(Ember.View, { template: template, controller: component })
                , element;
              
              view.createElement();

              element = view.element;
              element.className = 'text-center';

              return element;
            },
            suggestion: function (suggestion) {
              var element = document.createElement('div');

              if (optionLabelPath) {
                suggestion = get(suggestion, optionLabelPath);
              }

              element.innerHTML = suggestion;

              return element;
            }
          }
        })
        .val(value)
        .on('typeahead:select', function (event, value) {
          self.set('value', value);
        });
    }
  });
}());