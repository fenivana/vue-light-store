(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Store = factory());
}(this, (function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var _class = function () {
    _class.install = function install(Vue) {
      Vue.mixin({
        beforeCreate: function beforeCreate() {
          if (this.$root.$options.store) {
            this.$store = this.$root.$options.store;

            if (this.$root === this) {
              // make state reactive
              this.$state = new Vue({
                data: { state: this.$store.$state }
              }).state;
            } else {
              this.$state = this.$root.$state;
            }
          }
        }
      });
    };

    function _class(modules) {
      classCallCheck(this, _class);

      this.$state = {};

      for (var m in modules) {
        var mod = { $root: this };
        this.$state[m] = mod.$state = modules[m].state();

        this[m] = {};
        for (var fn in modules[m].methods) {
          this[m][fn] = mod[fn] = modules[m].methods[fn].bind(mod);
        }
      }
    }

    _class.prototype.$setState = function $setState(state) {
      for (var k in state) {
        Object.assign(this.$state[k], state[k]);
      }
    };

    return _class;
  }();

  return _class;

})));
