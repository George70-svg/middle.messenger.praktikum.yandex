import globals from 'globals'
import pluginJs from '@eslint/js'
import tsEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

/** @type {import('eslint').Linter.Config} */
export default {
  files: ['**/*.{js,mjs,cjs,ts}'], // Файлы, которые анализируются
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2020, // Версия ECMAScript
      sourceType: 'module', // Тип модулей
    },
    globals: globals.browser, // Глобальные переменные для браузера
  },
  plugins: {
    '@typescript-eslint': tsEslint, // Плагин TypeScript
  },
  rules: {
    ...pluginJs.configs.recommended.rules, // Базовые правила ESLint
    ...tsEslint.configs.recommended.rules, // Рекомендации для TypeScript
    quotes: ['warn', 'single'], // Установка правила кавычек
    semi: ['warn', 'never'],
  },
}
