'use strict';

module.exports = function (grunt) {
  grunt.registerTask('styles', [ 'lint:styles', 'build:styles' ]);
};