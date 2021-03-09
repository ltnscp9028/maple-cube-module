module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-var-requires": 0,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },

  // 코드를 해석하는 parser에 대한 설정
  parserOptions: {
    // 자바스크립트 버전, 7은 ECMA2016
    ecmaVersion: 2020,
    // 모듈 export를 위해 import, export를 사용 가능여부를 설정, script는 사용불가
    sourceType: "module",
    // jsx 허용을 설정, back-end 설정이기 때문에 사용 안함
    ecmaFeatures: {
      jsx: true,
    },
  },

  // linter가 파일을 분석할 때, 미리 정의된 전역변수에 무엇이 있는지 명시하는 속성
  env: {
    // 브라우저의 document와 같은 객체 사용 여부
    browser: true,
    // node.js에서 console과 같은 전역변수 사용 여부
    node: true,
    es6: true,
  },
  // ESLint가 무시할 디렉토리, 파일을 설정
  ignorePatterns: ["prisma/", "node_modules/"],
};
