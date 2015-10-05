(function () {
  'use strict';

  App.DeletePromptComponent = App.XModalComponent.extend({
    willDestroyElement: function () {
      this.sendAction('dismiss');
    },
    actions: {
      accept: function () {
        this.sendAction('accept');
        this.hide();
      },
      dismiss: function () {
        this.sendAction('dismiss');
        this.hide();
      }
    }
  });
}());