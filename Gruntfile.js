var markdown = require('node-markdown').Markdown;

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-conventional-changelog');
  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-ddescribe-iit');

  // Project configuration.
  grunt.util.linefeed = '\n';

  var appConfig = {
    name: 'ui.component',
    moduleName: 'ui-components',
    dist: 'dist',
    styles: 'styles/'
  };

  grunt.initConfig({
    uiComponet: appConfig,
    ngversion: '0.0.0',
    bsversion: '0.0.0',
    modules: [],//to be filled in by build task
    pkg: grunt.file.readJSON('package.json'),
    dist: '<%= uiComponet.dist %>',
    styles: '<%= uiComponet.styles %>',
    filename: '<%= uiComponet.moduleName %>',
    filenamecustom: '<%= filename %>-custom',
    meta: {
      modules: 'angular.module("<%= uiComponet.name %>", [<%= srcModules %>]);',
      tplmodules: 'angular.module("<%= uiComponet.name %>.tpls", [<%= tplModules %>]);',
      all: 'angular.module("<%= uiComponet.name %>", ["<%= uiComponet.name %>.tpls", <%= srcModules %>]);',
      banner: ['/*',
               ' * <%= pkg.name %>',
               ' * <%= pkg.homepage %>\n',
               ' * Version: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
               ' * License: <%= pkg.license %>',
               ' */\n'].join('\n')
    },
    concat: {
      dist: {
        options: {
          banner: '<%= meta.banner %><%= meta.modules %>\n'
        },
        src: [], //src filled in by build task
        dest: '<%= dist %>/<%= filename %>-<%= pkg.version %>.js'
      },
      dist_tpls: {
        options: {
          banner: '<%= meta.banner %><%= meta.all %>\n<%= meta.tplmodules %>\n'
        },
        src: [], //src filled in by build task
        dest: '<%= dist %>/<%= filename %>-tpls-<%= pkg.version %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist:{
        src:['<%= concat.dist.dest %>'],
        dest:'<%= dist %>/<%= filename %>-<%= pkg.version %>.min.js'
      },
      dist_tpls:{
        src:['<%= concat.dist_tpls.dest %>'],
        dest:'<%= dist %>/<%= filename %>-tpls-<%= pkg.version %>.min.js'
      }
    },

    html2js: {
      dist: {
        options: {
          module: null, // no bundle module for all the html2js templates
          base: '.'
        },
        files: [{
          expand: true,
          src: ['src/**/*.html'],
          ext: '.html.js',
          dest: '<%= dist %>/build/templates.js'
        }]
      }
    },

    jshint: {
      files: ['Gruntfile.js','src/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    connect:{
      options:{
        port: 6788,
        livereload: 4567,
        hostname: 'localhost'
      },
      server:{
        options:{
          open:true,
          base: ['.'],
        }
      }
    },
    // Before generating any new files, remove any previously-created files.
    clean: {
      test: [
        '<%= dist %>',
        '.sass-cache'
      ]
    },
    // Configuration to be run (and then tested).
    compass: {
      compile: {
        options: {
          sassDir: 'styles/stylesheets',
          cssDir: '<%= dist %>/styles',
          specify: 'styles/stylesheets/*.scss'
        }
      },

      compileNothing: {
        options: {
          sassDir: 'test/doesnt-exist',
        }
      },

      clean: {
        options: {
          clean: true
        }
      },
      options: {
        //outputStyle: 'compressed'
      },
    },

    watch:{
      css:{
        files: ['styles/stylesheets/BR/**/*.scss', 'styles/stylesheets/flat-ui/_variables.scss', 'styles/stylesheets/*.scss'],
        tasks: 'compass:compile'
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['html2js']
      },
      js: {
        files: ['src/**/*.js']
      },
      options: {
        livereload: 4567,
      },
    },

    copy: {
      dist: {
        files: [
          // includes files within path and its sub-directories
          {
            expand: true,
            cwd: 'styles/',
            src: ['fonts/**','images/**'],
            dest: '<%= dist %>/'
          },
          {
            expand: true,
            cwd: 'bower_components/bootstrap-sass-official/assets/',
            src: ['fonts/**','images/**'],
            dest: '<%= dist %>/'
          }
        ]
      }
    }
  });

  //Common ui.component module containing all modules for src and templates
  //findModule: Adds a given module to config
  var foundModules = {};
  function findModule(name) {
    if (foundModules[name]) { return; }
    foundModules[name] = true;

    function breakup(text, separator) {
      return text.replace(/[A-Z]/g, function (match) {
        return separator + match;
      });
    }
    function ucwords(text) {
      return text.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
      });
    }
    function enquote(str) {
      return '"' + str + '"';
    }

    var module = {
      name: name,
      moduleName: enquote('<%= uiComponet.name %>.' + name),
      displayName: ucwords(breakup(name, ' ')),
      srcFiles: grunt.file.expand('src/'+name+'/*.js'),
      tplFiles: grunt.file.expand('src/'+name+'/*.html'),
      tpljsFiles: grunt.file.expand('dist/build/templates.js/src/'+name+'/*.html.js'),
      tplModules: grunt.file.expand('src/'+name+'/*.html').map(enquote),
      dependencies: dependenciesForModule(name)
    };
    module.dependencies.forEach(findModule);
    grunt.config('modules', grunt.config('modules').concat(module));
  }

  function dependenciesForModule(name) {
    var deps = [];
    grunt.file.expand('src/' + name + '/*.js')
    .map(grunt.file.read)
    .forEach(function(contents) {
      //Strategy: find where module is declared,
      //and from there get everything inside the [] and split them by comma
      var moduleDeclIndex = contents.indexOf('angular.module(');
      var depArrayStart = contents.indexOf('[', moduleDeclIndex);
      var depArrayEnd = contents.indexOf(']', depArrayStart);
      var dependencies = contents.substring(depArrayStart + 1, depArrayEnd);
      dependencies.split(',').forEach(function(dep) {
        if (dep.indexOf('<%= uiComponet.name %>.') > -1) {
          var depName = dep.trim().replace('<%= uiComponet.name %>.','').replace(/['"]/g,'');
          if (deps.indexOf(depName) < 0) {
            deps.push(depName);
            //Get dependencies for this new dependency
            deps = deps.concat(dependenciesForModule(depName));
          }
        }
      });
    });
    return deps;
  }

  //build ui-componets
  grunt.registerTask('build', 'Create ui-components build files', function() {
    var _ = grunt.util._;

    //If arguments define what modules to build, build those. Else, everything
    if (this.args.length) {
      this.args.forEach(findModule);
      grunt.config('filename', grunt.config('filenamecustom'));
    } else {
      grunt.file.expand({
        filter: 'isDirectory', cwd: '.'
      }, 'src/*').forEach(function(dir) {
        findModule(dir.split('/')[1]);
      });
    }

    var modules = grunt.config('modules');
    grunt.config('srcModules', _.pluck(modules, 'moduleName'));
    grunt.config('tplModules', _.pluck(modules, 'tplModules').filter(function(tpls) { return tpls.length > 0;} ));

    var srcFiles = _.pluck(modules, 'srcFiles');
    var tpljsFiles = _.pluck(modules, 'tpljsFiles');
    //Set the concat task to concatenate the given src modules
    grunt.config('concat.dist.src', grunt.config('concat.dist.src')
                 .concat(srcFiles));
    //Set the concat-with-templates task to concat the given src & tpl modules
    grunt.config('concat.dist_tpls.src', grunt.config('concat.dist_tpls.src')
                 .concat(srcFiles).concat(tpljsFiles));

    grunt.task.run(['concat', 'uglify']);
  });

  //compile ui-components
  grunt.registerTask('compile', ['html2js', 'build', 'watch']);

  grunt.registerTask('mkdir', grunt.file.mkdir);

  //Generate CSS file
  grunt.registerTask('css', [
    'clean',
    'mkdir:dist/styles',
    'compass'
  ]);

  grunt.registerTask('serve',[
    'connect:server',
    'clean',
    'mkdir:dist/styles',
    'compass',
    'copy',
    'watch'
  ]);

  return grunt;
};
