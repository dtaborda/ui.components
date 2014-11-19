module.exports = function (grunt) {
    grunt.registerTask('build2', function(){
        grunt.task.run([
            'clean',
           // 'jshint',
            'concat',
            'html2js',
            'uglify',
            'open:server',
            'connect:livereload',
            'watch'
        ]);
    });
};