(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.Store = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class = function () {
    _class.install = function install(Vue) {
      Vue.mixin({
        data: function data() {
          return this.$root.$options.store ? { $state: this.$root.$options.store.$state } : {};
        },
        created: function created() {
          if (this.$root.$options.store) {
            this.$store = this.$root.$options.store;
            this.$state = this.$store.$state;
          }
        }
      });
    };

    function _class(modules) {
      _classCallCheck(this, _class);

      this.$state = {};

      for (var m in modules) {
        this.$state[m] = modules[m].state;

        this[m] = {};
        for (var fn in modules[m].methods) {
          this[m][fn] = modules[m].methods[fn] = modules[m].methods[fn].bind(modules[m]);
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

  exports.default = _class;
  module.exports = exports["default"];
});