'use strict';

module.exports = function (grunt) {
  grunt.registerTask('build', [ 'build:scripts', 'build:styles' ]);
};