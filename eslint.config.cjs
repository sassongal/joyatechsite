const react = require('@eslint/js');
const pluginReact = require('eslint-plugin-react');

module.exports = [
  react.configs.recommended,
  {
    plugins: {
      react: pluginReact,
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // אין צורך ב-import React ב-React 18
      'react/prop-types': 'off',          // אם לא משתמשים ב-PropTypes
    },
    settings: {
      react: {
        version: 'detect', // מזהה אוטומטית את גרסת React
      },
    },
  },
];
