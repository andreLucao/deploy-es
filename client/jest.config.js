//Arquivo que define o ambiente de teste para ser o Node.js (Jest funcionar com o node.js)

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
   testEnvironment: "node",
   // Especifica o processador para arquivos TypeScript
   transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
   },
   // Onde encontrar seus arquivos de teste
   testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
   // Ignora a pasta node_modules
   testPathIgnorePatterns: ["/node_modules/"],
};
