module.exports = {
  extends: ['./eslintrc.base.cjs', './eslintrc.prettier.cjs'],
  ignorePatterns: [
    '**/node_modules',
    '**/dist',
    '**/*.config.*',
    '**/.eslintrc.*',
  ],
};
