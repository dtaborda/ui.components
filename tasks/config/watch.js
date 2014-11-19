/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-watch
 *
 */
var LIVERELOAD_PORT = 35729;
module.exports = function(grunt) {

	grunt.config.set('watch', {
		html: {
			files: ['<%= config.src %>/**/*.html'],
			tasks: ['html2js', 'build']
		},
		js:{
				files:['<%= jshint.files %>'],
				tasks:['jshint','concat','uglify']
		},
        livereload: {
            options: {
                livereload: LIVERELOAD_PORT
            },
            files: ['<%= config.dist %>/*.html','<%= jshint.files %>']
        }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
