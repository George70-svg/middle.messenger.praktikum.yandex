import globals from 'globals'
import pluginJs from '@eslint/js'
import tsEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

/** @type {import('eslint').Linter.Config} */
export default {
  files: ['**/*.{js,mjs,cjs,ts,css,scss}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    globals: globals.browser,
  },
  plugins: {
    '@typescript-eslint': tsEslint,
  },
  rules: {
    ...pluginJs.configs.recommended.rules,
    ...tsEslint.configs.recommended.rules,
    quotes: ['warn', 'single'],
    semi: ['warn', 'never'],
    indent: ['warn', 2],
    'prefer-const': 'warn',
    'max-len': 'off',
    'object-curly-spacing': ['warn', 'always'],
    'no-multi-spaces': 'warn',
    'space-in-parens': 'error',
    'no-multiple-empty-lines': 'error',
    'no-use-before-define': 'error',
    'no-useless-return': 'off',
  },
}
