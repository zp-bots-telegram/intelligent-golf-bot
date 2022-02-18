module.exports = {
  '*.{ts,js,md,graphql,json,yml}': ['prettier --write'],
  '*.{ts,js}': ['eslint --cache --fix'],
  '*.ts': () => ['tsc -p tsconfig.json --noEmit']
};
