import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import prettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['node_modules', '.nuxt', '.output', 'dist']
  },

  js.configs.recommended,

  {
    files: ['nuxt.config.ts'],
    languageOptions: {
      globals: {
        defineNuxtConfig: 'readonly'
      }
    }
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue']
      }
    },
    plugins: {
      vue
    },
    rules: {
      ...vue.configs['flat/recommended'].rules
    }
  },

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser
    },
    plugins: {
      '@typescript-eslint': ts
    },
    rules: {
      ...ts.configs.recommended.rules
    }
  },

  prettier
]
