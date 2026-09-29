import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  // 1. Configuração de Regras Globais e Plugins
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react": reactPlugin,
      "react-hooks": hooksPlugin,
      "@next/next": nextPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Permite ler a sintaxe do React (corrige o Unexpected token <)
        },
      },
      globals: {
        ...globals.browser, // Reconhece fetch, window, etc.
        ...globals.node,    // Reconhece process, console, require, etc.
      },
    },
    settings: {
      react: {
        version: "detect", // Tira o aviso amarelo de versão do React
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      
      "react/react-in-jsx-scope": "off", // Desativa obrigatoriedade de importar o React no Next.js
      "no-unused-vars": ["warn", { 
            "argsIgnorePattern": "^_", 
            "varsIgnorePattern": "^_" 
        }],
      "no-useless-catch": "off",         // Transforma variáveis não usadas em avisos, não erros bloqueantes
    },
  },

  // 2. Configuração Específica para a pasta de testes (Jest / Vitest)
  {
    files: ["**/testes/**/*.js", "**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: {
        ...globals.jest, // Reconhece test, expect, beforeAll, etc.
      },
    },
  },

  // 3. Pastas e Arquivos ignorados pelo Linter
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
    ],
  },
];
