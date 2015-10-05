(function () {
  'use strict';

  App.XTableColHeadComponent = Ember.Component.extend({
    tagName: 'th',
    label: null,
    indicator: false,
    searchQuery: null,
    filters: null,
    eventBus: Ember.inject.service(),
    proxyFilters: Ember.computed.map('filters', function (filter) {
      return Ember.ObjectProxy.create({
        content: filter,
        checked: filter.get('checked') || false
      });
    }),
    selectedFilters: Ember.computed.filterBy('proxyFilters', 'checked', true),
    hasSearchQuery: Ember.computed('searchQuery', function () {
      return !Ember.isEmpty(this.get('searchQuery'));
    }),
    hasFilters: Ember.computed('selectedFilters.[]', function () {
      return this.get('selectedFilters').length > 0;
    }),
    evaluateIndicator: function () {
      var hasSearchQuery = this.get('hasSearchQuery')
        , hasFilters = this.get('hasFilters')
        , showIndicator = hasSearchQuery || hasFilters;

      this.set('indicator', showIndicator);
    },
    clearSearchQuery: function () {
      this.set('searchQuery', null);
    },
    uncheckAllFilters: function () {
      this.get('proxyFilters').setEach('checked', false);
    },
    onClearSearchQuery: function (target) {      
      if (target !== this) {
        this.clearSearchQuery();
        this.evaluateIndicator();
      }
    },
    onClearSelectedFilters: function (target) {
      if (target !== this) {
        this.uncheckAllFilters();
        this.evaluateIndicator();
      }
    },
    searchFor: function (query) {
      var filters = this.get('selectedFilters');

      this.set('searchQuery', query);
      this.evaluateIndicator();
      this.sendAction('search', query, filters);
      this.$('.dropdown-toggle').dropdown('toggle');
    },
    init: function () {
      var eventBus = this.get('eventBus');

      this._super();
      this.evaluateIndicator();

      eventBus
        .on('clearSearchQuery', this, 'onClearSearchQuery') 
        .on('clearSelectedFilters', this, 'onClearSelectedFilters');
    },
    destroy: function () {
      var eventBus = this.get('eventBus');

      eventBus
        .off('clearSearchQuery', this, 'onClearSearchQuery') 
        .off('clearSelectedFilters', this, 'onClearSelectedFilters');
      
      this._super();
    },
    didInsertElement: function () {
      var self = this;

      function focusInput() {
        self.$('.dropdown-menu input').get(0).focus();   
      }

      function repositionMenu() {
        var menu = self.$('.dropdown-menu')
          , offset;

        menu.css('left', '');

        offset = menu.offset().left + menu.width() - Ember.$(window).width();
        
        if (offset > 0) {
          menu.css('left', menu.position().left - offset);
        }
      }

      this.$('.dropdown')
        .on('shown.bs.dropdown', function () {
          focusInput();
          repositionMenu();
        });
    },
    actions: {
      submit: function () {
        var eventBus = this.get('eventBus');

        this.searchFor(this.get('searchQuery'));
        
        eventBus.trigger('clearSearchQuery', this);
        eventBus.trigger('clearSelectedFilters', this);
      },
      reset: function () {
        this.uncheckAllFilters();
        this.searchFor(null);
      }
    }
  });
}());