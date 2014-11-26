module.exports = function(grunt) {

    grunt.config.set('clean', {
        test: [
            '<%= config.dist %>'
        ],
        vendor: {
            src:['src/vendor/ui-components']}
    });

    grunt.loadNpmTasks('grunt-contrib-clean');

};