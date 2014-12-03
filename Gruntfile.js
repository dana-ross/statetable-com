module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> */\n'
			},
			build: {
				src: 'js/src/*.js',
				dest: 'js/dist/<%= pkg.name %>.min.js'
			}
		},
		sass: {
			options: {
				style: 'compressed',
				compass: true
			},
			files  : {
				'stylesheets/statetable.css': ['sass/statetable.scss']
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');

	// Default task(s).
	grunt.registerTask('default', ['uglify', 'sass']);

};