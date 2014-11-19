
module.exports = function(grunt) {

    grunt.config.set('open', {
        server:{
            path: 'http://localhost:<%= connect.options.port %>'
        }
    });

    grunt.loadNpmTasks('grunt-open');
};