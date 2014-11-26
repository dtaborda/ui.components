module.exports = function(grunt) {

    grunt.config.set('copy', {
        vendor:  {
            expand: true,
            cwd: './<%= config.dist %>',
            dest: '<%= config.vendor %>/ui-components',
            src: '*.js',
          }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

};