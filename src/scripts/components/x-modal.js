(function () {
  'use strict';

  App.XModalComponent = Ember.Component.extend({
    title: null,
    backdrop: true,
    keyboard: true,
    propertiesDidChange: Ember.observer('backdrop', 'keyboard', function () {
      this.refresh();
    }),
    refresh: function () {
      var self = this
        , backdrop = this.get('backdrop')
        , keyboard = this.get('keyboard');

      this.$('.modal').modal({
        backdrop: backdrop,
        keyboard: keyboard
      })
        .on('show.bs.modal', function () {
          self.sendAction('showing');
        })
        .on('shown.bs.modal', function () {
          self.sendAction('showed');
        })
        .on('hide.bs.modal', function () {
          self.sendAction('hiding');
        })
        .on('hidden.bs.modal', function () {
          self.destroy();
        });
    },
    toggle: function () {
      this.$('.modal').modal('toggle');
    },
    show: function () {
      this.$('.modal').modal('show');
    },
    hide: function () {
      this.$('.modal').modal('hide');
    },
    handleUpdate: function () {
      this.$('.modal').modal('handleUpdate');
    },
    didInsertElement: function () {
      this.refresh();
    },
    willDestroyElement: function () {
      this.sendAction('hidden');
    }
  });
}());