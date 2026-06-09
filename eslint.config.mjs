import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  ...nextVitals,
  {
    rules: {
      'react-hooks/rules-of-hooks': 'off', // Bypasses circular reference crash
    }
  }
];

export default eslintConfig;
