'use strict';

module.exports = function (grunt) {
  grunt.registerTask('build:styles', [ 'compass', 'cssmin' ]);
};