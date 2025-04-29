import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin-js'
import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { '@stylistic/js': stylistic },
    extends: [
      js.configs.recommended,  // <-- USA el import de "@eslint/js"
    ],
    rules: {
      '@stylistic/js/indent': ['error', 2], // Indentación de 2 espacios
      '@stylistic/js/linebreak-style': ['error', 'unix'], // Saltos de línea estilo UNIX
      '@stylistic/js/quotes': ['error', 'single'], // Comillas simples
      '@stylistic/js/semi': ['error', 'never'], // Sin punto y coma
      'eqeqeq': 'error', // Usar === y !==
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 0
    },
    ignores: ['node_modules/**', 'dist/**'], // Ignorar estas carpetas
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
])