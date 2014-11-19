/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {

	grunt.config.set('concat', {

		dist: {
            options: {
              banner: '<%= config.meta.banner %><%= config.meta.modules %>\n'
            },
            src: [], //src filled in by build task
            dest: '<%= config.dist %>/<%= config.name %>-<%= config.version %>.js'
        },
        dist_tpls: {
            options: {
              banner: '<%= config.meta.banner %><%= config.meta.all %>\n<%= config.meta.tplmodules %>\n'
            },
            src: [], //src filled in by build task
            dest: '<%= config.dist %>/<%= config.name %>-tpls-<%= config.version %>.js'
        }
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};



