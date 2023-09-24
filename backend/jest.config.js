/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
    // ... outras configurações
  
    // O ambiente de teste que será usado para os testes
    testEnvironment: 'node',
  

  
    // Os padrões para encontrar arquivos de teste
    testMatch: [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
  

  };
  
  module.exports = config;
  