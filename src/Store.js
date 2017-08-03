export default class {
  static install(Vue) {
    Vue.mixin({
      beforeCreate() {
        if (this.$root.$options.store) {
          this.$store = this.$root.$options.store

          if (this.$root === this) {
            // make state reactive
            this.$state = new Vue({
              data: { state: this.$store.$state }
            }).state
          } else {
            this.$state = this.$root.$state
          }
        }
      }
    })
  }

  constructor(modules) {
    this.$state = {}

    for (const m in modules) {
      const mod = { $root: this }
      this.$state[m] = mod.$state = modules[m].state()

      this[m] = {}
      for (const fn in modules[m].methods) {
        this[m][fn] = mod[fn] = modules[m].methods[fn].bind(mod)
      }
    }
  }

  $setState(state) {
    for (const k in state) {
      Object.assign(this.$state[k], state[k])
    }
  }
}
