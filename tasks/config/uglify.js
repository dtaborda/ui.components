/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {

	grunt.config.set('uglify', {
		options:{
            banner:'/* <%= config.name %>  <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        dist:{
            files:{
                '<%= config.dist %>/<%= config.name %>-<%= config.version %>.min.js':['<%= concat.dist.dest %>']
            }
        },
        dist_tpls:{
            files:{
                '<%= config.dist %>/<%= config.name %>-tpls-<%= config.version %>.min.js':['<%= concat.dist_tpls.dest %>']
            }
        }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
};
