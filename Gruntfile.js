module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*!\n'
        + ' * jQuery <%= pkg.name %> Plugin v<%= pkg.version %>\n'
        + ' * Released: <%= grunt.template.today("yyyy-mm-dd") %>\n'
        + ' * <%= pkg.description %>\n'
        + ' * <%= pkg.url %>\n'
        + ' * \n'
        + ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n'
        + ' * Released under <%= pkg.license %> license\n'
        + ' */\n'
      },
      build: {
        src: 'js/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};