var _default =
/*#__PURE__*/
function () {
  _default.install = function install(Vue) {
    Vue.mixin({
      beforeCreate: function beforeCreate() {
        if (this.$root.$options.store) {
          this.$store = this.$root.$options.store;

          if (this.$root === this) {
            // make state reactive
            this.$state = new Vue({
              data: {
                state: this.$store.$state
              }
            }).state;
          } else {
            this.$state = this.$root.$state;
          }
        }
      }
    });
  };

  function _default(modules) {
    this.$state = {};

    for (var m in modules) {
      var mod = {
        $root: this
      };
      this.$state[m] = mod.$state = modules[m].state();
      this[m] = {};

      for (var fn in modules[m].methods) {
        this[m][fn] = mod[fn] = modules[m].methods[fn].bind(mod);
      }
    }
  }

  var _proto = _default.prototype;

  _proto.$setState = function $setState(state) {
    for (var k in state) {
      Object.assign(this.$state[k], state[k]);
    }
  };

  return _default;
}();

export default _default;
