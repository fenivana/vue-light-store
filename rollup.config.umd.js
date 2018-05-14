import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'Store',
    file: 'dist/Store.umd.js'
  },
  plugins: [
    babel()
  ]
}
