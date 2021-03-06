# vue-light-store
A simple Vue store.

## Usage
See file `examples/index.html`:
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="../dist/VueLightStore.js"></script>
</head>

<body>
<div id="app">
  <p>The plugin will inject two properties into vue instance: <code>$store</code> and <code>$state</code>.</p>
  <p>Use <code>$state.MODULE.SOME_STATE</code> to access the state.</p>
  <p>Use <code>$store.MODULE.METHOD()</code> to call the method.</p>

  <p>$state.moduleFoo.a: {{$state.moduleFoo.a}}; $state.moduleFoo.b: {{$state.moduleFoo.b}} <button @click="$store.moduleFoo.inc">$store.moduleFoo.inc()</button></p>
  <p>$state.moduleBar.c: {{$state.moduleBar.c}} <button @click="$store.moduleBar.inc">$store.moduleBar.inc()</button></p>
  <p><button @click="reset">reset</button></p>
</div>

<script>
Vue.use(VueLightStore)

const store = new VueLightStore({
  // define some modules
  moduleFoo: {
    state: () => ({
      a: 1,
      b: 2
    }),

    methods: {
      inc() {
        // this refers to the module
        // access state via this.$state
        this.$state.a++

        // access other methods
        this.incB()
      },

      incB() {
        this.$state.b++
      }
    }
  },

  moduleBar: {
    state: () => ({
      c: 3
    }),

    methods: {
      inc() {
        this.$state.c++
      }
    }
  }
})

new Vue({
  el: '#app',
  store,

  methods: {
    reset() {
      // store.$setState(state) will merge the state into store.$state
      this.$store.$setState({
        moduleFoo: {
          a: 0,
          b: 1
        },

        moduleBar: {
          c: 0
        }
      })
    }
  }
})
</script>
</body>
</html>
```

## License
[MIT](license)
