module.exports = function(grunt) {

    grunt.config.set('clean', {
        test: [
            '<%= config.dist %>',
            '.sass-cache'
        ]
    });

    grunt.loadNpmTasks('grunt-contrib-clean');

};