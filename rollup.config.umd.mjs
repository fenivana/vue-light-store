import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.mjs',
  output: {
    format: 'umd',
    name: 'VueLightStore',
    file: 'dist/VueLightStore.js'
  },
  plugins: [
    babel()
  ]
}
