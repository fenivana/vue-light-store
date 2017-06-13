export default class {
  static install(Vue) {
    Vue.mixin({
      data() {
        return this.$root.$options.store ? { $state: this.$root.$options.store.$state } : {}
      },

      created() {
        if (this.$root.$options.store) {
          this.$store = this.$root.$options.store
          this.$state = this.$store.$state
        }
      }
    })
  }

  constructor(modules) {
    this.$state = {}

    for (const m in modules) {
      const mod = {}
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
