# vue-light-store
Simple Vue store with support of modules

## Usage
See file `examples/index.html`:
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="https://unpkg.com/vue"></script>
<script src="../dist/Store.js"></script>
</head>

<body>
<div id="app">
  <p>The plugin will inject two properties into vue instance: <code>$store</code> and <code>$state</code>.</p>
  <p>Use <code>$state.MODULE.SOME_STATE</code> to access the state.</p>
  <p>Use <code>$store.MODULE.METHOD</code> to call the method.</p>

  <p>$state.moduleFoo.a: {{$state.moduleFoo.a}} <button @click="$store.moduleFoo.incA">$store.moduleFoo.incA()</button></p>
  <p>$state.moduleBar.c: {{$state.moduleBar.c}} <button @click="$store.moduleBar.incC">$store.moduleBar.incC()</button></p>
  <p><button @click="reset">reset</button></p>
</div>

<script>
Vue.use(Store)

const store = new Store({
  // define some modules
  moduleFoo: {
    state: {
      a: 1,
      b: 2
    },

    methods: {
      incA() {
        this.state.a++ // this refers to the module
      }
    }
  },

  moduleBar: {
    state: {
      c: 3
    },

    methods: {
      incC() {
        this.state.c++
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
          b: 0
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
