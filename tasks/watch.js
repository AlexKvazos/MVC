module.exports = {
  files: ['core/client/**/*.js', 'core/client/**/*.scss', 'core/client/**/*.html'],
  tasks: ['eslint:client', 'clean:dist', 'browserify:dev', 'copy:assets', 'clean:cache']
};
