export default class {
  static install(Vue) {
    Vue.mixin({
      data() {
        return {
          $state: this.$root.$options.store.$state
        }
      },

      created() {
        this.$store = this.$root.$options.store
        this.$state = this.$store.$state
      }
    })
  }

  constructor(modules) {
    this.$state = {}

    for (const m in modules) {
      this.$state[m] = modules[m].state

      this[m] = {}
      for (const fn in modules[m].methods) {
        this[m][fn] = modules[m].methods[fn].bind(modules[m])
      }
    }
  }

  $setState(state) {
    for (const k in state) {
      Object.assign(this.$state[k], state[k])
    }
  }
}
