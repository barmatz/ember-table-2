(function () {
  'use strict';

  App.TableRowComponent = Ember.Component.extend({
    tagName: '',
    deployment: null,
    attributes: null,
    content: null,
    store: null,
    error: null,
    editing: false,
    submitting: false,
    editableField: Ember.computed('content', 'editing', function () {
      return Ember.isNone(this.get('content')) || this.get('editing');
    }),
    resetAttributes: function () {
      var self = this;

      this.get('attributes').forEach(function (attribute) {
        self.set('store.current.' + attribute, null);
      });
    },
    storeAttributes: function () {
      var self = this;

      this.get('attributes').forEach(function (attribute) {
        self.set('store.cached.' + attribute, self.get('store.current.' + attribute));
      });
    },
    restoreAttributes: function () {
      var self = this;

      this.get('attributes').forEach(function (attribute) {
        self.set('store.current.' + attribute, self.get('store.cached.' + attribute));
      });
    },
    clearStore: function () {
      var self = this;

      this.get('attributes').forEach(function (attribute) {
        self.set('store.cached.' + attribute, null);
      });      
    },
    validate: function () {
      return true;
    },
    create: function () {
      throw new ReferenceError('This method must be overridden');
    },
    update: function () {
      throw new ReferenceError('This method must be overridden');
    },
    remove: function () {
      throw new ReferenceError('This method must be overridden');
    },
    init: function () {
      var self = this
        , attributes = this.get('attributes')
        , content = this.get('content');

      this._super();
      
      this.set('store', {
        current: {},
        cached: {}
      });

      if (!Ember.isBlank(attributes) && !Ember.isBlank(content)) {
        attributes.forEach(function (attribute) {
          var value;

          if ('get' in content && typeof content.get === 'function') {
            value = content.get(attribute);
          } else {
            value = content[attribute];
          }

          self.set('store.current.' + attribute, value);
        });
      }
    },
    submit: function (action) {
      var self = this
        , deffer
        , successEventName;

      if (this.validate()) {
        this.setProperties({
          error: null,
          submitting: true
        });

        switch (action) {
          case 'create':
            deffer = this.create();
            successEventName = 'created';
            break;
          case 'update':
            deffer = this.update();
            successEventName = 'updated';
            break;
          case 'delete':
            deffer = this.remove();
            successEventName = 'deleted';
            break;
        }

        return deffer
          .then(function () {
            self.sendAction.apply(self, [ successEventName ].concat([].slice.call(arguments)));

            if (action === 'create') {
              self.resetAttributes();
            }
          })
          .catch(function (err) {
            self.set('error', err);
          })
          .finally(function () {
            self.set('submitting', false);
          });
      }

      return;
    },
    actions: {
      add: function () {
        this.submit('create');
      },
      remove: function () {
        this.submit('delete');
      },
      approve: function () {
        var self = this;

        this.submit('update')
          .then(function () {
            self.clearStore();
            self.set('editing', false);
          });
      },
      edit: function () {
        this.storeAttributes();
        this.set('editing', true);
      },
      cancel: function () {
        this.restoreAttributes();
        this.set('editing', false);
      }
    }
  });
}());