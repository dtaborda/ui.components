module.exports = function(grunt) {

    grunt.config.set('jshint', {

        options:{
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
        },

        dist:{
            beforeconcat:[
                'Gruntfile.js',
                'task/**/*.js',
                '<%= config.src %>/components/**/*.js'
            ],
            afterconcat: ['<%= config.dist %>/<%= config.name %>-<%= config.version %>.js']
        },

        app:{
            beforeconcat:[
                'Gruntfile.js',
                'task/**/*.js',
                '<%= config.src %>/components/**/*.js',
                '<%= config.src %>/app/**/*.js',
                '<%= config.src %>/services/**/*.js'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};