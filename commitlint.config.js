module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    // Ignore releases, as that's done entirely by the CI.
    (commit) => commit.startsWith('chore(release)'),
  ],
};
