(function () {
  'use strict';

  App.TableEditableRowComponent = Ember.Component.extend({
    tagName: '',
    deletableItemLabel: '',
    content: null,
    promptDelete: false,
    deleteAccepted: false,
    actions: {
      add: function () {
        this.sendAction('add');
      },
      remove: function () {
        var deleteAccepted = this.get('deleteAccepted');

        if (deleteAccepted) {
          this.set('deleteAccepted', false);
          this.sendAction('remove');
        } else {
          this.set('promptDelete', true);
        }
      },
      edit: function () {
        this.sendAction('edit');
      },
      approve: function () {
        this.sendAction('approve');
      },
      cancel: function () {
        this.sendAction('cancel');
      },
      rejectDelete: function () {
        this.setProperties({
          deleteAccepted: false,
          promptDelete: false
        });
      },
      acceptDelete: function () {
        this.set('deleteAccepted', true);
        this.send('remove');
      }
    }
  });
}());