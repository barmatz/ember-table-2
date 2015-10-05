(function () {
  'use strict';

  var fieldCount = 0;

  App.FormFieldComponent = Ember.Component.extend({
    type: 'text',
    label: null,
    value: null,
    placeholder: null,
    optionLabelPath: 'content',
    optionValuePath: 'content',
    getAsyncResults: null,
    content: null,
    static: false,
    error: null,
    firstInputAfterError: false,
    isTextArea: Ember.computed('type', function () {
      return this.get('type') === 'textarea';
    }),
    isSelect: Ember.computed('type', function () {
      return this.get('type') === 'select';
    }),
    isAutoComplete: Ember.computed('type', function () {
      return this.get('type') === 'auto-complete';
    }),
    valueDidChange: Ember.observer('value', function () {
      if (this.get('firstInputAfterError') && this.get('error') && this.get('value')) {
        this.setProperties({
          error: null,
          firstInputAfterError: false
        });
      }
    }), 
    errorDidChange: Ember.observer('error', function () {
      this.set('firstInputAfterError', true);
    }),
    init: function () {
      this._super();
      this.set('id', 'field' + fieldCount++);
    },
    actions: {
      getAsyncResults: function () {
        this.sendAction.apply(this, [ 'getAsyncResults' ].concat([].slice.call(arguments)));
      }
    }
  });
}());