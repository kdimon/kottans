module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      options: {
        sourceMap: true
      },
      target: {
        files: {
          'build/css/style.min.css': 'src/css/style.css',
        }
      }
    },
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'src/js/compiled/main.js': 'src/js/main.js'
        }
      }
    },
    uglify: {
      build: {
        src: 'src/js/compiled/main.js',
        dest: 'build/js/main.min.js'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default tasks
  grunt.registerTask('default', ['babel', 'uglify', 'cssmin']);

};