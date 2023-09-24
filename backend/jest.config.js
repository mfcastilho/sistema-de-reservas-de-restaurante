/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
    // ... outras configurações
  
    // O ambiente de teste que será usado para os testes
    testEnvironment: 'node',
  
    // Configurações de variáveis de ambiente específicas para testes
    setupFilesEnv: {
      NODE_ENV: 'test',
      DATABASE_URL: 'sqlite::memory:', // Use o SQLite em memória para testes
    },
  
    // Os padrões para encontrar arquivos de teste
    testMatch: [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
  

  };
  
  module.exports = config;
  