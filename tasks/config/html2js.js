module.exports = function(grunt) {

    grunt.config.set('html2js', {
        dist: {
            options: {
              module: null, // no bundle module for all the html2js templates
              base: '.'
            },
            files: [{
              expand: true,
              src: ['<%= config.src %>/components/**/*.html'],
              ext: '.html.js',
              dest: '<%= config.dist %>/templates.js'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-html2js');
};