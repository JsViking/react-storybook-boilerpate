import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: './src/index.js',
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  output: [
    {
      file: `./dist/${pkg.module}`,
      format: 'es',
      sourcemap: true,
    },
    {
      file: `./dist/${pkg.main}`,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    postcss(),
    babel({ 
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react'],
      babelHelpers: 'bundled'
    }),
    commonjs(),
    terser({
      output: {
        comments: false,
      },
    })
  ],
  external: [
    'react',
    'prop-types',
  ],
  globals: {
    react: "React"
  }
};
