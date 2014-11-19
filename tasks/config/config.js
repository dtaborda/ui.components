module.exports = function(grunt){

    var paths = {
        dist: 'dist',
        src: 'src',
        srcService: 'services',
        styles: 'styles/',
        vendor:'!src/vendor/**/*.js'
    };

    grunt.config.set('config',{
        pkg: grunt.file.readJSON('package.json'),
        name: grunt.file.readJSON('package.json').name,
        version: grunt.file.readJSON('package.json').version,
        description: grunt.file.readJSON('package.json').description,
        lisense: grunt.file.readJSON('package.json').lisense,
        paths: paths,
        vendor: paths.vendor,
        src: paths.src,
        dist: paths.dist,
        styles: paths.styles,
        modules: [],//to be filled in by build task
        filenamecustom: '<%= name %>-custom',
        meta: {
          modules: 'angular.module("<%= config.name %>", [<%= srcModules %>]);',
          tplmodules: 'angular.module("<%= config.name %>.tpls", [<%= tplModules %>]);',
          all: 'angular.module("<%= config.name %>", ["<%= config.name %>.tpls", <%= srcModules %>]);',
          banner: ['/*',
                   ' * <%= config.name %>\n',
                   ' * Version: <%= config.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
                   ' * Lisense: <%= config.lisense %>',
                   ' * Description: <%= config.description %>',
                   ' */\n'].join('\n')
        }
    });
}