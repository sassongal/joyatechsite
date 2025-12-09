const react = require('@eslint/js');
const pluginReact = require('eslint-plugin-react');

module.exports = [
  react.configs.recommended,
  {
    plugins: {
      react: pluginReact,
    },
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      // React rules
      'react/react-in-jsx-scope': 'off', // אין צורך ב-import React ב-React 18
      'react/prop-types': 'off',          // אם לא משתמשים ב-PropTypes
      'react/jsx-uses-react': 'off',      // לא נחוץ ב-React 17+
      'react/jsx-uses-vars': 'error',     // מונע שימוש במשתנים לא מוגדרים

      // General rules
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'no-console': ['warn', { 'allow': ['warn', 'error'] }],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',

      // Security
      'no-eval': 'error',
      'no-implied-eval': 'error',

      // Best practices
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'default-case': 'error',
      'no-duplicate-imports': 'error',
    },
    settings: {
      react: {
        version: 'detect', // מזהה אוטומטית את גרסת React
      },
    },
  },
];
