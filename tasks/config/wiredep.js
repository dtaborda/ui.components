'use estrict'

// Automatically inject Bower components into the app
module.exports = function(grunt) {

    grunt.config.set('wiredep', {
        options: {
            cwd: '<%= config.app %>'
        },
        app: {
            src: ['<%= config.app %>/index.html'],
            ignorePath:  /\.\.\//
        }
    });

    grunt.loadNpmTasks('grunt-wiredep');

};