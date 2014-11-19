var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

    grunt.config.set('connect', {
        options: {
            port: 9000,
            // change this to '0.0.0.0' to access the server from outside
            hostname: 'localhost'
        },
        livereload: {
            options: {
                middleware: function (connect) {
                    return [
                        lrSnippet,
                        mountFolder(connect, 'src/app')
                    ];
                }
            }
        },
        dist: {
            options: {
                middleware: function (connect) {
                    return [
                        mountFolder(connect, 'dist')
                    ];
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
};