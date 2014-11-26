module.exports = function (grunt) {
    grunt.registerTask('run', function(){
        grunt.task.run([
            'jshint',
            'clean:vendor',
            'copy',
            'open:server',
            'connect:livereload',
            'watch'
        ]);
    });
};