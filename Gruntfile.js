module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*!\n'
        + ' * jQuery <%= pkg.name %> Plugin v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n'
        + ' * <%= pkg.description %>\n'
        + ' * <%= pkg.url %>\n'
        + ' * \n'
        + ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n'
        + ' * Released under <%= pkg.license %> license\n'
        + ' */\n'
      },
      build: {
        src: '<%= pkg.main %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    shell: {
		jsUnitTests: {
			command: 'mocha test/**.js',
			options: {
			  stdout: true,
			  failOnError: true
			}
		}
	}
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify', 'shell:jsUnitTests']);
  grunt.registerTask('test', ['shell:jsUnitTests']);

};